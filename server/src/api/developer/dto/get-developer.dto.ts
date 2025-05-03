import { IsNumber, IsString } from 'src/shared/decorators';
import { IsBooleanString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetDeveloperDto {
   @IsString(true)
   search?: string;

   @IsNumber(true)
   page: number;

   @IsNumber(true)
   limit: number;

   @IsBooleanString()
   @ApiPropertyOptional()
   @IsOptional()
   kycVerified?: string;
}
