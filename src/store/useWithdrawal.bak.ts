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

export type WithdrawForm = {
  currencyCode: string;
  chainEnum: ChainEnum;
  XRPTag: string;
  withdrawAddress: string;
  withdrawAmount: string;
};

interface WithdrawalState extends BaseState<WithdrawalState> {
  formState: WithdrawForm;
  resetFormState: () => void;
  clear: () => void;
}

export const defaultFormState = {
  currencyCode: "USDT",
  chainEnum: {
    protocolType: "",
    minWithdrawal: 0,
    maxWithdrawal: 0,
    withdrawalFeeType: "",
    withdrawalFeeConfig: 0,
  },
  XRPTag: "",
  withdrawAmount: "0",
  withdrawAddress: "",
};
export const useWithdrawalStore = create<WithdrawalState>()(
  persist(
    devtools(
      (set, get) => {
        return {
          formState: defaultFormState,
          resetFormState: () => {
            set(() => ({ formState: defaultFormState }));
          },
          clear: () => {
            get().resetFormState();
          },
          setField: (key, value) => set({ [key]: value }),
        };
      },
      { enabled: getIsDev() }
    ),
    {
      name: "withdraw-store",
    }
  )
);
