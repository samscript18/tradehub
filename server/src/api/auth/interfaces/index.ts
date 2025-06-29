export interface GoogleUser {
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  role?: string;
}

export interface Address {
  country: string;
  state: string;
  city: string;
  postalcode: string;
  street: string;
}