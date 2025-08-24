import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Query, QueryOptions, UpdateQuery } from 'mongoose';
import { KycDocsDto } from './dto/kyc-verification.dto';
import { KycVerification, KycVerificationDocument } from './schema/kyc-verification.schema';
import { Merchant, MerchantDocument } from './schema/merchant.schema';
import { UtilService } from 'src/shared/services/utils.service';
import { PaginationQuery } from 'src/shared/interfaces/pagination.interface';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class MerchantService {
   constructor(
      @InjectModel(Merchant.name)
      private readonly _MerchantModel: Model<MerchantDocument>,
      @InjectModel(KycVerification.name)
      private readonly _kycModel: Model<KycVerificationDocument>,
      private readonly utilService: UtilService,
      private readonly walletService: WalletService
   ) { }

   private async populate(model: Query<any, MerchantDocument>) {
      return await model.populate([{ path: 'user', select: 'email phoneNumber role' }]);
   }

   async createMerchant<T>(data: T) {
      const merchant = await this._MerchantModel.create(data);

      return merchant;
   }

   async findOrCreateMerchant<T>(filter: FilterQuery<MerchantDocument>, data: T) {
      let merchant: MerchantDocument = await this.populate(this._MerchantModel.findOne(filter));

      if (!merchant) {
         merchant = await this._MerchantModel.create(data);
         await this.walletService.createWallet(merchant._id);
      }

      return merchant;
   }

   async getMerchant(filter: FilterQuery<MerchantDocument>) {
      const merchant = await this.populate(this._MerchantModel.findOne(filter));

      return merchant;
   }

   async getMerchants(filter: FilterQuery<MerchantDocument>, paginationQuery: PaginationQuery) {
      const count = await this._MerchantModel.find(filter).countDocuments();
      const { skip, page, totalPages, limit } = this.utilService.resolvePaginationQuery({
         ...paginationQuery,
         count,
      });

      const data = await this.populate(this._MerchantModel.find(filter).limit(limit).skip(skip));

      return {
         data,
         page,
         totalPages,
         count,
      };
   }

   async updateMerchant(
      filter: FilterQuery<MerchantDocument>,
      update: UpdateQuery<MerchantDocument>,
      options?: QueryOptions<MerchantDocument>,
   ) {
      const Merchant = await this.populate(
         this._MerchantModel.findOneAndUpdate(filter, update, {
            new: true,
            runValidators: true,
            ...options,
         }),
      );

      return Merchant;
   }

   async deleteMerchant(filter: FilterQuery<MerchantDocument>) {
      const Merchant = await this._MerchantModel.findOneAndDelete(filter);

      return Merchant;
   }

   async updateKyc(kycVerificationDto: KycDocsDto, MerchantId: string) {
      const kyc = await this._kycModel.findOneAndUpdate({ Merchant: MerchantId }, kycVerificationDto, {
         upsert: true,
         new: true,
         runValidators: true,
      });

      return kyc;
   }

   async getMerchantKyc(MerchantId: string) {
      const kyc = await this._kycModel.findOne({ Merchant: MerchantId });

      return kyc;
   }

   async getKycs(filter: FilterQuery<KycVerificationDocument>) {
      const kycs = await this._kycModel.find(filter).populate({
         path: 'merchant',
      });

      return kycs;
   }
}
