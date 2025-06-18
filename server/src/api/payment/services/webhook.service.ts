// src/payments/webhook.service.ts
import {
  ForbiddenException,
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { Request } from 'express';
import { PaymentService } from './payment.service';
import { MailService } from 'src/shared/mail/mail.service';
import { ChargeResponse, WebhookResponse } from '../interfaces';
import { PaymentStatus, WebhookEvents } from '../enums';
import { OrderProvider } from 'src/api/order/order.provider';
import { OrderMetadata } from '../interfaces/metadata';
import { CustomerService } from 'src/api/customer/customer.service';
import { CustomerDocument } from 'src/api/customer/schema/customer.schema';
import { NotificationProvider } from 'src/api/notification/notification.provider';

@Injectable()
export class WebhookService {
  constructor(
    private readonly configService: ConfigService,
    private readonly paymentService: PaymentService,
    private readonly orderProvider: OrderProvider,
    private readonly mailService: MailService,
    private readonly customerService: CustomerService,
    private readonly notificationProvider: NotificationProvider
  ) { }

  private validateWebhookSignature(signature: string, webhookResponse: WebhookResponse) {
    const secretKey = this.configService.get<string>('PAYSTACK_SECRET_KEY');
    if (!secretKey) {
      throw new Error('Paystack secret key not configured');
    }

    const hash = crypto
      .createHmac('sha512', secretKey)
      .update(JSON.stringify(webhookResponse))
      .digest('hex');

    if (hash !== signature) {
      throw new ForbiddenException('Invalid webhook signature');
    }
  }

  async processWebhook(req: Request<object, object, WebhookResponse>) {
    const signature = req.headers['x-paystack-signature'] as string;
    if (!signature) {
      throw new ForbiddenException('Missing webhook signature');
    }

    this.validateWebhookSignature(signature, req.body);

    const { event, data } = req.body;
    const { reference } = data;

    switch (event) {
      case WebhookEvents.TRANSACTION_SUCCESSFUL:
        if (reference.startsWith('order-')) {
          await this.handleSuccessfulOrderPayment(req.body.data);
        }
        break;

      case WebhookEvents.TRANSACTION_FAILED:
        await this.handleFailedOrderPayment(req.body.data);
        break;

      default:
        throw new MethodNotAllowedException('Unhandled Paystack webhook event');
    }
  }

  async handleSuccessfulOrderPayment(chargeResponse: ChargeResponse) {
    const attempt = await this.paymentService.updatePaymentAttempt(
      { reference: chargeResponse.reference },
      { status: PaymentStatus.SUCCESSFUL },
    );

    if (!attempt) throw new NotFoundException('Payment not found');


    const metadata = attempt.metadata as OrderMetadata;

    const order = await this.orderProvider.createOrder({
      ...metadata
    }, attempt.user.id);

    const customer: CustomerDocument = await this.customerService.getCustomer({ user: attempt.user._id })
    
    await this.notificationProvider.createNotification({
      message: `Your payment to process the order ${order.data?.[0].groupId} was successful.`,
      type: 'payment_successful',
    }, customer.user._id.toString());

    await this.mailService.sendMail({
      to: customer.user.email,
      subject: 'Order Confirmed ✔️',
      template: 'order-success',
      context: {
        customerName: customer.firstName,
        orderId: order.data?.[0].groupId,
        amount: (attempt.metadata as OrderMetadata).price,
        transactionRef: attempt.reference,
      },
    });

    return order;
  }

  async handleFailedOrderPayment(chargeResponse: ChargeResponse) {
    const attempt = await this.paymentService.updatePaymentAttempt(
      { reference: chargeResponse.reference },
      { status: PaymentStatus.FAILED },
    );

    if (!attempt) throw new NotFoundException('Payment not found');

    const customer: CustomerDocument = await this.customerService.getCustomer({ user: attempt.user._id })


    await this.mailService.sendMail({
      to: customer.user.email,
      subject: 'Payment Failed ❌',
      template: 'order-failure',
      context: {
        customerName: customer.firstName,
        reference: chargeResponse.reference,
        amount: (attempt.metadata as OrderMetadata).price,
        transactionRef: attempt.reference,
      },
    });
  }
}
