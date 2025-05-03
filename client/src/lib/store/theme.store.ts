import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeStoreState = {
  isDark: boolean;
};

type ThemeStoreActions = {
  updateDarkMode: (state: boolean) => void;
  toggleDarkMode: () => void;
};

type ThemeStore = ThemeStoreState & ThemeStoreActions;

const useTheme = create<ThemeStore>()(
  persist(
    (set) => ({
      isDark: false,
      updateDarkMode: (newState) =>
        set((state) => ({ ...state, isDark: newState })),
      toggleDarkMode: () =>
        set((state) => ({ ...state, isDark: !state.isDark })),
    }),
    { name: "stockly-theme" }
  )
);

export default useTheme;
