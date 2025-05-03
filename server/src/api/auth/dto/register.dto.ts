import { MinLength } from 'class-validator';
import { EmploymentStatus } from 'src/api/applicant/enums';
import { Gender, RoleNames } from 'src/api/user/enums';
import { IsDate, IsEmail, IsEnum, IsNumber, IsString } from 'src/shared/decorators';

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

export class OnBoardApplicantDto extends RegisterDto {
   @IsString(false)
   firstName: string;

   @IsString(false)
   lastName: string;

   @IsEnum(Gender, false)
   gender: Gender;

   @IsDate(false)
   dateOfBirth: Date;

   @IsNumber(false)
   annualIncome: number;

   @IsEnum(EmploymentStatus, false)
   employmentStatus: EmploymentStatus;

   @IsString(false)
   location: string;
}

export class OnBoardDeveloperDto extends RegisterDto {
   @IsString(false)
   companyName: string;

   @IsString(false)
   companyLogo: string;

   @IsString(false)
   companyDescription: string;

   @IsNumber(false)
   yearsOfExperience: number;

   @IsString(true)
   website?: string;

   @IsString(true)
   portfolio?: string;
}

export class OnBoardAdminDto extends RegisterDto {
   @IsString(false)
   firstName: string;

   @IsString(false)
   lastName: string;
}
