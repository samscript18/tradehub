import { AxiosErrorShape, errorHandler } from "../config/axios-error";
import { authApi } from "../config/axios-instance";
import { CheckoutDto, GetProductsQueryDto } from "../dtos";
import { ApiResponse } from "../types";
import { Customer, Order, Product } from "../types/types";

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

export const getProducts = async (query?: GetProductsQueryDto) => {
  try {
    const response = await authApi.get<ApiResponse<Product[]>>('/product', {
      params: query
    });

    return response?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};

export const getProduct = async (productId: string) => {
  try {
    const response = await authApi.get<ApiResponse<Product>>(`/product/${productId}`);

    return response?.data?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};

export const initiateCheckout = async (data: CheckoutDto) => {
  try {
    const response = await authApi.post<ApiResponse<{ paymentUrl: string, reference: string }>>('/order/checkout', {
      ...data
    });
    return response?.data?.data
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};

export const getCustomerOrders = async () => {
  try {
    const response = await authApi.get<ApiResponse<Order[]>>('/order/customer');

    return response?.data?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};

export const getCustomerOrder = async (orderId: string) => {
  try {
    const response = await authApi.get<ApiResponse<Order>>(`/order/${orderId}/customer`);

    return response?.data?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};

export const deleteOrder = async (orderId: string) => {
  try {
    const response = await authApi.delete(`/order/${orderId}`);

    return response?.data?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};

export const verifyTransaction = async (reference: string) => {
  try {
    const response = await authApi.get(`/payment/confirm/${reference}`);

    return response?.data?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};