import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterQuery, Types } from 'mongoose';
import { FileService } from 'src/shared/file/file.service';
import { PaginationQuery } from 'src/shared/interfaces/pagination.interface';
import DEFAULT_MATCHERS from 'src/shared/constants/regex.const';
import { MerchantService } from '../merchant/merchant.service';
import { ProductService } from './product.service';
import { MerchantDocument } from '../merchant/schema/merchant.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsDto } from './dto/get-products.dto';
import { ProductDocument } from './schema/product.schema';

@Injectable()
export class ProductProvider {
  constructor(
    private readonly fileService: FileService,
    private readonly productService: ProductService,
    private readonly merchantService: MerchantService
  ) { }

  async createProduct(createProductDto: CreateProductDto, userId: string) {
    if (createProductDto.images) {
      const imagesUrl = await this.fileService.uploadMultipleResources(createProductDto.images, { resource_type: 'image' })
      createProductDto.images = imagesUrl.map((image) => image.url);
    }

    const merchant: MerchantDocument = await this.merchantService.getMerchant({ user: new Types.ObjectId(userId) });

    const newProductDto = { ...createProductDto, merchant: merchant._id };

    const data = await this.productService.createProduct(newProductDto);

    return {
      success: true,
      message: 'Product created successfully',
      data,
    };
  }

  async getProduct(productId: string) {
    const data = await this.productService.getProduct({ _id: productId });

    if (!data) {
      throw new NotFoundException('Product not found');
    }

    return {
      success: true,
      message: 'Product fetched successfully',
      data,
    };
  }

  async getMerchantProduct(userId: string, productId: string) {
    const merchant: MerchantDocument = await this.merchantService.getMerchant({ user: new Types.ObjectId(userId) });
    const data = await this.productService.getProduct({ _id: productId, merchant: merchant._id.toString() });

    if (!data) {
      throw new NotFoundException('Product not found');
    }

    return {
      success: true,
      message: 'Product fetched successfully',
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

    const { data, page, count, totalPages } = await this.productService.getProducts(
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
    const data = await this.productService.getProductsFilters();

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

    const { data, page, count, totalPages } = await this.productService.getProducts(
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

    const data = await this.productService.updateProduct(
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
    const data = await this.productService.deleteProduct({ _id: productId });

    if (!data) {
      throw new NotFoundException('Product not found');
    }

    return {
      success: true,
      message: 'Product deleted',
    }
  }
}
