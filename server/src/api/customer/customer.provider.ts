import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Types } from 'mongoose';
import { CustomerService } from './customer.service';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerProvider {
   constructor(
      private readonly CustomerService: CustomerService,
      private readonly userService: UserService,
   ) { }

   async getCustomers() {
      const data = await this.CustomerService.getCustomers({});

      if (!data) {
         throw new NotFoundException('Customers not found');
      }

      return {
         success: true,
         message: 'Customers profile fetched',
         data,
      };
   }

   async getCustomer(CustomerId: string) {
      const data = await this.CustomerService.getCustomer({ _id: CustomerId });

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
      const data = await this.CustomerService.updateCustomer(
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
}
