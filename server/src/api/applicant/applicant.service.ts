import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Applicant, ApplicantDocument } from './schema/applicant.schema';
import { FilterQuery, Model, Query, QueryOptions, UpdateQuery } from 'mongoose';

@Injectable()
export class ApplicantService {
   constructor(
      @InjectModel(Applicant.name)
      private readonly _applicantModel: Model<ApplicantDocument>,
   ) { }

   async populate(model: Query<any, ApplicantDocument>) {
      return await model.populate([
         { path: 'user', select: 'email phoneNumber role' },
      ]);
   }

   async createApplicant<T>(data: T) {
      const applicant = await this._applicantModel.create(data);

      return applicant;
   }

   async findOrCreateApplicant<T>(filter: FilterQuery<ApplicantDocument>, data: T) {
      let applicant = await this.populate(this._applicantModel.findOne(filter));

      if (!applicant) {
         applicant = await this._applicantModel.create(data);
      }

      return applicant;
   }

   async getApplicant(filter: FilterQuery<ApplicantDocument>) {
      const applicant = await this.populate(this._applicantModel.findOne(filter));

      return applicant;
   }

   async getApplicants(filter: FilterQuery<ApplicantDocument>) {
      const applicants = await this.populate(this._applicantModel.find(filter));

      return applicants;
   }

   async updateApplicant(
      filter: FilterQuery<ApplicantDocument>,
      update: UpdateQuery<ApplicantDocument>,
      options?: QueryOptions<ApplicantDocument>,
   ) {
      const applicant = await this.populate(
         this._applicantModel.findOneAndUpdate(filter, update, {
            new: true,
            runValidators: true,
            ...options,
         }),
      );

      return applicant;
   }

   async deleteApplicant(filter: FilterQuery<ApplicantDocument>) {
      const applicant = await this._applicantModel.findOneAndDelete(filter);

      return applicant;
   }
}
