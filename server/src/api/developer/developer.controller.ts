import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth, IsPublic, Roles } from 'src/shared/decorators/auth.decorators';
import { MongoIdPipe } from 'src/core/pipes';
import { KycIdType } from './enums';
import { KycDocsDto } from './dto/kyc-verification.dto';
import { RoleNames } from '../user/enums';
import { GetKycDto } from './dto/get-kyc.dto';
import { GetDeveloperDto } from './dto/get-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { DeveloperProvider } from './developer.provider';

@Controller('developer')
@ApiTags('Developer')
@ApiBearerAuth()
export class DeveloperController {
   constructor(private readonly developerProvider: DeveloperProvider) { }

   // @Get('/user')
   // @Roles([RoleNames.DEVELOPER])
   // async getUserDeveloper(@Auth('_id') userId: string) {
   //    const data = await this.developerProvider.getUserDeveloper(userId);

   //    return data;
   // }

   // @Put('/kyc/update')
   // @Roles([RoleNames.DEVELOPER])
   // async updateKycInfo(@Auth('_id') userId: string, @Body() updateKycDto: KycDocsDto) {
   //    const data = await this.developerProvider.updateKycDocuments(updateKycDto, userId);

   //    return data;
   // }

   // @Get('/:developerId/kyc')
   // @Roles([RoleNames.DEVELOPER, RoleNames.ADMIN])
   // async getDeveloperKyc(@Param('developerId', MongoIdPipe) developerId: string) {
   //    const data = await this.developerProvider.getDeveloperKyc(developerId);

   //    return data;
   // }

   // @Get('/kyc/id-types')
   // @IsPublic()
   // async getKycIdTypes() {
   //    return {
   //       sucess: true,
   //       message: 'id types fetched',
   //       data: Object.values(KycIdType),
   //    };
   // }

   // @Post('/:developerId/kyc/verify')
   // @Roles([RoleNames.ADMIN])
   // async verifyDeveloperKyc(@Param('developerId') developerId: string) {
   //    const data = await this.developerProvider.verifyDeveloperKyc(developerId);

   //    return data;
   // }

   // @Post('/:developerId/kyc/reject')
   // @Roles([RoleNames.ADMIN])
   // async rejectDeveloperKyc(@Param('developerId') developerId: string) {
   //    const data = await this.developerProvider.rejectDeveloperKyc(developerId);

   //    return data;
   // }

   // @Get('/kyc')
   // @Roles([RoleNames.ADMIN])
   // @IsPublic()
   // async getKycs(@Query() query: GetKycDto) {
   //    const data = await this.developerProvider.getKycs(query);

   //    return data;
   // }

   @Get('/:developerId')
   @ApiOperation({ summary: 'Get developer by id' })
   async getDeveloper(@Param('developerId', MongoIdPipe) developerId: string) {
      const data = await this.developerProvider.getDeveloper(developerId);

      return data;
   }

   @Get()
   @ApiOperation({ summary: 'Get developers' })
   async getDevelopers(@Query() query: GetDeveloperDto) {
      const data = await this.developerProvider.getDevelopers(query);

      return data;
   }

   @Put()
   @Roles([RoleNames.DEVELOPER])
   @ApiOperation({ summary: 'Update developer' })
   async updateDeveloper(@Auth('_id') userId: string, @Body() updateDeveloperDto: UpdateDeveloperDto) {
      const data = await this.developerProvider.updateDeveloper(userId, updateDeveloperDto);

      return data;
   }
}
