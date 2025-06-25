import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { NotificationProvider } from './notification.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from './schema/notification.schema';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Notification.name,
        useFactory() {
          const schema = NotificationSchema;

          return schema;
        },
      },
    ]),
    UserModule
  ],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationProvider],
  exports: [NotificationService, NotificationProvider]
})
export class NotificationModule { }
