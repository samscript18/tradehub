import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UserService } from '../user/user.service';
import { Types } from 'mongoose';

@Injectable()
export class NotificationProvider {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly userService: UserService
  ) { }

  async createNotification(createNotificationDto: CreateNotificationDto, userId: string) {
    const user = await this.userService.getUser({ _id: userId });
    if (!user) {
      throw new BadRequestException('User not found')
    }

    const notification = await this.notificationService.createNotification({ ...createNotificationDto, user: user._id });

    return {
      success: true,
      message: 'Notification created successfully',
      data: notification,
    };
  }

  async getNotifications(userId: string) {
    const notifications = await this.notificationService.getNotifications({ user: new Types.ObjectId(userId) }
    );
    return {
      success: true,
      message: 'Notifications fetched successfully',
      data: notifications
    };
  }

  async markNotificationAsRead(notificationId: string) {
    const data = await this.notificationService.updateNotification(
      { _id: notificationId },
      { isRead: true },
    );

    if (!data) {
      throw new NotFoundException('Notification not found');
    }

    return {
      success: true,
      message: 'Notification updated successfully',
      data,
    };
  }

  async markAllNotificationsAsRead(userId: string) {
    const data = await this.notificationService.updateNotifications(
      { user: new Types.ObjectId(userId) },
      { isRead: true },
    );

    if (!data) {
      throw new NotFoundException('Notifications not found');
    }

    return {
      success: true,
      message: 'Notifications updated successfully',
      data,
    };
  }

  async deleteNotification(notificationId: string) {
    const data = await this.notificationService.deleteNotification({ _id: notificationId });

    if (!data) {
      throw new NotFoundException('Notification not found');
    }

    return {
      success: true,
      message: 'Notification deleted',
    }
  }
}
