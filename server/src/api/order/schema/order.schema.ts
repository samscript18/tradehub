import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {  HydratedDocument, Types } from 'mongoose';
import { OrderStatus } from '../enums/order.enum';
import { CustomerDocument } from 'src/api/customer/schema/customer.schema';
import { MerchantDocument } from 'src/api/merchant/schema/merchant.schema';
import { ProductDocument } from 'src/api/product/schema/product.schema';
import { Address } from 'src/api/customer/schema/address.schema';
import { schemaOptions } from 'src/shared/constants/db.const';

@Schema(schemaOptions)
export class Order {
  @Prop({ required: true })
  groupId: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Customer' })
  customer: CustomerDocument;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Merchant' })
  merchant: MerchantDocument;

  @Prop({
    type: [
      {
        product: { type: Types.ObjectId, ref: 'Product', required: true },
        variant: {
          size: { type: String },
          color: { type: String },
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    required: true,
  })
  products: {
    product: ProductDocument;
    variant: { size?: string; color?: string };
    quantity: number;
    price: number;
  }[];

  @Prop({ enum: Object.values(OrderStatus), default: OrderStatus.CONFIRMED })
  status: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ required: true })
  address: Address;

  @Prop()
  trackingInfo?: string;
}

export type OrderDocument = HydratedDocument<Order>
export const OrderSchema = SchemaFactory.createForClass(Order);
