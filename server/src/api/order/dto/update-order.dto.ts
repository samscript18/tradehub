import { IsEnum } from "src/shared/decorators";
import { OrderStatus } from "../enums/order.enum";

export class UpdateOrderDto {
  @IsEnum(OrderStatus, false)
  status: string;
}
