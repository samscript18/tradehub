import { Body, Controller, Get, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { RoleNames } from '../user/enums';
import { Auth, Roles } from 'src/shared/decorators/auth.decorators';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MerchantDocument } from '../merchant/schema/merchant.schema';
import { MerchantService } from '../merchant/merchant.service';
import { Types } from 'mongoose';
import { WithdrawDTO } from './dtos/wallet.dto';

@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService,
    private readonly merchantService: MerchantService
  ) { }

  @Get('/balance')
  @Roles([RoleNames.MERCHANT])
  @ApiOperation({ summary: "Get merchant's wallet balance" })
  @ApiBearerAuth()
  async getMerchantWalletBalance(@Auth('_id') userId: string) {
    const merchant: MerchantDocument = await this.merchantService.getMerchant({ user: new Types.ObjectId(userId) });
    return this.walletService.getWalletBalance(merchant._id);
  }

  @Get('/history')
  @Roles([RoleNames.MERCHANT])
  @ApiOperation({ summary: "Get merchant's wallet balance" })
  @ApiBearerAuth()
  async getMerchantWalletHistory(@Auth('_id') userId: string) {
    const merchant: MerchantDocument = await this.merchantService.getMerchant({ user: new Types.ObjectId(userId) });
    return this.walletService.getWalletTransactions(merchant._id);
  }

  @Post('/withdraw')
  @Roles([RoleNames.MERCHANT])
  @ApiOperation({ summary: "Withdraw from wallet" })
  @ApiBearerAuth()
  async withdrawFromWallet(@Auth('_id') userId: string, @Body() withdrawDto: WithdrawDTO) {
    const merchant: MerchantDocument = await this.merchantService.getMerchant({ user: new Types.ObjectId(userId) });
    return this.walletService.processWithdraw({ ...withdrawDto, merchantId: merchant._id });
  }
}
