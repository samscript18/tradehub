import { AxiosErrorShape, errorHandler } from '../config/axios-error';
import { authApi, publicApi } from '../config/axios-instance';
import { ApiResponse } from '../types';
import { LoginType, ResetPassword, SignUp, User } from '../types/auth';

export const loginUser = async (data: LoginType) => {
  try {
    const response = await publicApi.post<
      ApiResponse<{ access_token: string }>
    >('/auth/sign-in', data);

    return response.data.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};

export const requestForgotPasswordLink = async (credential: string) => {
  try {
    await publicApi.post('/auth/forgot-password', { credential });
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
  }
};

export const resetPassword = async (body: ResetPassword) => {
  try {
    await publicApi.post('/auth/reset-password', body);
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
  }
};

export const signUpUser = async (data: SignUp) => {
  try {
    await publicApi.post('/auth/sign-up', {
      ...data
    });
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
  }
};

export const getUser = async () => {
  try {
    const response = await authApi.get<ApiResponse<User>>('/user');

    console.log(response);

    return response?.data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
