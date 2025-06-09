import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Query, QueryOptions, UpdateQuery } from 'mongoose';
import { UtilService } from 'src/shared/services/utils.service';
import { PaginationQuery } from 'src/shared/interfaces/pagination.interface';
import { Order, OrderDocument } from '../schema/order.schema';
import { OrderStatus } from '../enums/order.enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly _orderModel: Model<OrderDocument>,
    private readonly utilService: UtilService
  ) { }

  async populate(model: Query<any, OrderDocument>) {
    return await model.populate([
      { path: 'merchant', select: 'storeName storeLogo storeDescription storeCategory isVerified defaultAddress' },
      { path: 'customer', select: 'firstName lastName' },
    ]);
  }

  async createOrder<T>(data: T) {
    const order = await this._orderModel.create(data);

    return order;
  }

  async getOrder(filter: FilterQuery<OrderDocument>) {
    const order = await this.populate(this._orderModel.findOne(filter));

    return order;
  }

  async getOrders(filter: FilterQuery<OrderDocument>, paginationQuery?: PaginationQuery): Promise<{
    data: OrderDocument[];
    page: number;
    totalPages: number;
    count: number;
  }> {
    const count = await this._orderModel.find(filter).countDocuments()

    const { skip, page, totalPages, limit } = this.utilService.resolvePaginationQuery({
      ...paginationQuery,
      count,
    });

    const order = await this.populate(this._orderModel.find(filter).limit(limit).skip(skip));

    return {
      data: order,
      page,
      totalPages,
      count
    };
  }

  async updateOrder(
    filter: FilterQuery<OrderDocument>,
    update: UpdateQuery<OrderDocument>,
    options?: QueryOptions<OrderDocument>,
  ) {
    const order = await this.populate(
      this._orderModel.findOneAndUpdate(filter, update, {
        new: true,
        runValidators: true,
        ...options,
      }),
    );

    return order;
  }

  async deleteOrder(filter: FilterQuery<OrderDocument>) {
    const order = await this._orderModel.findOneAndDelete(filter);

    return order;
  }

  async computeAggregatedStatus(statuses: string[]): Promise<OrderStatus> {
    const unique = new Set(statuses);

    if (unique.size === 1) return statuses[0] as OrderStatus;
    if (unique.has(OrderStatus.PROCESSING)) return OrderStatus.PROCESSING;
    if (unique.has(OrderStatus.PROCESSING) && unique.has(OrderStatus.SHIPPED)) return OrderStatus.PROCESSING;
    if (unique.has(OrderStatus.SHIPPED)) return OrderStatus.SHIPPED;

    return OrderStatus.PENDING;
  }
}