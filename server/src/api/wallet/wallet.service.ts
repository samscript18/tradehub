import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Wallet, WalletDocument } from './schema/wallet.schema';
import { Connection, Model, Types } from 'mongoose';
import { Transaction, TransactionDocument } from './schema/transaction.schema';
import { TransactionStatus, TransactionType } from './enums/transaction.enum';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name) private readonly _walletModel: Model<WalletDocument>,
    @InjectModel(Transaction.name) private readonly _transactionModel: Model<TransactionDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) { }

  async createWallet(merchantId: Types.ObjectId): Promise<WalletDocument> {
    return await this._walletModel.create({ merchant: merchantId })
  }

  async processPayment(merchantId: Types.ObjectId, amount: number, orderId: Types.ObjectId, reference: string, metadata: object): Promise<TransactionDocument> {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      let wallet = await this._walletModel.findOne({ merchant: merchantId }).session(session);

      if (!wallet) {
        const [newWallet] = await this._walletModel.create([{ merchant: merchantId }], { session });
        wallet = newWallet;
      }

      const [transaction] = await this._transactionModel.create([{
        wallet: wallet._id,
        amount,
        type: TransactionType.CREDIT,
        status: TransactionStatus.SUCCESSFUL,
        description: `Received payment for order ${orderId}`,
        reference,
        metadata
      }], { session });


      await this._walletModel.updateOne(
        { _id: wallet._id },
        { $inc: { balance: amount } },
        { session }
      );

      await session.commitTransaction();
      console.log(wallet)
      return transaction;

    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async getWalletBalance(merchantId: Types.ObjectId): Promise<{ balance: number }> {
    const wallet = await this._walletModel.findOne({ merchant: merchantId });
    if (!wallet) {
      throw new BadRequestException('Merchant wallet not found');
    }

    return { balance: wallet.balance || 0 };
  }
}