import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerProvider } from './customer.provider';
import { Customer, CustomerSchema } from './schema/customer.schema';

@Module({
   imports: [
      MongooseModule.forFeatureAsync([
         {
            name: Customer.name,
            useFactory() {
               const schema = CustomerSchema;

               return schema;
            }
         },
      ]),
      UserModule,
   ],
   providers: [CustomerService, CustomerProvider],
   controllers: [CustomerController],
   exports: [CustomerService],
})
export class CustomerModule { }
