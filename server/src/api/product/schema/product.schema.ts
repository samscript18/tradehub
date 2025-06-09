// src/products/schemas/product.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ProductVariant, ProductVariantSchema } from './variant.schema';
import { MerchantDocument } from 'src/api/merchant/schema/merchant.schema';
import { ProductStatus } from '../enums/product.enum';
import { schemaOptions } from 'src/shared/constants/db.const';

@Schema(schemaOptions)
export class Product {
  @Prop({ type: Types.ObjectId, ref: 'Merchant', required: true })
  merchant: MerchantDocument;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;


  @Prop()
  category: string;

  @Prop([String])
  images: string[];

  @Prop({ type: [ProductVariantSchema], default: [] })
  variants: ProductVariant[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ enum: Object.values(ProductStatus), default: ProductStatus.APPROVED })
  status: string;
}

export type ProductDocument = HydratedDocument<Product>
export const ProductSchema = SchemaFactory.createForClass(Product);
