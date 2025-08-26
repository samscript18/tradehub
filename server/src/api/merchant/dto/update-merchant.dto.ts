import { IsNumber, IsString } from 'src/shared/decorators';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OnBoardMerchantDto } from 'src/api/auth/dto/register.dto';
import { Address } from 'src/api/auth/interfaces';

export class SocialLinks {
   @IsString(true)
   facebook?: string;

   @IsString(true)
   whatsapp?: string;

   @IsString(true)
   twitter?: string;

   @IsString(true)
   linkedin?: string;
}

export class UpdateMerchantDto extends PartialType(OnBoardMerchantDto) {
   @IsArray()
   addresses: Address[];
}
