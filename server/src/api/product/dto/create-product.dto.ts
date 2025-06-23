import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested, ArrayMinSize } from "class-validator";
import { IsBase64MediaArray } from "src/shared/decorators";

export class VariantDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "M", description: "Size of the product variant" })
  size: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "Blue", description: "Color of the product variant" })
  color?: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @ApiProperty({ example: 1999, description: "Price in cents" })
  price: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @ApiProperty({ example: 100, description: "Available stock quantity" })
  stock: number;
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "Classic T-Shirt" })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "Premium cotton t-shirt" })
  description: string;

  @IsArray()
  @ArrayMinSize(5)
  @IsBase64MediaArray({
    messages: {
      default: 'Each image must be valid base64-encoded image'
    }
  })
  @ApiProperty({
    type: [String],
    description: "Array of base64 encoded images"
  })
  images: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "Clothing" })
  category: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => VariantDto)
  @ApiProperty({
    type: [VariantDto],
    description: "Array of product variants"
  })
  variants: VariantDto[];
}