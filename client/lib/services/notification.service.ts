import { AxiosErrorShape, errorHandler } from "../config/axios-error";
import { authApi } from "../config/axios-instance";
import { GetNotificationsQueryDto } from "../dtos";
import { ApiResponse } from "../types";
import { Notification } from "../types/types";

export const getNotifications = async (query?: GetNotificationsQueryDto) => {
  try {
    const response = await authApi.get<ApiResponse<Notification[]>>('/notification', {
      params: query
    });

    return response?.data?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};

export const getUnreadNotificationsCount = async () => {
  try {
    const response = await authApi.get<ApiResponse<number>>('/notification/unread');

    return response?.data?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};

export const markAsRead = async (notificationId: string) => {
  try {
    const response = await authApi.patch(`/notification/${notificationId}/read`);

    return response?.data?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};

export const markAllAsRead = async (userId: string) => {
  try {
    const response = await authApi.patch(`/notification/${userId}/read-all`);

    return response?.data?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};

export const deleteNotification = async (notificationId: string) => {
  try {
    const response = await authApi.delete(`/notification/${notificationId}`);

    return response?.data?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};