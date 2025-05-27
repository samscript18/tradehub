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
  address?: {
    country: string;
    state: string;
    city: string;
    streetAddress: string;
    zipcode?: string;
  };
  storeCategory?: string[];
}


export type ContactUs = {
  name: string;
  email: string;
  message: string;
}
