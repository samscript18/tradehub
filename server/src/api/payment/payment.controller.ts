import { Body, Controller, Get, Param, Post, Query, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { WebhookResponse } from './interfaces';
import { Request, Response } from 'express';
import { IsPublic } from 'src/shared/decorators/auth.decorators';
import { PaymentProvider } from './providers/payment.provider';
import { WebhookService } from './services/webhook.service';
import { ResolveAccountDTO } from './dto/payment.dto';

@ApiTags('Payment')
@Controller('payment')
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
  @ApiOperation({ summary: "Verify transaction" })
  @IsPublic()
  async verifyTransaction(@Param('reference') reference: string) {
    const data = await this.paymentProvider.verifyTransaction(reference);

    return data;
  }

  @Get('banks')
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Search term to filter banks by name' })
  @ApiOperation({ summary: "Get all banks" })
  @IsPublic()
  async getBanks(@Query('search') search: string) {
    const data = await this.paymentProvider.getBanks(search);

    return data;
  }

  @Get('resolve-account')
  @ApiOperation({ summary: "Validate account information" })
  @ApiQuery({ name: 'account_number', required: true, type: String, description: '10-digit account number' })
  @ApiQuery({ name: 'bank_code', required: true, type: String, description: 'Bank code' })
  @IsPublic()
  async resolveAccount(@Query() resolveAccountDto: ResolveAccountDTO) {
    const data = await this.paymentProvider.resolveAccount(resolveAccountDto);

    return data;
  }
}