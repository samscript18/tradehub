import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Merchant } from 'src/api/merchant/schema/merchant.schema';
import { schemaOptions } from 'src/shared/constants/db.const';

@Schema(schemaOptions)
export class Wallet {
  @Prop({ type: Types.ObjectId, ref: Merchant.name, required: true, unique: true, index: true })
  merchant: Types.ObjectId;

  @Prop({ type: Number, default: 0, min: 0 })
  balance: number;

  @Prop({ type: String, default: 'NGN' })
  currency: string;
}

export type WalletDocument = HydratedDocument<Wallet>;
export const WalletSchema = SchemaFactory.createForClass(Wallet);

