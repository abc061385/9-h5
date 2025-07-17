import { getIsDev } from "@/lib/utils";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface LoginState extends BaseState<LoginState> {
  userInfo: UserInfo;
  getToken: () => string;
  logOut: () => void;
}

export const useUserStore = create<LoginState>()(
  persist(
    devtools(
      (set, get) => {
        return {
          userInfo: {},
          logOut() {
            set({ userInfo: {} });
          },
          getToken() {
            return get().userInfo?.token || "";
          },
          setField: (key, value) => set({ [key]: value } as any),
        };
      },
      { enabled: getIsDev() },
    ),
    {
      name: "user-store",
    },
  ),
);
