import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrderController } from './order.controller';
import { OrderProvider } from './order.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schema/order.schema';
import { SharedModule } from 'src/shared/shared.module';
import { CustomerModule } from '../customer/customer.module';
import { MerchantModule } from '../merchant/merchant.module';
import { NotificationModule } from '../notification/notification.module';
import { ProductModule } from '../product/product.module';
import { CheckoutService } from './services/checkout.service';
import { PaymentModule } from '../payment/payment.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Order.name,
        useFactory() {
          const schema = OrderSchema;

          return schema;
        },
      },
    ]),
    SharedModule,
    CustomerModule,
    MerchantModule,
    ProductModule,
    NotificationModule,
    PaymentModule,
    UserModule
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderProvider, CheckoutService],
  exports: [OrderProvider, OrderService]
})
export class OrderModule { }
