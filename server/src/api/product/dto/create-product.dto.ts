import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, ValidateNested } from "class-validator";
import { IsBase64MediaArray, IsNumber, IsString } from "src/shared/decorators";

export class CreateProductDto {
  @IsString(false)
  name: string

  @IsString(false)
  description: string

  @ApiProperty()
  @IsArray()
  @IsBase64MediaArray({ messages: { default: 'Each image must be valid base64-encoded image' } })
  images: string[]

  @IsNumber(false)
  price: number

  @IsNumber(false)
  stock_quantity: number

  @IsString(false)
  category: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariantDto)
  @ApiProperty()
  variants: VariantDto[];
}

class VariantDto {
  @IsString(false)
  size: string;

  @IsString(true)
  color?: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  stock: number;
}