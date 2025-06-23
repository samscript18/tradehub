import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Address {
  @Prop({ required: false })
  fullName: string;

  @Prop({ required: false })
  phoneNumber: string;

  @Prop({ required: false })
  state: string;

  @Prop({ required: false })
  city: string;

  @Prop({ required: false })
  country: string;

  @Prop({ required: false })
  street: string;

  @Prop({ required: false })
  postalcode: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
