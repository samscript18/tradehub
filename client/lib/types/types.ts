import { User } from ".";
import { NotificationType, OrderStatus, ProductStatus } from "../enums";

export interface Address {
  country: string;
  state: string;
  city: string;
  street: string;
  zipcode?: string;
}

export interface DeliveryAddress extends Address {
  name: string;
  phoneNumber: string;
}


export interface Customer {
  _id: string;
  user: User;
  firstName: string;
  lastName: string;
  gender?: 'male' | 'female';
  dateOfBirth?: string;
  addresses: Address[];
  defaultAddress: Address | null;
}

export interface Merchant {
  _id: string;
  user: User;
  storeName: string;
  storeLogo: string;
  storeDescription: string;
  defaultAddress: Address | null;
  addresses: Address[];
  storeCategory: string[];
  website?: string;
  socials: {
    facebook: string;
    twitter: string;
    whatsapp: string;
    linkedin: string;
  };
  isVerified: boolean;
}

export interface OrderProduct {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  variant: {
    size?: string;
    color?: string;
  };
}

export interface OrderAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
}

export interface Order {
  _id: string;
  customer: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  products: OrderProduct[];
  address: OrderAddress;
  totalPrice: number;
  status: OrderStatus;
  reference: string;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  _id?: string;
  size: string;
  color?: string;
  price: number;
  stock: number;
}

export interface Product {
  _id: string;
  merchant: {
    _id: string;
    storeName: string;
    email: string;
  };
  name: string;
  description: string;
  category: string;
  images: string[];
  variants: ProductVariant[];
  isActive: boolean;
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationData {
  orderId?: string;
  productId?: string;
  paymentId?: string;
  status?: string;
  message?: string;
}

export interface Notification {
  _id: string;
  user: {
    _id: string;
    email: string;
  };
  title: string;
  message: string;
  type: NotificationType;
  data?: NotificationData;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}