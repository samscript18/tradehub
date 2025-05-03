import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth, IsPublic, Roles } from 'src/shared/decorators/auth.decorators';
import { MongoIdPipe } from 'src/core/pipes';
import { KycIdType } from './enums';
import { KycDocsDto } from './dto/kyc-verification.dto';
import { RoleNames } from '../user/enums';
import { GetKycDto } from './dto/get-kyc.dto';
import { GetMerchantDto } from './dto/get-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { MerchantProvider } from './merchant.provider';

@Controller('merchant')
@ApiTags('Merchant')
@ApiBearerAuth()
export class MerchantController {
   constructor(private readonly MerchantProvider: MerchantProvider) { }

   // @Get('/user')
   // @Roles([RoleNames.MERCHANT])
   // async getUserMerchant(@Auth('_id') userId: string) {
   //    const data = await this.MerchantProvider.getUserMerchant(userId);

   //    return data;
   // }

   // @Put('/kyc/update')
   // @Roles([RoleNames.MERCHANT])
   // async updateKycInfo(@Auth('_id') userId: string, @Body() updateKycDto: KycDocsDto) {
   //    const data = await this.MerchantProvider.updateKycDocuments(updateKycDto, userId);

   //    return data;
   // }

   // @Get('/:merchantId/kyc')
   // @Roles([RoleNames.MERCHANT, RoleNames.ADMIN])
   // async getMerchantKyc(@Param('MerchantId', MongoIdPipe) MerchantId: string) {
   //    const data = await this.MerchantProvider.getMerchantKyc(MerchantId);

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

   // @Post('/:merchantId/kyc/verify')
   // @Roles([RoleNames.ADMIN])
   // async verifyMerchantKyc(@Param('MerchantId') MerchantId: string) {
   //    const data = await this.MerchantProvider.verifyMerchantKyc(MerchantId);

   //    return data;
   // }

   // @Post('/:merchantId/kyc/reject')
   // @Roles([RoleNames.ADMIN])
   // async rejectMerchantKyc(@Param('MerchantId') MerchantId: string) {
   //    const data = await this.MerchantProvider.rejectMerchantKyc(MerchantId);

   //    return data;
   // }

   // @Get('/kyc')
   // @Roles([RoleNames.ADMIN])
   // @IsPublic()
   // async getKycs(@Query() query: GetKycDto) {
   //    const data = await this.MerchantProvider.getKycs(query);

   //    return data;
   // }

   @Get('/:merchantId')
   @ApiOperation({ summary: 'Get Merchant by id' })
   async getMerchant(@Param('MerchantId', MongoIdPipe) MerchantId: string) {
      const data = await this.MerchantProvider.getMerchant(MerchantId);

      return data;
   }

   @Get()
   @ApiOperation({ summary: 'Get Merchants' })
   async getMerchants(@Query() query: GetMerchantDto) {
      const data = await this.MerchantProvider.getMerchants(query);

      return data;
   }

   @Put()
   @Roles([RoleNames.MERCHANT])
   @ApiOperation({ summary: 'Update Merchant' })
   async updateMerchant(@Auth('_id') userId: string, @Body() updateMerchantDto: UpdateMerchantDto) {
      const data = await this.MerchantProvider.updateMerchant(userId, updateMerchantDto);

      return data;
   }
}
