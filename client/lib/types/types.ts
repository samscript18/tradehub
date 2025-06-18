import { User } from '.'

export interface Address {
  country: string
  state: string
  city: string
  streetAddress: string
  zipcode?: string
}

export interface DeliveryAddress extends Address {
  name: string
  phoneNumber: string
}
export interface Property {
  _id: string
  name: string
  description: string
  bedrooms: number
  // images: string[]
  // videos: string[]
  location: string
  price: number
  propertyType: string
  minDownPaymentPercent: number
  minMonthlyPayment: number
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  updatedAt: string
}

export interface Customer {
  _id: string
  user: User
  firstName: string
  lastName: string
  gender?: 'male' | 'female'
  dateOfBirth?: string
  addresses: Address[]
  defaultAddress: Address | null
}

export interface Merchant {
  _id: string
  user: User
  storeName: string
  storeLogo: string
  storeDescription: string
  defaultAddress: Address | null
  addresses: Address[]
  storeCategory: string[]
  website?: string
  socials: {
    facebook: string
    twitter: string
    whatsapp: string
    linkedin: string
  }
  isVerified: boolean
}

export interface ProductVariant {
  type: string
  value: string
  price: string
  stock: string 
  sku?: string
}


export type CreateProductDto = Product

export interface Product {
  name: string
  description: string
  images: string[]
  category: string
  variants: ProductVariant[]
}

