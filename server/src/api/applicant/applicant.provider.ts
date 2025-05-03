import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Types } from 'mongoose';
import { ApplicantService } from './applicant.service';
import { UpdateApplicantDto } from './dto/update-applicant.dto';

@Injectable()
export class ApplicantProvider {
   constructor(
      private readonly applicantService: ApplicantService,
      private readonly userService: UserService,
   ) { }

   async getApplicants() {
      const data = await this.applicantService.getApplicants({});

      if (!data) {
         throw new NotFoundException('Applicants not found');
      }

      return {
         success: true,
         message: 'Applicants profile fetched',
         data,
      };
   }

   async getApplicant(applicantId: string) {
      const data = await this.applicantService.getApplicant({ _id: applicantId });

      if (!data) {
         throw new NotFoundException('Applicant not found');
      }

      return {
         success: true,
         message: 'Applicant profile fetched',
         data,
      };
   }

   async updateApplicant(updateApplicantDto: UpdateApplicantDto, userId: string) {
      const data = await this.applicantService.updateApplicant(
         { user: new Types.ObjectId(userId) },
         updateApplicantDto,
      );

      await this.userService.updateUser({ _id: userId }, updateApplicantDto);

      if (!data) {
         throw new NotFoundException('Applicant not found');
      }

      return {
         success: true,
         message: 'Applicant profile updated',
         data,
      };
   }
}
