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