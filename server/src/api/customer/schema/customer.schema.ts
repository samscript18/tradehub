import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Gender } from 'src/api/user/enums';
import { User, UserDocument } from 'src/api/user/schema/user.schema';
import { schemaOptions } from 'src/shared/constants/db.const';
import { Address, AddressSchema } from './address.schema';

@Schema(schemaOptions)
export class Customer {
   @Prop({
      type: Types.ObjectId,
      ref: User.name,
   })
   user: UserDocument;

   @Prop({ required: true })
   firstName: string;

   @Prop({ required: true })
   lastName: string;

   @Prop({ type: String, enum: Object.values(Gender) })
   gender: Gender;

   @Prop()
   dateOfBirth: Date;

   @Prop({ type: [AddressSchema], default: [] })
   addresses: Address[];

   @Prop({ type: AddressSchema, default: null })
   defaultAddress: Address;

}

export type CustomerDocument = HydratedDocument<Customer>;
export const CustomerSchema = SchemaFactory.createForClass(Customer);
