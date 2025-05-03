import { BaseUpdateUserDto } from 'src/api/user/dto/update-user.dto';
import { Gender } from 'src/api/user/enums';
import { IsDate, IsEnum, IsNumber, IsString } from 'src/shared/decorators';

export class UpdateApplicantDto extends BaseUpdateUserDto {
   @IsDate(true)
   dateOfBirth?: Date;

   @IsEnum(Gender, true)
   gender?: Gender;

   @IsNumber(true)
   annualIncome?: number;

   @IsString(true)
   employmentStatus?: string;

   @IsString(true)
   location?: string;
}
