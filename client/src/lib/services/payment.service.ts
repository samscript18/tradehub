import { ApiResponse } from '@/types';
import { authApi, publicApi } from '../configs/axios-instance';
import { errorHandler } from '../utils/error';

export const getBanks = async () => {
  try {
    const {
      data: { data },
    } = await publicApi.get<
      ApiResponse<{ bank_name: string; bank_code: string }[]>
    >('payment/banks');
    return data;
  } catch (err) {
    errorHandler(err || 'Unable to fetch banks');
  }
};

export const lookupAccount = async (body: {
  bankCode: string;
  accountNumber: string;
}) => {
  if (!body.bankCode || !body.accountNumber || body.accountNumber.length !== 10)
    throw new Error('incomplete.');

  try {
    const {
      data: { data },
    } = await publicApi.post<
      ApiResponse<{
        account_name: string;
        account_number: string;
        bank_code: string;
        bank_name: string;
      }>
    >('/payment/lookup-account', body);

    return data;
  } catch (err) {
    errorHandler(err || 'Account lookup failed');
  }
};

export const withdraw = async (amount: number) => {
  try {
    const response = await authApi.post('/payment/withdraw', { amount });

    return response?.data;
  } catch (err) {
    errorHandler(err || 'Unable to withdraw funds');
  }
};
