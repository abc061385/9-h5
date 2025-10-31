// import { navigateTo, routerMap } from "@/i18n/navigation";
import { api } from "@/api";
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
interface AddrItem {
  addr: string;
  coin: string;
  id: number;
  memberId: number;
  protocol: string;
  remark: string;
  systemType: number;
  type: string;
}

export type WithdrawForm = {
  currencyCode: string;
  chainEnum: ChainEnum;
  XRPTag: string;
  withdrawAddress: string;
  withdrawAmount: string;
};

interface WithdrawalState extends BaseState<WithdrawalState> {
  formState: WithdrawForm;
  addressMap: {
    [key in string]?: AddrItem;
  };
  resetFormState: () => void;
  getAddrMap: () => Promise<void>;
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
          getAddrMap: async () => {
            try {
              const res = await api.withdrawAddress.memberAddressListUsingGet();
              const _addressMap = {} as { [key in string]: AddrItem };
              res.data.forEach((item: AddrItem) => {
                _addressMap[item.protocol] = item;
              });
              set(() => ({ addressMap: _addressMap }));
            } catch {}
          },
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
