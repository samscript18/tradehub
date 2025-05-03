import { IsArray, IsOptional } from "class-validator";
import { IsEnum, IsNumber, IsString } from "src/shared/decorators";
import { PropertyListingStatus } from "../enums/listing.enums";

export class CreatePropertyListingDto {
  @IsString(false)
  name: string;

  @IsString(false)
  description: string; 

  @IsNumber(false)
  bedrooms: number;

  @IsArray({ each: true })
  @IsOptional()
  images: string[];

  @IsArray({ each: true })
  @IsOptional()
  videos: string[];

  @IsString(false)
  location: string;

  @IsNumber(false)
  price: number;

  @IsString(false)
  propertyType: string;

  @IsNumber(true)
  minDownPaymentPercent?: number;

  @IsNumber(true)
  minMonthlyPayment?: number;

  @IsEnum(PropertyListingStatus, true)
  status?: string;
}
