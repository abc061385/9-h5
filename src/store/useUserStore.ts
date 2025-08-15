import { api } from "@/api";
import { navigateTo, routerMap } from "@/i18n/navigation";
import { getIsDev } from "@/lib/utils";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useWithdrawalStore } from "./useWithdrawal";

interface LoginState extends BaseState<LoginState> {
  userInfo: UserInfo;
  token: string;
  logOut: () => void;
  fetchUserInfo: () => Promise<void>;
}

export const useUserStore = create<LoginState>()(
  persist(
    devtools(
      (set, get) => {
        return {
          userInfo: {},
          token: "",
          logOut() {
            set({ userInfo: {}, token: "" });
            navigateTo(routerMap.login);
            useWithdrawalStore.getState().clear();
            window.localStorage.removeItem("token");
          },
          fetchUserInfo: async () => {
            if (!get().token) {
              navigateTo(routerMap.login);
              return;
            }
            try {
              const res = await api.member.userInfoUsingGet();
              set(() => ({ userInfo: res.data }));
            } catch {
              set(() => ({ userInfo: {} }));
            }
          },
          setField: (key, value) => set({ [key]: value }),
        };
      },
      { enabled: getIsDev() },
    ),
    {
      name: "user-store",
    },
  ),
);
