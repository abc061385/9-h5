import { api } from "@/api";
import type { StateCreator } from "zustand";
import { AppStore } from "../index";

export interface UserSlice extends BaseState<UserSlice> {
  userInfo: UserInfo;
  fetchUserInfo: () => Promise<void>;
}

export const createUserSlice: StateCreator<AppStore, [], [], UserSlice> = (
  set,
) => ({
  userInfo: {},
  fetchUserInfo: async () => {
    try {
      const res = await api.member.userInfoUsingGet();
      set(() => ({ userInfo: res.data }));
    } catch {
      set(() => ({ userInfo: {} }));
    }
  },
  setField: (key, value) => set({ [key]: value } as any),
});
