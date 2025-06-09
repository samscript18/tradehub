import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';

@Injectable()
export class PaymentProvider {
  constructor(private readonly paymentService: PaymentService) { }

  async verifyTransaction(reference: string) {
    const transaction = await this.paymentService.getPaymentAttempt({ reference });

    if (!transaction) throw new NotFoundException('transaction not found');

    return {
      message: 'Transaction fetched successfully',
      success: true,
      data: transaction,
    };
  }
}