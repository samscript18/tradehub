import { forwardRef, Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentProvider } from './providers/payment.provider';
import { PaymentService } from './services/payment.service';
import { PaystackService } from './services/paystack.service';
import { PaystackProvider } from './providers/paystack.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from 'src/shared/shared.module';
import { OrderModule } from '../order/order.module';
import { UserModule } from '../user/user.module';
import { PaymentAttempt, PaymentAttemptSchema } from './schema/payment.schema';
import { WebhookService } from './services/webhook.service';
import { CustomerModule } from '../customer/customer.module';
import { NotificationModule } from '../notification/notification.module';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PaymentAttempt.name,
        schema: PaymentAttemptSchema,
      },
    ]),
    SharedModule,
    UserModule,
    CustomerModule,
    forwardRef(() => OrderModule),
    NotificationModule,
    UserModule,
    WalletModule
  ],
  controllers: [PaymentController],
  providers: [PaymentProvider, PaymentService, WebhookService, PaystackService, PaystackProvider],
  exports: [PaymentService, PaystackService],
})
export class PaymentModule { }