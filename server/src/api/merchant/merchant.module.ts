import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { KycVerification, KycVerificationSchema } from './schema/kyc-verification.schema';
import { SharedModule } from 'src/shared/shared.module';
import { Merchant, MerchantSchema } from './schema/merchant.schema';
import { MerchantService } from './merchant.service';
import { MerchantController } from './merchant.controller';
import { MerchantProvider } from './merchant.provider';
import { WalletModule } from '../wallet/wallet.module';

@Module({
   imports: [
      MongooseModule.forFeatureAsync([
         {
            name: Merchant.name,
            useFactory() {
               const schema = MerchantSchema;

               schema.virtual('kycDetails', {
                  justOne: true,
                  foreignField: 'Merchant',
                  localField: '_id',
                  ref: KycVerification.name,
               });

               return schema;
            },
         },
         {
            name: KycVerification.name,
            useFactory() {
               const schema = KycVerificationSchema;

               return schema;
            },
         },
      ]),
      UserModule,
      WalletModule,
      SharedModule,
   ],
   providers: [MerchantService, MerchantProvider],
   controllers: [MerchantController],
   exports: [MerchantService, MerchantProvider],
})
export class MerchantModule { }
