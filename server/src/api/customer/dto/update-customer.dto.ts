import { BaseUpdateUserDto } from 'src/api/user/dto/update-user.dto';
import { Gender } from 'src/api/user/enums';
import { IsDate, IsEnum } from 'src/shared/decorators';

export class UpdateCustomerDto extends BaseUpdateUserDto {
   @IsDate(true)
   dateOfBirth?: Date;

   @IsEnum(Gender, true)
   gender?: Gender;
}
