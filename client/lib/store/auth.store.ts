import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getUser } from '../services/auth.service';
import { User } from '../types';
import { getCustomer } from '../services/customer.service';
import { Customer, Merchant } from '../types/types';
import { getMerchant } from '../services/merchant.service';

type IUser = (User & Customer) | (User & Merchant)

type AuthStoreState = {
  user?: IUser;
  accessToken?: string;
  refreshToken?: string;
};

type AuthStoreActions = {
  fetchUser(): void;
  resetUser(): void;
  setToken(accessToken: string, refreshToken: string): void;
};

type AuthStore = AuthStoreState & AuthStoreActions;

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: undefined,
      async fetchUser() {
        try {
          const user = await getUser();

          if (user.role === 'customer') {
            const { firstName, lastName, addresses: customerAddresses, dateOfBirth, gender } = await getCustomer()

            set({ user: { ...user, firstName, lastName, addresses: customerAddresses, dateOfBirth, gender } as User & Customer });

          } else if (user.role === 'merchant') {
            const { storeName, storeLogo, storeDescription, storeCategory, isVerified, addresses: merchantAddresses } = await getMerchant()
            
            set({ user: { ...user, storeName, storeLogo, storeDescription, storeCategory, isVerified, addresses: merchantAddresses } as User & Merchant });
          }

        } catch {
          set({ user: undefined });
        }
      },
      setToken(accessToken, refreshToken) {
        set({ accessToken });
        set({ refreshToken })
      },
      resetUser() {
        set({ user: undefined, accessToken: undefined, refreshToken: undefined });
      },
    }),
    {
      name: 'user-store',
      storage: {
        setItem: (name, value) =>
          sessionStorage.setItem(name, JSON.stringify(value)),
        getItem: (name) =>
          sessionStorage.getItem(name)
            ? JSON.parse(sessionStorage.getItem(name)!)
            : null,
        removeItem: (name) => sessionStorage.removeItem(name),
      },
    }
  )
);
