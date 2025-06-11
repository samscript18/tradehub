import { IsEnum, IsString } from "src/shared/decorators";
import { PaginationQuery } from "src/shared/interfaces/pagination.interface";
import { ProductStatus } from "../enums/product.enum";
import { IsNumber, IsOptional } from "class-validator";

export class GetProductsDto implements PaginationQuery {
  @IsNumber()
  page: number;

  @IsNumber()
  limit: number;

  @IsString(true)
  search: string;

  @IsString(true)
  category: string;

  @IsString(true)
  priceRange: string;

  @IsNumber()
  @IsOptional()
  rating?: number;

  @IsEnum(ProductStatus, true)
  status: string
}
