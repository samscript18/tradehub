import { AxiosErrorShape, errorHandler } from '../config/axios-error'
import { authApi, publicApi } from '../config/axios-instance'
import { GetMerchantOrdersQueryDto, GetProductsQueryDto, UpdateOrderDto, UpdateProductDto } from '../dtos'
import { ApiResponse, Bank, MerchantOrder, WalletHistory } from '../types'
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

export const getWalletHistory = async () => {
  try {
    const response = await authApi.get<WalletHistory[]>(`/wallet/history`);

    return response?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};

export const getBanks = async (search: string) => {
  try {
    const response = await publicApi.get<Bank[]>(`/payment/banks?search=${search}`);

    return response?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};

export const validateAccountInfo = async ({ bankCode, accountNumber }: { bankCode: string; accountNumber: string }) => {
  try {
    const response = await publicApi.get<{
      account_number: string;
      account_name: string;
      bank_id: number
    }>(`/payment/resolve-account?bank_code=${bankCode}&account_number=${accountNumber}`);

    return response?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};

export const initiateWithdraw = async (data: {
  amount: string;
  account_number: string;
  account_name: string;
  bank_code: string
}) => {
  try {
    const response = await authApi.post<{
      reference: string
    }>(`/wallet/withdraw`, data);

    return response?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};

