import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Query, QueryOptions, UpdateQuery } from 'mongoose';
import { Product, ProductDocument } from './schema/product.schema';
import { UtilService } from 'src/shared/services/utils.service';
import { PaginationQuery } from 'src/shared/interfaces/pagination.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly _productModel: Model<ProductDocument>,
    private readonly utilService: UtilService
  ) { }

  async populate(model: Query<any, ProductDocument>) {
    return await model.populate([
      { path: 'merchant', select: 'storeName storeLogo storeDescription storeCategory isVerified' },
    ]);
  }

  async createProduct<T>(data: T) {
    const product = await this._productModel.create(data);

    return product;
  }

  async getProduct(filter: FilterQuery<ProductDocument>) {
    const product = await this.populate(this._productModel.findOne(filter));

    return product;
  }

  async getProducts(filter: FilterQuery<ProductDocument>, paginationQuery?: PaginationQuery) {
    const count = await this._productModel.find(filter).countDocuments()

    const { skip, page, totalPages, limit } = this.utilService.resolvePaginationQuery({
      ...paginationQuery,
      count,
    });

    const products = await this.populate(this._productModel.find(filter).limit(limit).skip(skip));

    return {
      data: products,
      page,
      totalPages,
      count
    };
  }

  async getProductsPriceRanges(): Promise<{
    label: string;
    min: number;
    max: number;
    count: number;
  }[]> {
    const result = await this._productModel.aggregate([
      {
        $addFields: {
          price: { $toDouble: "$price" }
        }
      },
      {
        $bucket: {
          groupBy: "$price",
          boundaries: [0, 100_000, 250_000, 500_000, 1_000_000, Infinity],
          default: "Other",
          output: {
            count: { $sum: 1 }
          }
        }
      }
    ]);

    const ranges = [
      { label: 'Under 100K', range: [0, 100000] },
      { label: '100K - 250K', range: [100000, 250000] },
      { label: '250K - 500K', range: [250000, 500000] },
      { label: '500K - 1M', range: [500000, 1000000] },
      { label: 'Above 1M', range: [1000000, Infinity] }
    ];

    return ranges.map((r, i) => ({
      label: r.label,
      min: r.range[0],
      max: r.range[1] === Infinity ? null : r.range[1],
      count: result.find((_r) => _r._id === r.range[0])?.count || 0
    }));
  }

  async getProductsFilters() {
    const category = await this._productModel.distinct('category')
    const rating = await this._productModel.distinct('rating')
    const priceRange = await this.getProductsPriceRanges()

    return {
      category,
      rating,
      priceRange
    }
  }

  async updateProduct(
    filter: FilterQuery<ProductDocument>,
    update: UpdateQuery<ProductDocument>,
    options?: QueryOptions<ProductDocument>,
  ) {
    const product = await this.populate(
      this._productModel.findOneAndUpdate(filter, update, {
        new: true,
        runValidators: true,
        ...options,
      }),
    );

    return product;
  }

  async deleteProduct(filter: FilterQuery<ProductDocument>) {
    const product = await this._productModel.findOneAndDelete(filter);

    return product;
  }
}
