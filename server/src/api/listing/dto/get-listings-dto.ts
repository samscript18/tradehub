import { IsEnum, IsNumber, IsString } from "src/shared/decorators";
import { PaginationQuery } from "src/shared/interfaces/pagination.interface";
import { PropertyListingStatus } from "../enums/listing.enums";

export class GetPropertyListingsDto implements PaginationQuery {
  @IsNumber(true)
  page: number;

  @IsNumber(true)
  limit: number;

  @IsString(true)
  search: string;

  @IsString(true)
  propertyType: string;

  @IsString(true)
  priceRange: string;
  
  @IsString(true)
  bedrooms: string;

  @IsString(true)
  location: string;
}

export class PropertyListingsDto extends GetPropertyListingsDto {
  @IsEnum(PropertyListingStatus, true)
  status: string
}