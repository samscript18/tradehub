import { AxiosErrorShape, errorHandler } from '../config/axios-error'
import { authApi } from '../config/axios-instance'
import { ApiResponse } from '../types'
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
