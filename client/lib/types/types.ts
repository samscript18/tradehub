import { User } from ".";
import { OrderStatus, ProductStatus } from "../enums";

export interface Address {
  country: string;
  state: string;
  city: string;
  streetAddress: string;
  postalcode?: string;
}

export interface DeliveryAddress extends Address {
  fullName?: string;
  phoneNumber?: string;
}

export interface Customer {
  _id: string;
  user: User;
  firstName: string;
  lastName: string;
  gender?: 'male' | 'female';
  dateOfBirth?: string;
  addresses: DeliveryAddress[];
  defaultAddress: DeliveryAddress | null;
}

export interface Merchant {
  _id: string;
  user: User;
  storeName: string;
  storeLogo: string;
  storeDescription: string;
  defaultAddress: OrderAddress | null;
  addresses: OrderAddress[];
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
  postalcode?: string;
}

export interface CustomerOrderProduct {
  product: string;
  quantity: number;
}

export interface CustomerOrderMerchant {
  _id: string;
  name: string;
  logo: string;
}

export interface CustomerOrderMerchantOrder {
  orderId: string;
  merchant: CustomerOrderMerchant;
  items: {
    product: string;
    variant: {
      size?: string;
      color?: string;
    };
    quantity: number;
    price: number;
  }[];
  status: string;
  products: CustomerOrderProduct[];
}

export interface CustomerOrder {
  orderId: string;
  status: string;
  address: OrderAddress;
  merchantOrders: CustomerOrderMerchantOrder[];
  price: number;
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
export type CreateProductDto = Products

export interface Products {
  name: string
  description: string
  images: string[]
  category: string
  variants: ProductVariant[]
}
export interface ProductVariant {
  _id?: string;
  size: string;
  color?: string;
  price: number;
  stock: number;
}

export interface ProductPriceRange {
  label: string;
  min: number;
  max: number | null;
  count: number;
}

export interface ProductFilters {
  category: string[];
  rating: number[];
  priceRange: ProductPriceRange[];
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
  type: string;
  data?: NotificationData;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}
