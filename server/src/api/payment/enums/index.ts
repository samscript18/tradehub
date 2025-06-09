export enum PaymentStatus {
  PENDING = 'pending',
  SUCCESSFUL = 'successful',
  FAILED = 'failed',
}

export enum WebhookEvents {
  TRANSACTION_SUCCESSFUL = 'charge.success',
  TRANSACTION_FAILED = 'charge.failed',
}