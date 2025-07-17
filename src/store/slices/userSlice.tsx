import { api } from "@/api";
import type { StateCreator } from "zustand";

export interface UserSlice {
  userInfo: UserInfo;
  fetchUserInfo: () => Promise<void>;
}

export const createUserSlice: StateCreator<any, [], [], UserSlice> = (set) => ({
  userInfo: {},
  fetchUserInfo: async () => {
    try {
      const res = await api.member.userInfoUsingGet();
      set(() => ({ userInfo: res.data }));
    } catch (e) {
      set(() => ({ userInfo: null }));
    }
  },
});
