import { AxiosErrorShape, errorHandler } from '../config/axios-error'
import { authApi } from '../config/axios-instance'
import { GetMerchantOrdersQueryDto, GetProductsQueryDto, UpdateOrderDto, UpdateProductDto } from '../dtos'
import { ApiResponse, MerchantOrder } from '../types'
import {
  Merchant,
  CreateProductDto,
  Product,
} from '../types/types'
import { toast } from 'sonner'

export const getMerchant = async () => {
  try {
    const response = await authApi.get<ApiResponse<Merchant>>('/merchant/user')

    return response?.data?.data
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string)
    throw error
  }
}

export const updateMerchant = async () => {
  try {
    const response = await authApi.put<ApiResponse<Merchant>>('/merchant')

    return response?.data?.data
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string)
    throw error
  }
}


export const createProduct = async (data: CreateProductDto) => {
  try {
    const response = await authApi.post<ApiResponse<Product>>('/product', data)
    toast.success('Product created successfully')
    return response.data.data
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string)
    throw error
  }
}

export const getProducts = async (query?: GetProductsQueryDto) => {
  try {
    const response = await authApi.get<ApiResponse<Product[]>>('/product/merchant', {
      params: {
        // ...query,
        category: query?.category,
        priceRangeMin: query?.priceRange?.min,

        priceRangeMax: query?.priceRange?.max !== null && query?.priceRange?.max,
        page: Number(query?.page),
        limit: Number(query?.limit)
      }
    });

    return response?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};

export const getProduct = async (productId: string) => {
  try {
    const response = await authApi.get<ApiResponse<Product>>(`/product/${productId}/merchant`);

    return response?.data?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};

export const updateProduct = async (productId: string, data: UpdateProductDto) => {
  try {
    const response = await authApi.patch<ApiResponse<Product>>(`/product/${productId}/merchant`, data)

    return response?.data?.data
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string)
    throw error
  }
}

export const deleteProduct = async (productId: string) => {
  try {
    const response = await authApi.delete<ApiResponse<Product>>(`/product/${productId}/merchant`)

    return response?.data?.data
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string)
    throw error
  }
}

export const getMerchantOrders = async (params?: GetMerchantOrdersQueryDto) => {
  try {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.append('search', params.search);
    if (params?.page) searchParams.append('page', String(params.page));
    if (params?.limit) searchParams.append('limit', String(params.limit));
    if (params?.status) searchParams.append('status', params.status);
    const response = await authApi.get<ApiResponse<MerchantOrder[]>>(`/order/merchant?${searchParams}`);

    return response?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};

export const getMerchantOrder = async (orderId: string) => {
  try {
    const response = await authApi.get<ApiResponse<MerchantOrder>>(`/order/${orderId}/merchant`);

    return response?.data?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};

export const updateMerchantOrder = async (orderId: string, data: UpdateOrderDto) => {
  try {
    const response = await authApi.patch<ApiResponse<MerchantOrder>>(`/order/${orderId}/status`, data)

    return response?.data?.data
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string)
    throw error
  }
}

export const deleteMerchantOrder = async (orderId: string) => {
  try {
    const response = await authApi.delete<ApiResponse<MerchantOrder>>(`/order/${orderId}/merchant`)

    return response?.data?.data
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string)
    throw error
  }
}

export const getWalletBalance = async () => {
  try {
    const response = await authApi.get<{ balance: number }>(`/wallet/balance`);

    return response?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};