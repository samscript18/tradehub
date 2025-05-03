import { Gender } from 'src/api/user/enums';
import { IsString, IsEnum } from 'src/shared/decorators';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, ValidateNested } from 'class-validator';

export class Address {
   @IsString(false)
   state: string;

   @IsString(false)
   city: string;

   @IsString(false)
   country: string;
}

export class BaseUpdateUserDto {
   @IsString(true)
   firstName?: string;

   @IsString(true)
   lastName?: string;

   @IsString(true)
   country?: string;

   @ApiProperty({ type: Address })
   @IsOptional()
   @ValidateNested()
   address: Address;
}
