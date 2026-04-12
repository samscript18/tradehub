import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";

const noopStorage: StateStorage = {
	getItem: () => null,
	setItem: () => {},
	removeItem: () => {},
};

type GlobalStateType = {
	isLoading?: boolean;
};

type GlobalStateActions = {
	updateGlobalState: <K extends keyof GlobalStateType>(data: K, value: GlobalStateType[K]) => void;
};

type GlobalState = GlobalStateType & GlobalStateActions;

type SidebarState = {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
};

export const useSidebar = create<SidebarState>()(
	persist(
		(set) => ({
			isSidebarOpen: true,
			toggleSidebar: () => set((state) => ({ ...state, isSidebarOpen: !state.isSidebarOpen })),
		}),
		{
			name: "sidebar-state",
			storage: createJSONStorage(() => (typeof window !== "undefined" ? window.localStorage : noopStorage)),
		},
	),
);

const useGlobalStore = create<GlobalState>((set) => ({
	updateGlobalState: (data, value) => set((state) => ({ ...state, [data]: value })),
}));

// -------------------------
// THEME
// -------------------------
type ThemeStoreState = {
	isDark: boolean;
};

type ThemeStoreActions = {
	updateDarkMode: (state: boolean) => void;
	toggleDarkMode: () => void;
};

type ThemeStore = ThemeStoreState & ThemeStoreActions;

export const useTheme = create<ThemeStore>()(
	persist(
		(set) => ({
			isDark: true,
			updateDarkMode: (newState) => set((state) => ({ ...state, isDark: newState })),
			toggleDarkMode: () => set((state) => ({ ...state, isDark: !state.isDark })),
		}),
		{
			name: "tradehub-theme",
			storage: createJSONStorage(() => (typeof window !== "undefined" ? window.localStorage : noopStorage)),
		},
	),
);

export default useGlobalStore;
