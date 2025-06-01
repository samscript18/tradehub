import { Transform } from 'class-transformer';
import { Matches } from 'class-validator';
import { IsBoolean, IsString } from 'src/shared/decorators';

export class SignInDto {
   @IsString(false)
   @Transform(({ value }) => value?.toLowerCase().trim())
   @Matches(
      /^(?:\d{11}|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})$/,
      {
         message: 'Credential must be a valid email or phone number',
      }
   )
   credential: string;

   credentialType?: 'email' | 'phone';

   @IsString(false)
   password: string;

   @IsBoolean(true)
   rememberMe?: boolean
}
