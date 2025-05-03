import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, PipelineStage, Query, QueryOptions, UpdateQuery } from 'mongoose';
import { KycDocsDto } from './dto/kyc-verification.dto';
import { KycVerification, KycVerificationDocument } from './schema/kyc-verification.schema';
import { Developer, DeveloperDocument } from './schema/developer.schema';
import { UtilService } from 'src/shared/services/utils.service';
import { PaginationQuery } from 'src/shared/interfaces/pagination.interface';

@Injectable()
export class DeveloperService {
   constructor(
      @InjectModel(Developer.name)
      private readonly _developerModel: Model<DeveloperDocument>,
      @InjectModel(KycVerification.name)
      private readonly _kycModel: Model<KycVerificationDocument>,
      private readonly utilService: UtilService
   ) { }

   private async populate(model: Query<any, DeveloperDocument>) {
      return await model.populate([{ path: 'user', select: 'email phoneNumber role' }]);
   }

   async createDeveloper<T>(data: T) {
      const developer = await this._developerModel.create(data);

      return developer;
   }

   async findOrCreateDeveloper<T>(filter: FilterQuery<DeveloperDocument>, data: T) {
      let developer = await this.populate(this._developerModel.findOne(filter));

      if (!developer) {
         developer = await this._developerModel.create(data);
      }

      return developer;
   }

   async getDeveloper(filter: FilterQuery<DeveloperDocument>) {
      const developer = await this.populate(this._developerModel.findOne(filter));

      return developer;
   }

   async getDevelopers(filter: FilterQuery<DeveloperDocument>, paginationQuery: PaginationQuery) {
      const count = await this._developerModel.find(filter).countDocuments();
      const { skip, page, totalPages, limit } = this.utilService.resolvePaginationQuery({
         ...paginationQuery,
         count,
      });

      const data = await this.populate(this._developerModel.find(filter).limit(limit).skip(skip));

      return {
         data,
         page,
         totalPages,
         count,
      };
   }

   async updateDeveloper(
      filter: FilterQuery<DeveloperDocument>,
      update: UpdateQuery<DeveloperDocument>,
      options?: QueryOptions<DeveloperDocument>,
   ) {
      const developer = await this.populate(
         this._developerModel.findOneAndUpdate(filter, update, {
            new: true,
            runValidators: true,
            ...options,
         }),
      );

      return developer;
   }

   async deleteDeveloper(filter: FilterQuery<DeveloperDocument>) {
      const developer = await this._developerModel.findOneAndDelete(filter);

      return developer;
   }

   async updateKyc(kycVerificationDto: KycDocsDto, developerId: string) {
      const kyc = await this._kycModel.findOneAndUpdate({ developer: developerId }, kycVerificationDto, {
         upsert: true,
         new: true,
         runValidators: true,
      });

      return kyc;
   }

   async getDeveloperKyc(developerId: string) {
      const kyc = await this._kycModel.findOne({ developer: developerId });

      return kyc;
   }

   async getKycs(filter: FilterQuery<KycVerificationDocument>) {
      const kycs = await this._kycModel.find(filter).populate({
         path: 'developer',
      });

      return kycs;
   }
}
