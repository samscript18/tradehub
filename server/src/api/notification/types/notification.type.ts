export type NotificationType =
  // Order related
  | 'order_placed'
  | 'order_updated'
  | 'order_cancelled'
  | 'order_delivered'
  | 'order_shipped'

  // Payment related
  | 'payment_successful'
  | 'payment_failed'

  // Account related
  | 'account_created'
  | 'password_changed'
  | 'profile_updated'

  // Review related
  | 'new_review'
  | 'review_response'
