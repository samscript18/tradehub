import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FilterQuery, Types } from 'mongoose';
import { FileService } from 'src/shared/file/file.service';
import { PaginationQuery } from 'src/shared/interfaces/pagination.interface';
import DEFAULT_MATCHERS from 'src/shared/constants/regex.const';
import { MerchantService } from '../merchant/merchant.service';
import { MerchantDocument } from '../merchant/schema/merchant.schema';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CustomerService } from '../customer/customer.service';
import { CustomerDocument } from '../customer/schema/customer.schema';
import { ProductService } from '../product/product.service';
import { ProductDocument } from '../product/schema/product.schema';
import { OrderDocument } from './schema/order.schema';
import { randomUUID } from 'crypto';


@Injectable()
export class ProductProvider {
  constructor(
    private readonly fileService: FileService,
    private readonly orderService: OrderService,
    private readonly customerService: CustomerService,
    private readonly merchantService: MerchantService,
    private readonly productService: ProductService
  ) { }

  async createOrder(createOrderDto: CreateOrderDto, userId: string) {
    const groupId = randomUUID();
    const customer: CustomerDocument = await this.customerService.getCustomer({ user: new Types.ObjectId(userId) });

    const itemsByMerchant = new Map<string, typeof createOrderDto.products>();

    for (const item of createOrderDto.products) {
      const product: ProductDocument = await this.productService.getProduct({ _id: item.productId });
      if (!product) throw new BadRequestException(`Product not found`);

      const merchantId = product.merchant.toString();

      if (!itemsByMerchant.has(merchantId)) {
        itemsByMerchant.set(merchantId, []);
      }
      itemsByMerchant.get(merchantId)!.push(item);
    }

    const createdOrders: OrderDocument[] = [];

    for (const [merchantId, items] of itemsByMerchant.entries()) {
      for (const item of items) {
        const product: ProductDocument = await this.productService.getProduct({ _id: item.productId })
        const variant = product.variants.find(variant =>
          variant.size === item.variant.size && variant.color === item.variant.color
        )

        if (!variant) throw new BadRequestException(`Variant not found`);

        if (variant.stock < item.quantity) {
          throw new BadRequestException(`Insufficient stock for product ${product.name}`);
        }
      }

      const order = await this.orderService.createOrder({
        ...createOrderDto,
        merchant: merchantId,
        customer: customer._id,
        products: items,
        groupId
      });

      await Promise.all(items.map(item =>
        this.productService.updateProduct(
          {
            _id: item.productId, 'variants.size': item.variant.size,
            'variants.color': item.variant.color
          },
          { $inc: { 'variants.$.stock': -item.quantity } },
        )
      ));

      createdOrders.push(order);
    }

    return {
      success: true,
      message: 'Order created successfully',
      data: createdOrders,
    };
  }

  async getOrder(orderId: string) {
    const data = await this.orderService.getOrder({ _id: orderId });

    if (!data) {
      throw new NotFoundException('Product not found');
    }

    return {
      success: true,
      message: 'Product fetched successfully',
      data,
    };
  }

  async getCustomerOrder(groupId: string, customerId: string) {
    const { count, data } = await this.orderService.getOrders({ groupId, customer: customerId })

    if (orders.count === 0) {
      throw new NotFoundException('Order not found');
    }

    const base = orders[0];

    return {
      orderId: groupId,
      customerId: base.customer._id,
      shippingAddress: base.address,
      paymentMethod: base.paymentMethod,
      status: orders.data.every(),
      createdAt: base.createdAt,
      merchantOrders: orders.data.map((order) => ({
        orderId: order._id,
        merchant: order.merchantId,
        items: order.items,
        status: order.status,
        trackingInfo: order.trackingInfo,
      })),
    };
  }


  async getMerchantOrder(userId: string, productId: string) {
    const merchant: MerchantDocument = await this.merchantService.getMerchant({ user: new Types.ObjectId(userId) });
    const data = await this.orderService.getOrder({ merchant: merchant._id.toString() });

    if (!data) {
      throw new NotFoundException('Order not found');
    }

    return {
      success: true,
      message: 'Order fetched successfully',
      data,
    };
  }

  async getProducts(query: GetProductsDto) {
    const _query: FilterQuery<ProductDocument> = {};
    const paginationQuery: Partial<PaginationQuery> = {};

    if (query.search) {
      const search = query.search.trim();
      const match = search.match(DEFAULT_MATCHERS.price);

      if (match) {
        const min = Number(match[1]) * 100_000;
        const max = Number(match[3]) * 100_000;

        _query['variants'] = {
          $elemMatch: {
            price: { $gte: min, $lte: max }
          }
        };

      } else {
        _query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { status: { $regex: search, $options: 'i' } },
        ];

        if (!isNaN(Number(search))) {
          _query.$or.push(
            { 'variants.price': Number(search) },
            { rating: Number(search) }
          );
        }
      }

      delete query.search;
    }

    if (query.priceRange) {
      const match = query.priceRange.match(DEFAULT_MATCHERS.price);

      if (match) {
        const min = Number(match[1]) * 100_000;
        const max = Number(match[3]) * 100_000;

        _query['variants'] = {
          $elemMatch: {
            price: { $gte: min, $lte: max }
          }
        };
      }

      delete query.priceRange;
    }

    if (query.category) {
      _query.category = query.category;
      delete query.category;
    }

    if (query.rating) {
      _query.rating = query.rating;
      delete query.rating;
    }

    if (query.priceRange) {
      _query.priceRange = query.priceRange;
      delete query.priceRange;
    }

    if (query.status) {
      _query.status = query.status;
      delete query.status
    }

    if (query.limit) {
      paginationQuery.limit = query.limit;
      delete query.limit;
    }

    if (query.page) {
      paginationQuery.page = query.page;
      delete query.page;
    }

    const { data, page, count, totalPages } = await this.orderService.getProducts(
      _query,
      paginationQuery as PaginationQuery,
    );

    return {
      success: true,
      message: 'Products fetched successfully',
      data,
      meta: {
        page,
        count,
        totalPages,
      },
    };
  }

  async getProductsFilters() {
    const data = await this.orderService.getProductsFilters();

    return {
      success: true,
      message: 'filters fetched successfully',
      data,
    };
  }

  async getMerchantProducts(userId: string, query: GetProductsDto) {
    const merchant: MerchantDocument = await this.merchantService.getMerchant({ user: new Types.ObjectId(userId) });
    const _query: FilterQuery<ProductDocument> = { merchant: merchant._id };
    const paginationQuery: Partial<PaginationQuery> = {};

    if (query.search) {
      const search = query.search.trim();
      const match = search.match(DEFAULT_MATCHERS.price)

      if (match) {
        const min = Number(match[1]) * 100_000;
        const max = Number(match[3]) * 100_000;

        _query['variants'] = {
          $elemMatch: {
            price: { $gte: min, $lte: max }
          }
        };

      } else {
        _query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { status: { $regex: search, $options: 'i' } },
        ];

        if (!isNaN(Number(search))) {
          _query.$or.push(
            { 'variants.price': Number(search) },
            { rating: Number(search) }
          );
        }
      }

      delete query.search;
    }

    if (query.priceRange) {
      const match = query.priceRange.match(DEFAULT_MATCHERS.price);

      if (match) {
        const min = Number(match[1]) * 100_000;
        const max = Number(match[3]) * 100_000;

        _query['variants'] = {
          $elemMatch: {
            price: { $gte: min, $lte: max }
          }
        };
      }

      delete query.priceRange;
    }

    if (query.category) {
      _query.category = query.category;
      delete query.category;
    }

    if (query.rating) {
      _query.rating = query.rating;
      delete query.rating;
    }

    if (query.priceRange) {
      _query.priceRange = query.priceRange;
      delete query.priceRange;
    }

    if (query.status) {
      _query.status = query.status;
      delete query.status
    }

    if (query.limit) {
      paginationQuery.limit = query.limit;
      delete query.limit;
    }

    if (query.page) {
      paginationQuery.page = query.page;
      delete query.page;
    }

    const { data, page, count, totalPages } = await this.orderService.getProducts(
      _query,
      paginationQuery as PaginationQuery,
    );

    return {
      success: true,
      message: 'Products fetched successfully',
      data,
      meta: {
        page,
        count,
        totalPages,
      },
    };
  }

  async updateProduct(productId: string, updateProductDto: UpdateProductDto) {
    if (updateProductDto.images) {
      const imagesUrl = await this.fileService.uploadMultipleResources(updateProductDto.images, { resource_type: 'image' })
      updateProductDto.images = imagesUrl.map((image) => image.url);
    }

    const data = await this.orderService.updateProduct(
      { _id: productId },
      updateProductDto,
    );

    if (!data) {
      throw new NotFoundException('Product not found');
    }

    return {
      success: true,
      message: 'Product updated successfully',
      data,
    };
  }

  async deleteProduct(productId: string) {
    const data = await this.orderService.deleteProduct({ _id: productId });

    if (!data) {
      throw new NotFoundException('Product not found');
    }

    return {
      success: true,
      message: 'Product deleted',
    }
  }
}
