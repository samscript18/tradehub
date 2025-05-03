import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth, Roles } from 'src/shared/decorators/auth.decorators';
import { MongoIdPipe } from 'src/core/pipes';
import { RoleNames } from '../user/enums';
import { ApplicantProvider } from './applicant.provider';
import { UpdateApplicantDto } from './dto/update-applicant.dto';

@Controller('applicant')
@ApiTags('Applicant')
@ApiBearerAuth()
export class ApplicantController {
   constructor(private readonly applicantProvider: ApplicantProvider) { }

   @Get('')
   @ApiOperation({ summary: 'Get applicants' })
   @Roles([RoleNames.ADMIN])
   async getApplicants() {
      const data = await this.applicantProvider.getApplicants();

      return data;
   }

   @Get(':applicantId')
   @Roles([RoleNames.APPLICANT])
   @ApiOperation({ summary: 'Get applicant by id' })
   async getApplicant(@Param('applicantId', MongoIdPipe) applicantId: string) {
      const data = await this.applicantProvider.getApplicant(applicantId);

      return data;
   }

   @Put()
   @Roles([RoleNames.APPLICANT])
   @ApiOperation({ summary: 'Update applicant' })
   async updateApplicant(@Auth('_id') userId: string, @Body() updateApplicantDto: UpdateApplicantDto) {
      const data = await this.applicantProvider.updateApplicant(updateApplicantDto, userId);

      return data;
   }
}
