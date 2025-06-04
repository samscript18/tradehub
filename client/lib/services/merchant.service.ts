import { AxiosErrorShape, errorHandler } from "../config/axios-error";
import { authApi } from "../config/axios-instance";
import { ApiResponse } from "../types";
import { Merchant } from "../types/types";

export const getMerchant = async () => {
  try {
    const response = await authApi.get<ApiResponse<Merchant>>('/merchant/user');

    return response?.data?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};

export const updateMerchant = async () => {
  try {
    const response = await authApi.put<ApiResponse<Merchant>>('/merchant');

    return response?.data?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};