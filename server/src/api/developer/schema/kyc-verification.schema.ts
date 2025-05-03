import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { schemaOptions } from 'src/shared/constants/db.const';
import { KycIdType, KycStatus } from '../enums';
import { Developer, DeveloperDocument } from './developer.schema';

@Schema(schemaOptions)
export class KycVerification {
   @Prop({ type: Types.ObjectId, ref: Developer.name, required: true })
   developer: DeveloperDocument | string;

   @Prop()
   idDoc: string;

   @Prop({ type: String, enum: Object.values(KycIdType) })
   idType: KycIdType;

   @Prop()
   professionalCert: string;

   @Prop()
   idDocPublicId: string;

   @Prop()
   professionalCertPublicId: string;

   @Prop({
      type: String,
      enum: Object.values(KycStatus),
      default: KycStatus.PENDING,
   })
   status: KycStatus;
}

export type KycVerificationDocument = HydratedDocument<KycVerification>;
export const KycVerificationSchema =
   SchemaFactory.createForClass(KycVerification);
