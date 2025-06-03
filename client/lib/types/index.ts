import { StaticImageData } from "next/image";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  // meta?: M;
}

export interface User {
  _id: string;
  firstName?: string;
  lastName?: string;
  gender?: 'male' | 'female';
  dateOfBirth?: string;
  profilePicture?: string;
  email: string;
  phoneNumber: string;
  storeName?: string;
  storeAddress?: string;
  storeLogo?: string;
  storeDescription?: string;
  storeCategories: string[];
  role: 'customer' | 'merchant';
}

export interface Product {
  id: number;
  img: StaticImageData | string;
  name: string;
  merchant: string;
  price: number;
  quantity?: number;
}