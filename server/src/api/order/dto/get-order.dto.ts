import { IsEnum, IsNumber, IsString } from "src/shared/decorators";
import { PaginationQuery } from "src/shared/interfaces/pagination.interface";
import { OrderStatus } from "../enums/order.enum";

export class GetOrdersDto implements PaginationQuery {
  @IsNumber(true)
  page: number;

  @IsNumber(true)
  limit: number;

  @IsString(true)
  search: string;

  @IsEnum(OrderStatus, true)
  status: string
}
