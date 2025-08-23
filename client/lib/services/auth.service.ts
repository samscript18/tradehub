import { AxiosErrorShape, errorHandler } from '../config/axios-error';
import { appApi, authApi, publicApi } from '../config/axios-instance';
import { API_URL } from '../constants/env';
import { ApiResponse, User } from '../types';
import { ContactUs, LoginType, ResetPassword, SignUp } from '../types/auth';

export const loginUser = async (data: LoginType) => {
  try {
    const response = await publicApi.post<ApiResponse<{ user: User, meta: { accessToken: string, refreshToken: string, lifeSpan: number } }>>('/auth/sign-in', data);

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
    throw error;
  }
};

export const resetPassword = async (body: ResetPassword) => {
  try {
    await publicApi.post('/auth/reset-password', body);
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};

export const signUpCustomer = async (data: SignUp) => {
  try {
    await publicApi.post('/auth/sign-up/customer', {
      ...data
    });
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};

export const signUpMerchant = async (data: SignUp) => {
  try {
    await publicApi.post('/auth/sign-up/merchant', {
      ...data
    });
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};

export const getUser = async () => {
  try {
    const response = await authApi.get<ApiResponse<User>>('/user');

    return response?.data?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};

export const signOut = async () => {

  // try {
  //   await authApi.get('/auth/sign-out');
  // } catch (error) {
  //   errorHandler(error as AxiosErrorShape | string);
  //   throw error;
  // }
};

export const contactUs = async (data: ContactUs) => {
  try {
    await appApi.post('/contact', {
      ...data
    });
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};

export const googleSignIn = async (role?: 'customer' | 'merchant') => {
  window.location.href = `${API_URL}${role ? `/auth/init-google?role=${role}` : '/auth/init-google'}`;
};

export const signInWithAccessToken = async (data: { token: string, email: string }) => {
  const response = await publicApi.post<ApiResponse<{ user: User, meta: { accessToken: string, refreshToken: string, lifeSpan: number } }>>('/auth/token-sign-in', data);
  // if (response?.data.data.meta.refreshToken) {
  //   localStorage.setItem("refreshToken", response.data.data.meta.refreshToken);
  // }

  return response.data;
}