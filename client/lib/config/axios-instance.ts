import axios, { AxiosInstance } from 'axios';
import { API_URL, APP_URL } from '../constants/env';
import { AxiosErrorShape, errorHandler } from './axios-error';

export const appApi: AxiosInstance = axios.create({
  baseURL: APP_URL,
});

export const publicApi: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: false
});

export const authApi: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

authApi.interceptors.request.use(
  (req) => {
    const accessToken = sessionStorage.getItem('user-store')
      ? JSON.parse(sessionStorage.getItem('user-store')!)?.state?.accessToken
      : undefined;

    console.log(accessToken)

    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const refreshToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('refresh_token='))
          ?.split('=')[1];

        if (refreshToken) {
          await publicApi.post('/auth/session/refresh', { refreshToken });
          // Retry the original request
          return authApi(error.config);
        }
      } catch (error) {
        errorHandler(error as AxiosErrorShape | string)
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);
