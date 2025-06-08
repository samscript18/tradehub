import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer, CustomerDocument } from './schema/customer.schema';
import { FilterQuery, Model, Query, QueryOptions, UpdateQuery } from 'mongoose';

@Injectable()
export class CustomerService {
   constructor(
      @InjectModel(Customer.name)
      private readonly _customerModel: Model<CustomerDocument>,
   ) { }

   async populate(model: Query<any, CustomerDocument>) {
      return await model.populate([
         { path: 'user', select: 'email phoneNumber role' },
      ]);
   }

   async createCustomer<T>(data: T) {
      const customer = await this._customerModel.create(data);

      return customer;
   }

   async findOrCreateCustomer<T>(filter: FilterQuery<CustomerDocument>, data: T) {
      let customer = await this.populate(this._customerModel.findOne(filter));

      if (!customer) {
         customer = await this._customerModel.create(data);
      }

      return customer;
   }

   async getCustomer(filter: FilterQuery<CustomerDocument>) {
      const customer = await this.populate(this._customerModel.findOne(filter));

      return customer;
   }

   async getCustomers(filter: FilterQuery<CustomerDocument>) {
      const customers = await this.populate(this._customerModel.find(filter));

      return customers;
   }

   async updateCustomer(
      filter: FilterQuery<CustomerDocument>,
      update: UpdateQuery<CustomerDocument>,
      options?: QueryOptions<CustomerDocument>,
   ) {
      const customer = await this.populate(
         this._customerModel.findOneAndUpdate(filter, update, {
            new: true,
            runValidators: true,
            ...options,
         }),
      );

      return customer;
   }

   async deleteCustomer(filter: FilterQuery<CustomerDocument>) {
      const customer = await this._customerModel.findOneAndDelete(filter);

      return customer;
   }
}
