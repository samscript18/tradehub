export enum OrderStatus {
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
  PROCESSING = 'Processing',
  OPEN = 'Open',
}

export enum ShippingStatus {
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  AWAITING_SHIPPING = 'Awaiting Shipping',
  RETURNED = 'Returned',
  PICKED_UP = 'Picked Up',
}

export enum OrderPaymentStatus {
  PAID = 'Paid',
  UNPAID = 'Unpaid',
}

export enum DiscountType {
  FIXED = 'FIXED',
  PERCENTAGE = 'PERCENTAGE',
}

export enum DiscountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  EXPIRED = 'EXPIRED',
}

export enum PaymentMethod {
  QR_LINK = 'QR/Link',
  BANK_TRANSFER = 'Bank Transfer - Terminal',
  PAYOUT_BANK_TRANSFER = 'Bank Transfer - Payout',
  USSD = 'USSD',
}
