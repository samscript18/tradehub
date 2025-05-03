export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  bankDetails: {
    bank_name: string;
    account_number: string;
    account_name: string;
    bank_code: string;
  };
  address: {
    state: string;
    city: string;
    zip_code: string;
    street_address: string;
  };
  accessToken: string;
  refreshToken: string;
}

export interface LoginType {
  email?: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
  nextStep?: 'profile-setup' | 'password-setup' | 'email-verification';
}

export type RegisterType = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
};
