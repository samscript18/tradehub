import { Injectable } from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PaymentAttempt, PaymentAttemptDocument } from '../schema/payment.schema';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(PaymentAttempt.name) private readonly _paymentAttemptModel: Model<PaymentAttemptDocument>,
  ) { }

  async createPaymentAttempt<T>(createPaymentAttemptDto: T) {
    const data = await this._paymentAttemptModel.create(createPaymentAttemptDto);

    return data;
  }

  async getPaymentAttempt(filter: FilterQuery<PaymentAttemptDocument>) {
    return await this._paymentAttemptModel.findOne(filter);
  }

  async updatePaymentAttempt(filter: FilterQuery<PaymentAttemptDocument>, update: UpdateQuery<PaymentAttemptDocument>) {
    return await this._paymentAttemptModel.findOneAndUpdate(filter, update, {
      new: true,
      runValidators: true,
    }).populate({
      path: 'user',
      select: '_id email', 
    });;
  }

  async getPaymentAttempts(filter: FilterQuery<PaymentAttemptDocument>) {
    return await this._paymentAttemptModel.find(filter);
  }


  
}