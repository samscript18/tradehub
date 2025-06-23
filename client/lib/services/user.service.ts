import { AxiosErrorShape, errorHandler } from "../config/axios-error";
import { authApi } from "../config/axios-instance";
import { ApiResponse, User } from "../types";

export const getUser = async () => {
  try {
    const response = await authApi.get<ApiResponse<User>>('/user');

    return response?.data?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};

export const changeProfilePicture = async (picture: string) => {
  try {
    const response = await authApi.put<ApiResponse<{
      success: boolean,
      message: string,
    }>>('/user/profile-picture', { picture });

    return response?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};

export const changeNotificationStatus = async () => {
  try {
    const response = await authApi.put<ApiResponse<{
      success: boolean,
      message: string,
    }>>('/user/notification');

    return response?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};

export const changePassword = async (data: { oldPassword: string, newPassword: string }) => {
  try {
    const response = await authApi.put<ApiResponse<{
      success: boolean,
      message: string,
    }>>('/user/change-password', data);

    return response?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};