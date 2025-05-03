import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppStoreState {
  darkMode: boolean;
  sidebarOpen: boolean;
}

interface AppStoreAction {
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
}

type AppStore = AppStoreState & AppStoreAction;

const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      darkMode: false,
      sidebarOpen: true,

      toggleDarkMode: () =>
        set((state) => ({ ...state, darkMode: !get().darkMode })),
      toggleSidebar: () =>
        set((state) => ({ ...state, sidebarOpen: !get().sidebarOpen })),
    }),
    { name: "app-store" }
  )
);

export default useAppStore;
