import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterQuery, Types } from 'mongoose';
import { UserService } from '../user/user.service';
import { KycDocsDto } from './dto/kyc-verification.dto';
import { FileService } from 'src/shared/file/file.service';
import { KycStatus } from './enums';
import { MailService } from 'src/shared/mail/mail.service';
import { GetKycDto } from './dto/get-kyc.dto';
import { KycVerificationDocument } from './schema/kyc-verification.schema';
import { DeveloperService } from './developer.service';
import { GetDeveloperDto } from './dto/get-developer.dto';
import { DeveloperDocument } from './schema/developer.schema';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { PaginationQuery } from 'src/shared/interfaces/pagination.interface';

@Injectable()
export class DeveloperProvider {
   constructor(
      private readonly developerService: DeveloperService,
      private readonly userService: UserService,
      private readonly fileService: FileService,
      private readonly mailService: MailService,
   ) { }

   async getUserDeveloper(userId: string) {
      const data = await this.developerService.getDeveloper({
         user: new Types.ObjectId(userId),
      });

      if (!data) {
         throw new NotFoundException('Developer profile not found');
      }

      return {
         success: true,
         message: 'Developer profile fetched',
         data,
      };
   }

   async getDeveloper(developerId: string) {
      const data = await this.developerService.getDeveloper({ _id: developerId });

      if (!data) throw new NotFoundException('Developer not found');

      return {
         success: true,
         message: 'Developer profile fetched',
         data,
      };
   }

   async updateDeveloper(userId: string, updateDeveloperDto: UpdateDeveloperDto) {
      const data = await this.developerService.updateDeveloper(
         { user: new Types.ObjectId(userId) },
         updateDeveloperDto,
      );

      if (!data) throw new NotFoundException('Developer not found');
      await this.userService.updateUser({ _id: userId }, updateDeveloperDto);

      return {
         success: true,
         message: 'Developer Profile Updated',
         data,
      };
   }

   async updateKycDocuments(updateKycDto: KycDocsDto, userId: string) {
      const developer = await this.developerService.getDeveloper({
         user: new Types.ObjectId(userId),
      });
      if (!developer) throw new NotFoundException('Developer profile not found');
      if (developer.kycVerified) throw new NotFoundException('Your Kyc info has been verified');

      const { url: idDoc, public_id: idDocPublicId } = await this.fileService.uploadResource(
         updateKycDto.idDoc,
      );

      const { url: professionalCert, public_id: professionalCertPublicId } =
         await this.fileService.uploadResource(updateKycDto.professionalCert);

      const kyc = await this.developerService.getDeveloperKyc(developer._id);

      await this.developerService.updateKyc(
         {
            idDoc,
            idDocPublicId,
            professionalCert,
            professionalCertPublicId,
            idType: updateKycDto.idType,
            status: KycStatus.PENDING,
         },
         developer._id,
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

   async getDeveloperKyc(developerId: string) {
      const data = await this.developerService.getDeveloperKyc(developerId);

      return {
         success: true,
         message: 'kyc info fetched',
         data,
      };
   }

   async verifyDeveloperKyc(developerId: string) {
      const data = await this.developerService.updateDeveloper({ _id: developerId }, { kycVerified: true });

      await this.developerService.updateKyc({ status: KycStatus.SUCCESSFUL }, developerId);

      await this.mailService.sendMail({
         to: data.user.email,
         subject: 'Her-Homes: KYC Verification Successful',
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

   async rejectDeveloperKyc(developerId: string) {
      const data = await this.developerService.updateDeveloper({ _id: developerId }, { kycVerified: false });
      await this.developerService.updateKyc({ status: KycStatus.FAILED }, developerId);

      await this.mailService.sendMail({
         to: data.user.email,
         subject: 'Her-Homes: KYC Verification Failed',
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

      const data = await this.developerService.getKycs(_query);

      return {
         success: true,
         message: 'Kycs fetched',
         data,
      };
   }

   async getDevelopers(query: GetDeveloperDto) {
      const _query: FilterQuery<DeveloperDocument> = {};
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
            { companyName: { $regex: query.search, $options: 'i' } },
            { companyDescription: { $regex: query.search, $options: 'i' } },
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

      const { data, page, count, totalPages } = await this.developerService.getDevelopers(_query, paginationQuery as PaginationQuery);

      return {
         success: true,
         message: 'developers fetched successfully',
         data,
         meta: {
            page,
            count,
            totalPages,
         },
      };
   }
}
