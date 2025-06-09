import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserDocument } from 'src/api/user/schema/user.schema';
import { schemaOptions } from 'src/shared/constants/db.const';
import { NotificationType } from '../types/notification.type';
import { OrderDocument } from 'src/api/order/schema/order.schema';

@Schema(schemaOptions)
export class Notification {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: UserDocument;

  @Prop({
    type: String, enum: Object.values([
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
    ]), required: true
  })
  type: NotificationType;

  @Prop({ required: true })
  message: string;

  @Prop({ default: false })
  isRead: boolean;

  @Prop({
    type: Types.ObjectId,
    ref: 'Order',
    required: false
  })
  relatedOrderId?: OrderDocument;
}

export type NotificationDocument = HydratedDocument<Notification>
export const NotificationSchema = SchemaFactory.createForClass(Notification);
