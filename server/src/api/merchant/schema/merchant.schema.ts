import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User, UserDocument } from 'src/api/user/schema/user.schema';
import { schemaOptions } from 'src/shared/constants/db.const';

@Schema(schemaOptions)
export class Merchant {
   @Prop({
      type: Types.ObjectId,
      ref: User.name,
   })
   user: UserDocument;

   @Prop()
   businessName: string;

   @Prop()
   businessLogo: string;

   @Prop()
   businessDescription: string;

   @Prop()
   website?: string;

   @Prop({
      type: {
         facebook: {
            type: String,
         },
         twitter: {
            type: String,
         },
         whatsapp: {
            type: String,
         },
         linkedin: {
            type: String,
         },
      },
      required: false,
   })
   socials: {
      facebook: string;
      twitter: string;
      whatsapp: string;
      linkedin: string;
   };

   @Prop({ default: false })
   isVerified: boolean;
}

export type MerchantDocument = HydratedDocument<Merchant>;
export const MerchantSchema = SchemaFactory.createForClass(Merchant);
