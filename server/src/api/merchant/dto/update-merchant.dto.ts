import { IsNumber, IsString } from 'src/shared/decorators';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

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

export class UpdateMerchantDto {
   @IsString(true)
   businessName?: string;

   @IsString(true)
   businessLogo?: string;

   @IsString(true)
   businessDescription?: string;

   @IsNumber(true)
   yearsOfExperience?: number;

   @IsString(true)
   website?: string;

   @ApiProperty({ type: SocialLinks })
   @ValidateNested()
   @Type(() => SocialLinks)
   @IsOptional()
   socials?: SocialLinks;
}
