import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { schemaOptions } from 'src/shared/constants/db.const';

@Schema(schemaOptions)
export class ProductVariant {
  @Prop({ required: true })
  size: string;

  @Prop({ required: false })
  color?: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  stock: number;
}

export type ProductVariantDocument = HydratedDocument<ProductVariant>
export const ProductVariantSchema = SchemaFactory.createForClass(ProductVariant);