import axios, { AxiosInstance } from 'axios';
import { API_URL, APP_URL } from '../constants/env';
import { AxiosErrorShape, errorHandler } from './axios-error';
import Cookies from 'js-cookie';
import { useAuth } from '../store/auth.store';

export const appApi: AxiosInstance = axios.create({
  baseURL: APP_URL,
});

export const publicApi: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: false
});

export const authApi: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

authApi.interceptors.request.use(
  (req) => {
    const accessToken = sessionStorage.getItem('user-store')
      ? JSON.parse(sessionStorage.getItem('user-store')!)?.state?.accessToken
      : undefined;

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
    const { resetUser } = useAuth()
    if (error.response?.status === 401) {
      try {
        const refreshToken = Cookies.get('refresh_token') || sessionStorage.getItem('refresh_token');

        if (refreshToken) {
          const response = await publicApi.post('/auth/session/refresh', { refreshToken });

          if (response.data?.data?.accessToken) {
            Cookies.set('access_token', response.data.accessToken);
            sessionStorage.setItem('access_token', response.data.accessToken);
          }
          return authApi(error.config);
        }
      } catch (error) {
        resetUser()
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        errorHandler(error as AxiosErrorShape | string)
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);
