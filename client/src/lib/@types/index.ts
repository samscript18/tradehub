import { ReactNode } from 'react';

export interface ApiResponse<T = any, M = any> {
  status: boolean;
  msg: string;
  data: T;
  meta?: M;
}

export interface TabsDto {
  header: string;
  widget: ReactNode;
}

export type Address = {
  state: {
    id: string;
    name: string;
  };
  city: string;
  street_address: string;
  zip_code: string;
};

export interface ApiResponse<T> {
  status: boolean;
  msg: string;
  data: T;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
}

export interface BankDetails {
  bank_name: string;
  account_number: string;
  account_name: string;
  bank_code: string;
}


export interface Order {
  cart: { product: string; quantity: number }[];
  customer: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
  };
  orderDate: string;
  type: 'PICKUP' | 'DELIVERY';
  address: {
    state: string;
    city: string;
    zip_code: string;
    street_address: string;
  };
}

export type Cart = {
  product: "Product";
  quantity: number;
  product_price: number;
};

