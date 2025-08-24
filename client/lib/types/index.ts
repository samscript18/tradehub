import { Customer, Merchant, OrderAddress, Product } from './types';


export interface ApiResponse<T, M = { page: number, count: number, totalPages: number }> {
  success: boolean;
  message: string;
  data: T;
  meta?: M;
}

export interface User {
  _id: string;
  firstName?: string;
  lastName?: string;
  gender?: 'male' | 'female';
  dateOfBirth?: string;
  profilePicture?: string;
  notificationsDisabled?: boolean;
  email: string;
  phoneNumber: string;
  storeName?: string;
  storeAddress?: string;
  storeLogo?: string;
  storeDescription?: string;
  storeCategories: string[];
  role: 'customer' | 'merchant';
}



export interface OrderProduct {
  product: Product;
  variant: {
    size?: string;
    color?: string;
  };
  quantity: number;
  price: number;
}

export interface MerchantOrder {
  _id: string;
  groupId: string;
  customer: Customer;
  merchant: Merchant;
  products: OrderProduct[];
  status: string;
  price: number;
  address: OrderAddress;
  createdAt: string;
  updatedAt: string;
}

export interface WalletHistory {
  _id: string;
  wallet: string;
  amount: number;
  type: 'credit' | 'debit';
  status: 'pending' | 'successful' | 'failed';
  description: string;
  reference: string;
  createdAt: string;
  updatedAt: string;
}

export interface Bank {
  name: string;
  slug: string;
  code: string;
  type: string;
  country: string;
}