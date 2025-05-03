import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User, UserDocument } from 'src/api/user/schema/user.schema';
import { schemaOptions } from 'src/shared/constants/db.const';

@Schema(schemaOptions)
export class Developer {
   @Prop({
      type: Types.ObjectId,
      ref: User.name,
   })
   user: UserDocument;

   @Prop()
   companyName: string;

   @Prop()
   companyLogo: string;

   @Prop()
   companyDescription: string;

   @Prop()
   yearsOfExperience: number;

   @Prop()
   website?: string;

   @Prop()
   portfolio?: string;

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

export type DeveloperDocument = HydratedDocument<Developer>;
export const DeveloperSchema = SchemaFactory.createForClass(Developer);
