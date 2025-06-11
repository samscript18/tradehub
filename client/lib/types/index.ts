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
  email: string;
  phoneNumber: string;
  storeName?: string;
  storeAddress?: string;
  storeLogo?: string;
  storeDescription?: string;
  storeCategories: string[];
  role: 'customer' | 'merchant';
}