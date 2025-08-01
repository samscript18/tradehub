import axios, { AxiosInstance } from 'axios';
import { API_URL, APP_URL } from '../constants/env';
import { AxiosErrorShape, errorHandler } from './axios-error';
import Cookies from 'js-cookie';

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

let logoutHandler: (() => void) | null = null;

export function setLogoutHandler(fn: () => void) {
  logoutHandler = fn;
}

authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if ([401, 403].includes(error.response?.status) && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get('refresh_token') || sessionStorage.getItem('refresh_token');

        if (refreshToken) {
          const response = await publicApi.post('/auth/session/refresh', { refreshToken });
          const newAccessToken = response.data?.data?.accessToken;

          if (newAccessToken) {
            const userStore = sessionStorage.getItem('user-store');
            if (userStore) {
              const parsed = JSON.parse(userStore);
              parsed.state.accessToken = newAccessToken;
              sessionStorage.setItem('user-store', JSON.stringify(parsed));
            }

            Cookies.set('access_token', newAccessToken);
            authApi.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return authApi(originalRequest);
          }
        }

        throw new Error("Refresh token failed or missing");
      } catch (err) {
        if (logoutHandler) logoutHandler();
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        delete authApi.defaults.headers.common['Authorization'];
        errorHandler(err as AxiosErrorShape | string);
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

