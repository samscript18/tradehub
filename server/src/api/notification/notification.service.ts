import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, QueryOptions, UpdateQuery } from 'mongoose';
import { Notification, NotificationDocument } from './schema/notification.schema';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private readonly _notificationModel: Model<NotificationDocument>,
  ) { }

  async createNotification<T>(data: T) {
    const notification = await this._notificationModel.create(data);

    return notification;
  }

  async getNotification(filter: FilterQuery<NotificationDocument>) {
    const notification = await this._notificationModel.findOne(filter);

    return notification;
  }

  async getNotifications(filter: FilterQuery<NotificationDocument>) {
    const notification = await this._notificationModel.find(filter).sort({ createdAt: -1 });

    return notification;
  }

  async updateNotification(
    filter: FilterQuery<NotificationDocument>,
    update: UpdateQuery<NotificationDocument>,
    options?: QueryOptions<NotificationDocument>,
  ) {
    const notification = await
      this._notificationModel.findOneAndUpdate(filter, update, {
        new: true,
        runValidators: true,
        ...options,
      });

    return notification;
  }

  async updateNotifications(
    filter: FilterQuery<NotificationDocument>,
    update: UpdateQuery<NotificationDocument>,
  ) {
    const notification = await
      this._notificationModel.updateMany(filter, update);

    return notification;
  }

  async deleteNotification(filter: FilterQuery<NotificationDocument>) {
    const notification = await this._notificationModel.findOneAndDelete(filter);

    return notification;
  }
}