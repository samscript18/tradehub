import { authApi } from '../configs/axios-instance';
import { ApiResponse, User } from '@/types';

export const getUserInfo = async () => {
  try {
    const {
      data: { data },
    } = await authApi.get<ApiResponse<User>>(`/user`);
    return data;
  } catch (err) {
    console.log(err || 'Unable to fetch user info');
    return null;
  }
};
