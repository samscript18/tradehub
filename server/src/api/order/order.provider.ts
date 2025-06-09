import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FilterQuery, Types } from 'mongoose';
import { PaginationQuery } from 'src/shared/interfaces/pagination.interface';
import { MerchantService } from '../merchant/merchant.service';
import { MerchantDocument } from '../merchant/schema/merchant.schema';
import { OrderService } from './services/order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CustomerService } from '../customer/customer.service';
import { CustomerDocument } from '../customer/schema/customer.schema';
import { ProductService } from '../product/product.service';
import { ProductDocument } from '../product/schema/product.schema';
import { OrderDocument } from './schema/order.schema';
import { v4 } from 'uuid'
import { UpdateOrderDto } from './dto/update-order.dto';
import { GetOrdersDto } from './dto/get-order.dto';
import { NotificationProvider } from '../notification/notification.provider';


@Injectable()
export class OrderProvider {
  constructor(
    private readonly orderService: OrderService,
    private readonly customerService: CustomerService,
    private readonly merchantService: MerchantService,
    private readonly productService: ProductService,
    private readonly notificationProvider: NotificationProvider
  ) { }

  async createOrder(createOrderDto: CreateOrderDto, userId: string) {
    const groupId = v4();
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

      const merchant: MerchantDocument = await this.merchantService.getMerchant({ _id: merchantId });

      await this.notificationProvider.createNotification({
        message: `New order ${order._id} has been received from ${customer.firstName} ${customer.lastName}`,
        type: 'order_placed'
      }, merchant.user._id.toString());
    }

    return {
      success: true,
      message: 'Order created successfully',
      data: { _id: groupId, orders: createdOrders },
    };
  }

  async getCustomerOrder(groupId: string, userId: string) {
    const customer: CustomerDocument = await this.customerService.getCustomer({ user: new Types.ObjectId(userId) });
    const { count, data: orders } = await this.orderService.getOrders({ groupId, customer: customer._id })

    if (count === 0) {
      throw new NotFoundException('Order not found');
    }

    const base = orders[0];
    const statuses = orders.map((order) => order.status)
    const status = await this.orderService.computeAggregatedStatus(statuses)

    return {
      success: true,
      message: 'Order fetched successfully',
      data: {
        orderId: groupId,
        customerId: base.customer._id,
        address: base.address,
        status: status,
        merchantOrders: orders.map((order) => ({
          orderId: order._id,
          merchant: order.merchant,
          items: order.items,
          status: order.status,
        })),
        products: orders.map((order) => order.items.map((item) => { item.product, item.quantity })),
        price: orders.reduce((acc, curr) => acc + curr.price, 0)
      }
    }
  }


  async getMerchantOrder(userId: string, orderId: string) {
    const merchant: MerchantDocument = await this.merchantService.getMerchant({ user: new Types.ObjectId(userId) });
    const data = await this.orderService.getOrder({ _id: orderId, merchant: merchant._id.toString() });

    if (!data) {
      throw new NotFoundException('Order not found');
    }

    return {
      success: true,
      message: 'Order fetched successfully',
      data,
    };
  }

  async getCustomerOrders(userId: string, query: GetOrdersDto) {
    const customer: CustomerDocument = await this.customerService.getCustomer({ user: new Types.ObjectId(userId) });
    const _query: FilterQuery<ProductDocument> = { customer: customer._id };
    const paginationQuery: Partial<PaginationQuery> = {};

    if (query.search) {
      const search = query.search.trim();

      _query.$or = [
        { _id: { $regex: search, $options: 'i' } },
      ];

      delete query.search;
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

    const { data: orders, page, count, totalPages } = await this.orderService.getOrders(
      _query,
      paginationQuery as PaginationQuery,
    );

    const grouped = new Map<string, OrderDocument[]>();
    for (const order of orders) {
      if (!grouped.has(order.groupId)) {
        grouped.set(order.groupId, []);
      }
      grouped.get(order.groupId).push(order);
    }

    const result = [];

    for (const [groupId, groupOrders] of grouped.entries()) {
      const statuses = groupOrders.map((order) => order.status);
      const base = groupOrders[0];
      const status = await this.orderService.computeAggregatedStatus(statuses);

      result.push({
        orderId: groupId,
        status,
        address: base.address,
        merchantOrders: groupOrders.map((order) => ({
          orderId: order._id,
          merchant: {
            _id: order.merchant._id,
            name: order.merchant.storeName,
            logo: order.merchant.storeLogo
          },
          items: order.items,
          status: order.status,
        })),
        products: groupOrders.map((order) => order.items.map((item) => { item.product, item.quantity })),
        price: groupOrders.reduce((acc, curr) => acc + curr.price, 0)
      });
    }

    return {
      success: true,
      message: 'Orders fetched successfully',
      data: result,
      meta: {
        page,
        count,
        totalPages,
      },
    };
  }

  async getMerchantOrders(userId: string, query: GetOrdersDto) {
    const merchant: MerchantDocument = await this.merchantService.getMerchant({ user: new Types.ObjectId(userId) });
    const _query: FilterQuery<ProductDocument> = { merchant: merchant._id };
    const paginationQuery: Partial<PaginationQuery> = {};

    if (query.search) {
      const search = query.search.trim();

      _query.$or = [
        { _id: { $regex: search, $options: 'i' } },
      ];

      delete query.search;
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

    const { data, page, count, totalPages } = await this.orderService.getOrders(
      _query,
      paginationQuery as PaginationQuery,
    );

    return {
      success: true,
      message: 'Orders fetched successfully',
      data,
      meta: {
        page,
        count,
        totalPages,
      },
    };
  }

  async updateOrderStatus(orderId: string, updateOrderDto: UpdateOrderDto) {
    const data: OrderDocument = await this.orderService.updateOrder(
      { _id: orderId },
      { status: updateOrderDto.status },
    );

    if (!data) {
      throw new NotFoundException('Order not found');
    }

    const customer: CustomerDocument = await this.customerService.getCustomer({ _id: data.customer })

    await this.notificationProvider.createNotification({
      message: `Order ${data._id} has been updated to ${data.status}`,
      type: 'order_updated'
    }, customer.user._id.toString());

    return {
      success: true,
      message: 'Order updated successfully',
      data,
    };
  }

  async deleteOrder(orderId: string) {
    const data = await this.orderService.deleteOrder({ _id: orderId });

    if (!data) {
      throw new NotFoundException('Order not found');
    }

    return {
      success: true,
      message: 'Order deleted',
    }
  }
}
