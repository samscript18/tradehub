import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { WebhookResponse } from './interfaces';
import { Request, Response } from 'express';
import { IsPublic } from 'src/shared/decorators/auth.decorators';
import { PaymentProvider } from './providers/payment.provider';
import { WebhookService } from './services/webhook.service';

@Controller('payment')
@ApiTags('payment')
export class PaymentController {
  constructor(
    private readonly webhookService: WebhookService,
    private readonly paymentProvider: PaymentProvider,
  ) { }

  @Post('/webhook')
  @IsPublic()
  async webhook(@Req() req: Request<object, object, WebhookResponse>, @Res() res: Response) {
    await this.webhookService.processWebhook(req);

    res.status(200).json({ message: 'webhook processed' });
  }

  @Get('confirm/:reference')
  @IsPublic()
  async verifyTransaction(@Param('reference') reference: string) {
    const data = await this.paymentProvider.verifyTransaction(reference);

    return data;
  }
}