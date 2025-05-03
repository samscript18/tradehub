import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ApplicantModule } from './applicant/applicant.module';
import { DeveloperModule } from './developer/developer.module';
import { PropertyListingModule } from './listing/listing.module';
import { TokenModule } from './token/token.module';
import { UserModule } from './user/user.module';

@Module({
   imports: [
      DatabaseModule,
      AuthModule,
      TokenModule,
      UserModule,
      ApplicantModule,
      DeveloperModule,
      PropertyListingModule,
   ]
})
export class ApiModule { }
