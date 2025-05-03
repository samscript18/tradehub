import { Module } from '@nestjs/common';
import { PropertyListingService } from './listing.service';
import { PropertyListingController } from './listing.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PropertyListing, PropertyListingSchema } from './schema/listing.schema';
import { SharedModule } from 'src/shared/shared.module';
import { PropertyListingProvider } from './listing.provider';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeatureAsync([
      {
        name: PropertyListing.name,
        useFactory() {
          const schema = PropertyListingSchema;

          return schema;
        },
      },
    ]),],
  controllers: [PropertyListingController],
  providers: [PropertyListingService, PropertyListingProvider],
})
export class PropertyListingModule { }
