import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { MerchantModule } from './merchant/merchant.module';
import { TokenModule } from './token/token.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { NotificationModule } from './notification/notification.module';
import { PaymentModule } from './payment/payment.module';
import { WalletModule } from './wallet/wallet.module';


@Module({
   imports: [
      DatabaseModule,
      AuthModule,
      TokenModule,
      UserModule,
      CustomerModule,
      MerchantModule,
      ProductModule,
      OrderModule,
      NotificationModule,
      PaymentModule,
      WalletModule
   ]
})
export class ApiModule { }
