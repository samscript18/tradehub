import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { MerchantModule } from './merchant/merchant.module';
import { TokenModule } from './token/token.module';
import { UserModule } from './user/user.module';

@Module({
   imports: [
      DatabaseModule,
      AuthModule,
      TokenModule,
      UserModule,
      CustomerModule,
      MerchantModule,
   ]
})
export class ApiModule { }
