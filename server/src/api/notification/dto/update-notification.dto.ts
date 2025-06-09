import { IsBoolean, IsString } from "src/shared/decorators";

export class UpdateNotificationDto {
  @IsBoolean(false)
  isRead: boolean;
}
