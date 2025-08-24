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


export class ResolveAccountDTO {
  @IsString(false)
  bank_code: string;

  @IsString(false)
  account_number: string;
}


export class InitiateTransferDTO {
  amount: number;
  reference: string;
  recipient: string;
}

export interface ResolveAccountResponse {
  account_number: string;
  account_name: string;
}

export interface Bank {
  name: string;
  slug: string;
  country: string;
  code: string;
  type: "nuban";
}
