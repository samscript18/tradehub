import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleNames } from '../user/enums';
import { Auth, Roles } from 'src/shared/decorators/auth.decorators';
import { NotificationProvider } from './notification.provider';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notification')
@ApiTags('Notification')
export class NotificationController {
  constructor(private readonly notificationProvider: NotificationProvider) { }

  @Post()
  @Roles([RoleNames.CUSTOMER, RoleNames.MERCHANT])
  @ApiOperation({ summary: 'Create notification' })
  @ApiBearerAuth()
  createNotification(@Auth('_id') userId: string, @Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationProvider.createNotification(createNotificationDto, userId);
  }

  @Get()
  @Roles([RoleNames.CUSTOMER, RoleNames.MERCHANT])
  @ApiOperation({ summary: 'Get notifications' })
  @ApiBearerAuth()
  getNotifications(@Auth('_id') userId: string) {
    return this.notificationProvider.getNotifications(userId);
  }

  @Patch(':notificationId/read')
  @Roles([RoleNames.CUSTOMER, RoleNames.MERCHANT])
  @ApiOperation({ summary: 'Mark notification as read' })
  @ApiBearerAuth()
  markAsRead(@Param('notificationId') notificationId: string) {
    return this.notificationProvider.markNotificationAsRead(notificationId);
  }

  @Patch(':userId/read-all')
  @Roles([RoleNames.CUSTOMER, RoleNames.MERCHANT])
  @ApiOperation({ summary: 'Mark all notifications as read' })
  @ApiBearerAuth()
  markAllAsRead(@Param('userId') userId: string) {
    return this.notificationProvider.markAllNotificationsAsRead(userId);
  }

  @Delete(':notificationId')
  @Roles([RoleNames.CUSTOMER, RoleNames.MERCHANT])
  @ApiOperation({ summary: 'Delete notification' })
  @ApiBearerAuth()
  deleteOrder(@Param('notificationId') notificationId: string) {
    return this.notificationProvider.deleteNotification(notificationId);
  }
}
