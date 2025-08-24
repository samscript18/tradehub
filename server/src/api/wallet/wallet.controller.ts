import { Controller, Get } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { RoleNames } from '../user/enums';
import { Auth, Roles } from 'src/shared/decorators/auth.decorators';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MerchantDocument } from '../merchant/schema/merchant.schema';
import { MerchantService } from '../merchant/merchant.service';
import { Types } from 'mongoose';

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
  async getMerchantOrder(@Auth('_id') userId: string) {
    console.log(userId);
    const merchant: MerchantDocument = await this.merchantService.getMerchant({ user: new Types.ObjectId(userId) });
    return this.walletService.getWalletBalance(merchant._id);
  }
}
