import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { schemaOptions } from 'src/shared/constants/db.const';
import { TransactionStatus, TransactionType } from '../enums/transaction.enum';
import { Wallet, WalletDocument } from './wallet.schema';

@Schema(schemaOptions)
export class Transaction {

  @Prop({ type: Types.ObjectId, ref: Wallet.name, required: true, index: true })
  wallet: Types.ObjectId | WalletDocument;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: String, enum: Object.values(TransactionType), required: true })
  type: TransactionType;

  @Prop({ type: String, enum: Object.values(TransactionStatus), default: TransactionStatus.PENDING })
  status: TransactionStatus;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String, unique: true })
  reference: string;

  @Prop({ type: Object })
  metadata: object;
}

export type TransactionDocument = HydratedDocument<Transaction>;
export const TransactionSchema = SchemaFactory.createForClass(Transaction);
TransactionSchema.index({ wallet: 1, createdAt: 1 })