// import { navigateTo, routerMap } from "@/i18n/navigation";
import { getIsDev } from "@/lib/utils";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type ChainEnum = {
  protocolType: string;
  minWithdrawal: number;
  maxWithdrawal: number;
  withdrawalFeeType: string;
  withdrawalFeeConfig: number;
};

type WithdrawForm = {
  currencyCode: string;
  chainEnum: ChainEnum;
  XRPTag: string;
  withdrawAddress: string;
  withdrawAmount: number;
};

interface WithdrawalState extends BaseState<WithdrawalState> {
  formState: WithdrawForm;
}

export const useUserStore = create<WithdrawalState>()(
  persist(
    devtools(
      (set) => {
        return {
          setField: (key, value) => set({ [key]: value }),
        };
      },
      { enabled: getIsDev() },
    ),
    {
      name: "withdraw-store",
    },
  ),
);
