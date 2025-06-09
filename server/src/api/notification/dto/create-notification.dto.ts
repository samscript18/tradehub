import { IsString } from "src/shared/decorators";
import { NotificationType } from "../types/notification.type";
import { IsIn } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateNotificationDto {
  @IsString(false)
  message: string;

  @ApiProperty()
  @IsIn([
    'order_placed',
    'order_updated',
    'order_cancelled',
    'order_delivered',
    'order_shipped',
    'payment_successful',
    'payment_failed',
    'account_created',
    'password_changed',
    'profile_updated',
    'new_review',
    'review_response'
  ])
  type: NotificationType;
}


