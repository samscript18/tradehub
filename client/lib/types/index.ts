export interface ApiResponse<T, M = undefined> {
  success: boolean;
  message: string;
  data: T;
  meta?: M;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
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