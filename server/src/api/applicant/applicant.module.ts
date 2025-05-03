import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { ApplicantService } from './applicant.service';
import { ApplicantController } from './applicant.controller';
import { ApplicantProvider } from './applicant.provider';
import { Applicant, ApplicantSchema } from './schema/applicant.schema';

@Module({
   imports: [
      MongooseModule.forFeatureAsync([
         {
            name: Applicant.name,
            useFactory() {
               const schema = ApplicantSchema;

               return schema;
            },
         },
      ]),
      UserModule,
   ],
   providers: [ApplicantProvider, ApplicantService],
   controllers: [ApplicantController],
   exports: [ApplicantService],
})
export class ApplicantModule { }
