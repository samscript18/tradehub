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
  storeAddress?: string;
  storeCategory?: string[];
}


export type ContactUs = {
  name: string;
  email: string;
  message: string;
}
