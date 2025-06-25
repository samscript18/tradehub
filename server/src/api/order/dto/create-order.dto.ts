import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

class ProductDto {
  @IsString()
  productId: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsNotEmpty()
  @ApiProperty()
  variant: {
    size?: string;
    color?: string;
    price?: number;
  };
}

export class AddressDto {
  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  country: string;

  @IsString()
  postalcode: string;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  @ApiProperty()
  products: ProductDto[];

  @IsNumber()
  price: number;

  @ValidateNested()
  @Type(() => AddressDto)
  @ApiProperty()
  address: AddressDto;
}
