import { create } from 'zustand';
import { User } from '../@types';
import { persist } from 'zustand/middleware';

interface UserStoreState {
  user?: User;
}

interface UserStoreAction {
  setUser(body: User): void;
  updateUserField(key: keyof User, value: any): void;
}

type UserStore = UserStoreState & UserStoreAction;

const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: undefined,

      setUser: (user) => set((state) => ({ ...state, user })),
      updateUserField: (key, value) =>
        set((state) => ({
          ...state,
          user: {
            ...state.user!,
            [key]: value,
          },
        })),
    }),
    { name: 'user-store' }
  )
);

export default useUserStore;
