import { IsNumber, IsString } from 'src/shared/decorators';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BaseUpdateUserDto } from 'src/api/user/dto/update-user.dto';

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

export class UpdateDeveloperDto {
   @IsString(true)
   companyName?: string;

   @IsString(true)
   companyLogo?: string;

   @IsString(true)
   companyDescription?: string;

   @IsNumber(true)
   yearsOfExperience?: number;

   @IsString(true)
   website?: string;

   @IsString(true)
   portfolio?: string;

   @ApiProperty({ type: SocialLinks })
   @ValidateNested()
   @Type(() => SocialLinks)
   @IsOptional()
   socials?: SocialLinks;
}
