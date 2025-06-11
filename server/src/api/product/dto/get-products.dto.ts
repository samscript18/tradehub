import { IsEnum, IsNumber, IsString } from "src/shared/decorators";
import { PaginationQuery } from "src/shared/interfaces/pagination.interface";
import { ProductStatus } from "../enums/product.enum";

export class GetProductsDto implements PaginationQuery {
  @IsNumber(false)
  page: number;

  @IsNumber(false)
  limit: number;

  @IsString(true)
  search: string;

  @IsString(true)
  category: string;

  @IsString(true)
  priceRange: string;

  @IsNumber(true)
  rating?: number;

  @IsEnum(ProductStatus, true)
  status: string
}
