import { User } from ".";

export interface Address {
  country: string;
  state: string;
  city: string;
  streetAddress: string;
  zipcode?: string;
}

export interface DeliveryAddress extends Address {
  id: string;
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