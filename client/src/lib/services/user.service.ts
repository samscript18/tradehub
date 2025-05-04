import { authApi } from '../configs/axios-instance';
import { ApiResponse, User } from '@/types';
import { errorHandler } from '../utils/error';

export const getUserInfo = async () => {
  try {
    const {
      data: { data },
    } = await authApi.get<ApiResponse<User>>(`/user`);
    return data;
  } catch (err) {
    errorHandler(err || 'Unable to fetch user info');
  }
};
