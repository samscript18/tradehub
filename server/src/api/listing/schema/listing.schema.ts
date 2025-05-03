import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { PropertyListingStatus } from '../enums/listing.enums';
import { schemaOptions } from 'src/shared/constants/db.const';

@Schema(schemaOptions)
export class PropertyListing {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  bedrooms: number;

  @Prop()
  minDownPaymentPercent: number;

  @Prop()
  minMonthlyPayment: number;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ type: [String], default: [] })
  videos: string[];

  @Prop()
  location: string;

  @Prop()
  propertyType: string;

  @Prop({ type: Types.ObjectId, ref: 'Developer', required: true })
  developer: Types.ObjectId;

  @Prop({ enum: Object.values(PropertyListingStatus), default: PropertyListingStatus.PENDING })
  status: string;

  @Prop({ default: 1.0 })
  rating: number
}

export type PropertyListingDocument = HydratedDocument<PropertyListing>;
export const PropertyListingSchema = SchemaFactory.createForClass(PropertyListing);