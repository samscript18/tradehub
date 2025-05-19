export interface LoginType {
  email: string;
  password: string;
}

export type User = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
};

export type ResetPassword = {
  password: string;
  token: string;
  email: string;
  confirmPassword: string;
};

export type SignUp = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
};
