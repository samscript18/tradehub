import { NotificationType, OrderStatus, ProductStatus } from '../enums';
import { NotificationData } from '../types/types';

export interface CreateNotificationDto {
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  data?: NotificationData;
}

export interface UpdateNotificationDto {
  isRead?: boolean;
}

export interface GetNotificationsQueryDto {
  page?: number;
  limit?: number;
  type?: NotificationType;
  isRead?: boolean;
}

export interface CreateOrderProductDto {
  productId: string;
  quantity: number;
  price: number;
  variant: {
    size?: string;
    color?: string;
  };
}

export interface CreateOrderDto {
  products: CreateOrderProductDto[];
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalcode: string;
  };
}

export interface CheckoutDto extends CreateOrderDto {
  price: number;
}

export interface UpdateOrderDto {
  status?: OrderStatus;
  trackingNumber?: string;
}

export interface CreateProductVariantDto {
  size: string;
  color?: string;
  price: number;
  stock: number;
}

export interface CreateProductDto {
  name: string;
  description: string;
  category: string;
  images: string[];
  variants: CreateProductVariantDto[];
}

export interface UpdateProductDto extends Partial<CreateProductDto> {
  isActive?: boolean;
  status?: ProductStatus;
}

export interface GetProductsQueryDto {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  priceRange?: { label?: string; min: number; max: number | null };
  rating?: number;
  status?: ProductStatus;
}