import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Types } from 'mongoose';
import { CustomerService } from './customer.service';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerProvider {
   constructor(
      private readonly customerService: CustomerService,
      private readonly userService: UserService,
   ) { }

   async getCustomers() {
      const data = await this.customerService.getCustomers({});

      if (!data) {
         throw new NotFoundException('Customers not found');
      }

      return {
         success: true,
         message: 'Customers profile fetched',
         data,
      };
   }

   async getCustomer(customerId: string) {
      const data = await this.customerService.getCustomer({ _id: customerId });

      if (!data) {
         throw new NotFoundException('Customer not found');
      }

      return {
         success: true,
         message: 'Customer profile fetched',
         data,
      };
   }

   async getUserCustomer(userId: string) {
      const data = await this.customerService.getCustomer({ user: new Types.ObjectId(userId) });

      if (!data) {
         throw new NotFoundException('Customer not found');
      }

      return {
         success: true,
         message: 'Customer profile fetched',
         data,
      };
   }

   async updateCustomer(updateCustomerDto: UpdateCustomerDto, userId: string) {
      const data = await this.customerService.updateCustomer(
         { user: new Types.ObjectId(userId) },
         updateCustomerDto,
      );

      await this.userService.updateUser({ _id: userId }, updateCustomerDto);

      if (!data) {
         throw new NotFoundException('Customer not found');
      }

      return {
         success: true,
         message: 'Customer profile updated',
         data,
      };
   }

   // async addAddress(customerId: string, address: Address) {
   //    return this.customerModel.findByIdAndUpdate(
   //       customerId,
   //       {
   //          $push: { addresses: address }
   //       },
   //       { new: true }
   //    );
   // }

   // async setDefaultAddress(customerId: string, addressIndex: number) {
   //    const customer = await this.customerModel.findById(customerId);
   //    customer.defaultAddress = customer.addresses[addressIndex];
   //    return customer.save();
   // }
}
