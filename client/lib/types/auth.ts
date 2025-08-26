import { Address, OrderAddress } from "./types";

export interface LoginType {
  credential: string;
  password: string;
  rememberMe?: boolean;
}


export type ResetPassword = {
  password: string;
  token: string;
  email: string;
  confirmPassword: string;
};

export type SignUp = {
  email: string;
  phoneNumber: string;
  password: string;
  role: 'customer' | 'merchant',
  firstName?: string;
  lastName?: string;
  storeName?: string;
  storeDescription?: string;
  address?: Address;
  storeCategory?: string[];
}

export type EditMerchantProfile = {
  email: string;
  phoneNumber: string;
  password: string;
  role: 'customer' | 'merchant',
  firstName?: string;
  lastName?: string;
  storeName?: string;
  storeDescription?: string;
  defaultAddress?: OrderAddress;
  addresses?: OrderAddress[];
  storeCategory?: string[];
}


export type ContactUs = {
  name: string;
  email: string;
  message: string;
}

export type UpdateProfile = {
  email?: string;
  phoneNumber?: string;
  currentPassword?: string
  newPassword?: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: File | string
}