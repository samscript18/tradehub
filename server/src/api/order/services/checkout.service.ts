import { Injectable } from '@nestjs/common';
import { CustomerService } from 'src/api/customer/customer.service';
import { PaymentService } from 'src/api/payment/services/payment.service';
import { PaystackService } from 'src/api/payment/services/paystack.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateOrderDto } from '../dto/create-order.dto';
import { CustomerDocument } from 'src/api/customer/schema/customer.schema';
import { Types } from 'mongoose';


@Injectable()
export class CheckoutService {
  constructor(
    private readonly paystackService: PaystackService,
    private readonly paymentService: PaymentService,
    private readonly customerService: CustomerService,
  ) { }

  async initiateCheckout(createOrderDto: CreateOrderDto, userId: string) {

    const customer: CustomerDocument = await this.customerService.getCustomer({
      user: new Types.ObjectId(userId)
    });

    const totalAmount = createOrderDto.products.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );

    const reference = `order-${uuidv4()}`;

    await this.paymentService.createPaymentAttempt({
      user: userId,
      amount: totalAmount,
      reference,
      metadata: createOrderDto
    });
    
    const paymentUrl = await this.paystackService.initiateTransaction({
      email: customer.user.email,
      amount: totalAmount,
      reference,
      redirect_url: `/customer/order/verify/${reference}`
    });

    return {
      success: true,
      message: 'Checkout initiated successfully',
      data: {
        paymentUrl,
        reference
      }
    };
  }
}