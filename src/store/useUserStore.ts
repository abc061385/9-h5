import { api } from "@/api";
import { navigateTo, routerMap } from "@/i18n/navigation";
import { getIsDev } from "@/lib/utils";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useWithdrawalStore } from "./useWithdrawal";
import Platform from "@/lib/platfrom";
import Bridge from "@/lib/dsBridge";

interface LoginState extends BaseState<LoginState> {
  userInfo: UserInfo;
  token: string;
  logOut: () => void;
  fetchUserInfo: () => Promise<void>;
  subAccount: string;
}

export const useUserStore = create<LoginState>()(
  persist(
    devtools(
      (set, get) => {
        return {
          userInfo: {},
          token: "",
          subAccount: "",
          logOut() {
            set({ userInfo: {}, token: "" });
            navigateTo(routerMap.login);
            useWithdrawalStore.getState().clear();
            window.localStorage.removeItem("token");
          },
          fetchUserInfo: async () => {
            if (!get().token) {
              if (Platform.isInApp()) {
                Bridge.jumpTo("/login");
              } else {
                navigateTo(routerMap.login);
              }
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
