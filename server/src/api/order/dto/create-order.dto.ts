import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, ValidateNested } from "class-validator";
import { Address } from "src/api/customer/schema/address.schema";
import { IsNumber, IsString } from "src/shared/decorators";

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  @ApiProperty()
  products: ProductDto[];

  @IsNumber(false)
  price: number;

  @ValidateNested()
  @Type(() => AddressDto)
  @ApiProperty()
  address: Address;
}

class ProductDto {
  @IsString(false)
  productId: string;

  @IsNumber(false)
  quantity: number;

  @IsNumber(false)
  price: number;

  @IsNotEmpty()
  @ApiProperty()
  variant: {
    size?: string;
    color?: string;
  };
}

export class AddressDto {
  @IsString(false)
  street: string;

  @IsString(false)
  city: string;

  @IsString(false)
  state: string;

  @IsString(false)
  country: string;

  @IsString(false)
  zipcode: string;
}