import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Gender } from 'src/api/user/enums';
import { User, UserDocument } from 'src/api/user/schema/user.schema';
import { schemaOptions } from 'src/shared/constants/db.const';
import { EmploymentStatus } from '../enums';

@Schema(schemaOptions)
export class Applicant {
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

   @Prop()
   creditScore: number;

   @Prop()
   annualIncome: number;

   @Prop({ type: String, enum: Object.values(EmploymentStatus) })
   employmentStatus: EmploymentStatus;

   @Prop()
   location: string;

   @Prop({ default: false })
   isPreQualified: boolean;
}

export type ApplicantDocument = HydratedDocument<Applicant>;
export const ApplicantSchema = SchemaFactory.createForClass(Applicant);
