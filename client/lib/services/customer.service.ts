import { AxiosErrorShape, errorHandler } from "../config/axios-error";
import { authApi } from "../config/axios-instance";
import { ApiResponse } from "../types";
import { Customer } from "../types/types";

export const getCustomer = async () => {
  try {
    const response = await authApi.get<ApiResponse<Customer>>('/customer/user');

    return response?.data?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};

export const updateCustomer = async () => {
  try {
    const response = await authApi.put<ApiResponse<Customer>>('/customer');

    return response?.data?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};