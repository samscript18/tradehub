import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer, CustomerDocument } from './schema/customer.schema';
import { FilterQuery, Model, Query, QueryOptions, UpdateQuery } from 'mongoose';

@Injectable()
export class CustomerService {
   constructor(
      @InjectModel(Customer.name)
      private readonly _CustomerModel: Model<CustomerDocument>,
   ) { }

   async populate(model: Query<any, CustomerDocument>) {
      return await model.populate([
         { path: 'user', select: 'email phoneNumber role' },
      ]);
   }

   async createCustomer<T>(data: T) {
      const Customer = await this._CustomerModel.create(data);

      return Customer;
   }

   async findOrCreateCustomer<T>(filter: FilterQuery<CustomerDocument>, data: T) {
      let Customer = await this.populate(this._CustomerModel.findOne(filter));

      if (!Customer) {
         Customer = await this._CustomerModel.create(data);
      }

      return Customer;
   }

   async getCustomer(filter: FilterQuery<CustomerDocument>) {
      const Customer = await this.populate(this._CustomerModel.findOne(filter));

      return Customer;
   }

   async getCustomers(filter: FilterQuery<CustomerDocument>) {
      const Customers = await this.populate(this._CustomerModel.find(filter));

      return Customers;
   }

   async updateCustomer(
      filter: FilterQuery<CustomerDocument>,
      update: UpdateQuery<CustomerDocument>,
      options?: QueryOptions<CustomerDocument>,
   ) {
      const Customer = await this.populate(
         this._CustomerModel.findOneAndUpdate(filter, update, {
            new: true,
            runValidators: true,
            ...options,
         }),
      );

      return Customer;
   }

   async deleteCustomer(filter: FilterQuery<CustomerDocument>) {
      const Customer = await this._CustomerModel.findOneAndDelete(filter);

      return Customer;
   }
}
