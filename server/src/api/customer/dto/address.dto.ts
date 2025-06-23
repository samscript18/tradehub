import { IsString } from "src/shared/decorators";

export class AddressDto {
  @IsString(true)
  street: string;

  @IsString(true)
  city: string;

  @IsString(true)
  state: string;

  @IsString(true)
  fullName: string;

  @IsString(true)
  phoneNumber: string;

  @IsString(true)
  postalcode: string;
}