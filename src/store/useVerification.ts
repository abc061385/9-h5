import { AccountType } from "@/lib/const";
import { getIsDev } from "@/lib/utils";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface VerificationState extends BaseState<VerificationState> {
  account: string;
  faCheckId: string;
  accountType: AccountType; // 0手机 1邮箱
  reset: () => void;
}

export const useVerificationStore = create<VerificationState>()(
  persist(
    devtools(
      (set) => {
        return {
          account: "",
          accountType: AccountType.phone,
          reset: () => set({ faCheckId: "", account: "" }),
          setField: (key, value) => set({ [key]: value } as any),
        };
      },
      { enabled: getIsDev() },
    ),
    {
      name: "verification_store",
    },
  ),
);
