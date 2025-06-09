import { IsEmail, IsNumber, IsString } from "src/shared/decorators";

export class InitiatePaymentDto {
  @IsEmail(false)
  email: string;

  @IsNumber(false)
  amount: number;

  @IsString(false)
  customerId: string;

  @IsString(false)
  groupId: string;
}
