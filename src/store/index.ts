import { create } from "zustand";
import { useUserStore } from "./useUserStore";

type RootStore = {
  initLoading: boolean;
  initRoot: () => void;
};

export type AppStore = RootStore;

export const useStore = create<AppStore>()((set) => ({
  initLoading: false,
  async initRoot() {
    try {
      set({ initLoading: true });
      await useUserStore.getState().fetchUserInfo();
      set({ initLoading: false });
    } catch {
      set({ initLoading: false });
    }
  },
}));
