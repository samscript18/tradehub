export interface ApiResponse<T, M = undefined> {
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
}

export type Document = {
  _id: string;
  createdAt: Date;
  name: string;
  description: string;
  url: string;
  mime_type: string;
  uploaded_by: User;
  byte_size: number;
  upload_id?: string;
};