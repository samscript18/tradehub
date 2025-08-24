import { Injectable, NotFoundException } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { PaystackService } from '../services/paystack.service';
import { ResolveAccountDTO } from '../dto/payment.dto';

@Injectable()
export class PaymentProvider {
  constructor(private readonly paymentService: PaymentService,
    private readonly paystackService: PaystackService
  ) { }

  async verifyTransaction(reference: string) {
    const transaction = await this.paymentService.getPaymentAttempt({ reference });

    if (!transaction) throw new NotFoundException('transaction not found');

    return {
      message: 'Transaction fetched successfully',
      success: true,
      data: transaction,
    };
  }

  async getBanks(search?: string) {
    const banks = await this.paystackService.getBanks();

    if (search) {
      return banks.filter((bank) =>
        bank.name
          .toLowerCase()
          .trimStart()
          .trimEnd()
          .includes(search.toLowerCase())
      );
    }

    return banks;
  }

  async resolveAccount(data: ResolveAccountDTO) {
    const account = await this.paystackService.resolveAccount(data);

    return account;
  }

}