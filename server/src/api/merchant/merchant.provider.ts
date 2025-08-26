import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterQuery, Types } from 'mongoose';
import { UserService } from '../user/user.service';
import { KycDocsDto } from './dto/kyc-verification.dto';
import { FileService } from 'src/shared/file/file.service';
import { KycStatus } from './enums';
import { MailService } from 'src/shared/mail/mail.service';
import { GetKycDto } from './dto/get-kyc.dto';
import { KycVerificationDocument } from './schema/kyc-verification.schema';
import { MerchantService } from './merchant.service';
import { GetMerchantDto } from './dto/get-merchant.dto';
import { MerchantDocument } from './schema/merchant.schema';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { PaginationQuery } from 'src/shared/interfaces/pagination.interface';

@Injectable()
export class MerchantProvider {
   constructor(
      private readonly MerchantService: MerchantService,
      private readonly userService: UserService,
      private readonly fileService: FileService,
      private readonly mailService: MailService,
   ) { }

   async getUserMerchant(userId: string) {
      const data = await this.MerchantService.getMerchant({
         user: new Types.ObjectId(userId),
      });

      if (!data) {
         throw new NotFoundException('Merchant profile not found');
      }

      return {
         success: true,
         message: 'Merchant profile fetched',
         data,
      };
   }

   async getMerchant(MerchantId: string) {
      const data = await this.MerchantService.getMerchant({ _id: MerchantId });

      if (!data) throw new NotFoundException('Merchant not found');

      return {
         success: true,
         message: 'Merchant profile fetched',
         data,
      };
   }

   async updateMerchant(userId: string, updateMerchantDto: UpdateMerchantDto) {
      const data = await this.MerchantService.updateMerchant(
         { user: new Types.ObjectId(userId) },
         { ...updateMerchantDto, addresses: [...(updateMerchantDto.addresses || []), updateMerchantDto.defaultAddress] },
      );

      if (!data) throw new NotFoundException('Merchant not found');
      await this.userService.updateUser({ _id: userId }, updateMerchantDto);

      return {
         success: true,
         message: 'Merchant Profile Updated',
         data,
      };
   }

   async updateKycDocuments(updateKycDto: KycDocsDto, userId: string) {
      const Merchant = await this.MerchantService.getMerchant({
         user: new Types.ObjectId(userId),
      });
      if (!Merchant) throw new NotFoundException('Merchant profile not found');
      if (Merchant.kycVerified) throw new NotFoundException('Your Kyc info has been verified');

      const { url: idDoc, public_id: idDocPublicId } = await this.fileService.uploadResource(
         updateKycDto.idDoc,
      );

      const { url: professionalCert, public_id: professionalCertPublicId } =
         await this.fileService.uploadResource(updateKycDto.professionalCert);

      const kyc = await this.MerchantService.getMerchantKyc(Merchant._id);

      await this.MerchantService.updateKyc(
         {
            idDoc,
            idDocPublicId,
            professionalCert,
            professionalCertPublicId,
            idType: updateKycDto.idType,
            status: KycStatus.PENDING,
         },
         Merchant._id,
      );

      if (kyc.idDocPublicId) {
         await this.fileService.deleteResource(kyc.idDocPublicId);
      }
      if (kyc.professionalCertPublicId) {
         await this.fileService.deleteResource(kyc.professionalCertPublicId);
      }

      // send admin notification
      return {
         success: true,
         message: 'Kyc Docs uploaded successfully',
      };
   }

   async getMerchantKyc(MerchantId: string) {
      const data = await this.MerchantService.getMerchantKyc(MerchantId);

      return {
         success: true,
         message: 'kyc info fetched',
         data,
      };
   }

   async verifyMerchantKyc(MerchantId: string) {
      const data = await this.MerchantService.updateMerchant({ _id: MerchantId }, { kycVerified: true });

      await this.MerchantService.updateKyc({ status: KycStatus.SUCCESSFUL }, MerchantId);

      await this.mailService.sendMail({
         to: data.user.email,
         subject: 'TradeHub: KYC Verification Successful',
         template: 'kyc-verification-successful',
         context: {
            firstName: data.user?.firstName,
         },
      });

      return {
         success: true,
         message: 'Kyc Verified',
      };
   }

   async rejectMerchantKyc(MerchantId: string) {
      const data = await this.MerchantService.updateMerchant({ _id: MerchantId }, { kycVerified: false });
      await this.MerchantService.updateKyc({ status: KycStatus.FAILED }, MerchantId);

      await this.mailService.sendMail({
         to: data.user.email,
         subject: 'TradeHub: KYC Verification Failed',
         template: 'kyc-verification-failed',
         context: {
            firstName: data.user?.firstName,
         },
      });

      return {
         success: true,
         message: 'Kyc Rejected',
      };
   }

   async getKycs(query: GetKycDto) {
      const _query: FilterQuery<KycVerificationDocument> = {};

      if (query.status) {
         _query.status = query.status;
         delete query.status;
      }

      const data = await this.MerchantService.getKycs(_query);

      return {
         success: true,
         message: 'Kycs fetched',
         data,
      };
   }

   async getMerchants(query: GetMerchantDto) {
      const _query: FilterQuery<MerchantDocument> = {};
      const paginationQuery: Partial<PaginationQuery> = {};

      if (query.kycVerified) {
         if (query.kycVerified === 'true') {
            _query.isVerified = true;
         } else if (query.kycVerified === 'false') {
            _query.isVerified = false;
         }
      }

      if (query.search) {
         _query.$or = [
            { businessName: { $regex: query.search, $options: 'i' } },
            { businessDescription: { $regex: query.search, $options: 'i' } },
            { website: { $regex: query.search, $options: 'i' } },
         ];
         if (!isNaN(Number(query.search))) {
            _query.$or.push({ yearsOfExperience: Number(query.search) });
         }
         delete query.search;
      }

      if (query.limit) {
         paginationQuery.limit = query.limit;
         delete query.limit;
      }

      if (query.page) {
         paginationQuery.page = query.page;
         delete query.page;
      }

      const { data, page, count, totalPages } = await this.MerchantService.getMerchants(_query, paginationQuery as PaginationQuery);

      return {
         success: true,
         message: 'Merchants fetched successfully',
         data,
         meta: {
            page,
            count,
            totalPages,
         },
      };
   }
}
