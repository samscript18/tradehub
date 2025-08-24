import { Types } from "mongoose";
import { IsNumber, IsString } from "src/shared/decorators";

export class ProcessWithdrawDTO {
  @IsNumber(false)
  amount: number;

  @IsString(false)
  account_number: string;

  @IsString(false)
  account_name: string;

  @IsString(false)
  bank_code: string;


  merchantId: Types.ObjectId;
}

export class WithdrawDTO {
  @IsNumber(false)
  amount: number;

  @IsString(false)
  account_number: string;

  @IsString(false)
  account_name: string;

  @IsString(false)
  bank_code: string;
}
