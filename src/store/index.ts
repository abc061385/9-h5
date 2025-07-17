import { create } from "zustand";
import { createUserSlice, UserSlice } from "./slices/userSlice";

type RootStore = {
  initLoading: boolean;
  initRoot: () => void;
};

type AppStore = UserSlice & RootStore;

export const useStore = create<AppStore>()((set, get, api) => ({
  ...createUserSlice(set, get, api),
  initLoading: false,
  async initRoot() {
    try {
      set({ initLoading: true });
      await get().fetchUserInfo();
      set({ initLoading: false });
    } catch (err) {
      set({ initLoading: false });
    }
  },
}));
