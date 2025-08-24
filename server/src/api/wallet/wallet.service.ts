import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Wallet, WalletDocument } from './schema/wallet.schema';
import { Connection, Model, Types } from 'mongoose';
import { Transaction, TransactionDocument } from './schema/transaction.schema';
import { TransactionStatus, TransactionType } from './enums/transaction.enum';
import { v4 } from 'uuid';
import { PaystackService } from '../payment/services/paystack.service';
import { ProcessWithdrawDTO } from './dtos/wallet.dto';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name) private readonly _walletModel: Model<WalletDocument>,
    @InjectModel(Transaction.name) private readonly _transactionModel: Model<TransactionDocument>,
    @InjectConnection() private readonly connection: Connection,
    private readonly paystackService: PaystackService
  ) { }

  async createWallet(merchantId: Types.ObjectId): Promise<WalletDocument> {
    return await this._walletModel.create({ merchant: merchantId })
  }

  async getWalletTransactions(merchantId: Types.ObjectId) {
    const wallet = await this._walletModel.findOne({ merchant: merchantId });

    if (!wallet) {
      throw new BadRequestException('Merchant wallet not found');
    }

    const walletTransactions = await this._transactionModel.find({ wallet: wallet._id });
    return walletTransactions;
  }

  async processPayment(merchantId: Types.ObjectId, amount: number, reference: string, metadata?: object, orderId?: Types.ObjectId): Promise<TransactionDocument> {
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
        description: `${orderId ? `Received payment for order ${orderId}` : 'Reversed withdrawal'}`,
        reference,
        metadata
      }], { session });


      await this._walletModel.updateOne(
        { _id: wallet._id },
        { $inc: { balance: amount } },
        { session }
      );

      await session.commitTransaction();
      return transaction;

    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async processWithdraw({ account_name, account_number, amount, bank_code, merchantId }: ProcessWithdrawDTO): Promise<{ reference: string }> {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const wallet = await this._walletModel.findOne({ merchant: merchantId }).session(session);

      if (wallet.balance > amount + 50) {
        throw new BadRequestException('Insufficient wallet balance');
      }

      const recipient = await this.paystackService.createRecipient({
        account_number,
        name: account_name,
        bank_code,
        type: "nuban",
      });

      const reference = v4();

      await this._transactionModel.create([{
        wallet: wallet._id,
        amount,
        type: TransactionType.DEBIT,
        status: TransactionStatus.PENDING,
        description: `Withdrawal initiated`,
        reference,
      }], { session });

      await this._walletModel.updateOne(
        { _id: wallet._id },
        { $inc: { balance: -amount } },
        { session }
      );
      await session.commitTransaction();

      await this.paystackService.initiateTransfer({
        amount,
        reference,
        recipient
      });

      return { reference };
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