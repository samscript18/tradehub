import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { KycVerification, KycVerificationSchema } from './schema/kyc-verification.schema';
import { SharedModule } from 'src/shared/shared.module';
import { Developer, DeveloperSchema } from './schema/developer.schema';
import { DeveloperService } from './developer.service';
import { DeveloperController } from './developer.controller';
import { DeveloperProvider } from './developer.provider';

@Module({
   imports: [
      MongooseModule.forFeatureAsync([
         {
            name: Developer.name,
            useFactory() {
               const schema = DeveloperSchema;

               schema.virtual('kycDetails', {
                  justOne: true,
                  foreignField: 'developer',
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
      SharedModule,
   ],
   providers: [DeveloperService, DeveloperProvider],
   controllers: [DeveloperController],
   exports: [DeveloperService],
})
export class DeveloperModule { }
