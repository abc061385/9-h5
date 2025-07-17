import { getIsDev } from "@/lib/utils";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface LoginState extends BaseState<LoginState> {
  email: string;
  password: string;
  code: string;
  reset: () => void;
}

export const useLoginStore = create<LoginState>()(
  persist(
    devtools(
      (set) => {
        return {
          email: "",
          password: "",
          code: "",
          reset: () => set({ email: "", code: "" }),
          setField: (key, value) => set({ [key]: value } as any),
        };
      },
      { enabled: getIsDev() },
    ),
    {
      name: "login-store",
    },
  ),
);
