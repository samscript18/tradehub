import { IsArray, IsObject, MinLength } from 'class-validator';
import { Gender, RoleNames } from 'src/api/user/enums';
import { IsDate, IsEmail, IsEnum, IsString } from 'src/shared/decorators';
import { Address } from '../interfaces';

export class RegisterDto {
   @IsEmail(false)
   email: string;

   @IsString(false)
   phoneNumber: string;

   @IsString(false)
   @MinLength(6)
   password: string;

   @IsEnum(RoleNames, false)
   role: RoleNames;
}

export class OnBoardCustomerDto extends RegisterDto {
   @IsString(false)
   firstName: string;

   @IsString(false)
   lastName: string;

   @IsEnum(Gender, true)
   gender: Gender;

   @IsDate(true)
   dateOfBirth: Date;

   @IsObject()
   defaultAddress?: Address;
}

export class OnBoardMerchantDto extends RegisterDto {
   @IsString(false)
   storeName: string;

   @IsObject()
   defaultAddress?: Address;

   @IsString(false)
   storeDescription: string;

   @IsArray()
   storeCategory?: string[];

   @IsString(true)
   website?: string;
}

export class OnBoardAdminDto extends RegisterDto {
   @IsString(false)
   firstName: string;

   @IsString(false)
   lastName: string;
}
