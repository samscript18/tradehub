import { AxiosErrorShape, errorHandler } from '../config/axios-error'
import { authApi } from '../config/axios-instance'
import { ApiResponse } from '../types'
import {
  Merchant,
  CreateProductDto,
  Product,
} from '../types/types'
import { toast } from 'react-toastify'

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
  } catch (error: unknown) {
    let errorMessage = 'Failed to create product'
    if (
      error &&
      typeof error === 'object' &&
      'response' in error &&
      error.response &&
      typeof (error as any).response === 'object' &&
      'data' in (error as any).response &&
      (error as any).response.data &&
      typeof (error as any).response.data.message === 'string'
    ) {
      errorMessage = (error as any).response.data.message
    }
    toast.error(errorMessage)
    throw new Error(errorMessage)
  } 
}
