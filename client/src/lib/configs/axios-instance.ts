import axios from "axios";
import { API_URL } from "../utils/env";
import { getSession } from "next-auth/react";

export const publicApi = axios.create({
  withCredentials: false,
  baseURL: API_URL,
});

export const authApi = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

authApi.interceptors.request.use(async (config) => {
  const session = await getSession();
  const token = session?.accessToken || "";

  if (token) config.headers["Authorization"] = `Bearer ${token}`;

  return config;
});

authApi.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => Promise.reject(error)
);
