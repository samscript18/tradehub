import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Paystack } from 'paystack-sdk';
import { Bank, InitiateTransferDTO, ResolveAccountDTO, ResolveAccountResponse } from '../dto/payment.dto';
import { CreateRecipient } from 'paystack-sdk/dist/recipient/interface';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PaystackService {
  constructor(
    @Inject('paystack') private readonly paystack: Paystack,
    private readonly configService: ConfigService,
    private readonly https: HttpService
  ) { }

  public async initiateTransaction(data: {
    email: string;
    reference: string;
    amount: number;
    redirect_url?: string;
  }) {
    const frontendUrl = this.configService.get('FRONTEND_URL');
    const response = await this.paystack.transaction.initialize({
      email: data.email,
      reference: data.reference,
      amount: JSON.stringify(parseInt(String(data.amount * 1.1 * 100))),
      callback_url: data.redirect_url
        ? `${frontendUrl}${data.redirect_url}`
        : `${frontendUrl}/customer/order/verify/${data.reference}`,
      currency: 'NGN',
    });

    if (!response?.data || !response?.status) {
      throw new BadRequestException(response?.message);
    }

    return response.data.authorization_url;
  }

  public async createRecipient(data: CreateRecipient): Promise<string> {
    try {
      const response = await this.paystack.recipient.create({
        type: "nuban",
        name: data.name,
        account_number: data.account_number,
        bank_code: data.bank_code,
        currency: "NGN",
      });

      if (!response.data?.recipient_code) {
        throw new InternalServerErrorException("unable to create transfer recipient");
      }

      return response.data?.recipient_code;
    } catch (error) {
      throw new InternalServerErrorException("unable to create transfer recipient");
    }
  }

  public async getBanks(): Promise<Bank[]> {
    try {
      const response = await firstValueFrom(this.https.get("/bank", {
        baseURL: "https://api.paystack.co",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.configService.get<string>('PAYSTACK_SECRET_KEY')}`
        },
      }));

      if (response.data.status != true) {
        throw new InternalServerErrorException("unable to fetch banks");
      }

      return response.data.data;
    } catch (error) {
      throw new InternalServerErrorException("unable to fetch banks");
    }
  }

  public async resolveAccount(
    data: ResolveAccountDTO
  ): Promise<ResolveAccountResponse> {
    try {
      const response = await this.paystack.verification.resolveAccount({
        bank_code: data.bank_code,
        account_number: data.account_number,
      });

      if (response.status != true) {
        throw new NotFoundException("unable to resolve account info");
      }

      return response.data!;
    } catch (error) {
      console.log(error);
      throw new NotFoundException("unable to resolve account info");
    }
  }

  public async initiateTransfer(data: InitiateTransferDTO) {
    const { amount, reference, recipient } = data;
    try {
      const response = await this.paystack.transfer.initiate({
        amount: amount * 100,
        reference,
        recipient,
        source: "balance",
        currency: "NGN",
        reason: "Withdrawal from wallet",
      });

      if (!response.status) {
        throw new NotFoundException("unable to make transfer");
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("unable to make transfer");
    }
  }

}