import { getIsDev } from "@/lib/utils";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface FundState extends BaseState<FundState> {
  buyData?: FundBuyType;
  pledgeDays?: PledgeType;
  usdtFirstIs?: boolean;
}

export const useFundStore = create<FundState>()(
  devtools(
    (set) => {
      return {
        buyData: {},
        pledgeDays: {},
        usdtFirstIs: false,
        setField: (key, value) => set({ [key]: value }),
      };
    },
    { enabled: getIsDev() }
  )
);
