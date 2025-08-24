import { forwardRef, Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from './schema/wallet.schema';
import { Transaction, TransactionSchema } from './schema/transaction.schema';
import { MerchantModule } from '../merchant/merchant.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Wallet.name,
        schema: WalletSchema
      },
      {
        name: Transaction.name,
        schema: TransactionSchema
      }
    ]),
    forwardRef(() => MerchantModule)
  ],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService]
})
export class WalletModule { }
