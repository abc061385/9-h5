import { getIsDev } from "@/lib/utils";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface FundState extends BaseState<FundState> {
  buyData?: FundBuyType;
  pledgeDays?: PledgeType;
  isUsdtFirst?: boolean;
}

export const useFundStore = create<FundState>()(
  persist(
    devtools(
      (set) => {
        return {
          buyData: {},
          isUsdtFirst: false,
          pledgeDays: {},
          setField: (key, value) => set({ [key]: value }),
        };
      },
      { enabled: getIsDev() }
    ),
    {
      name: "fund_store",
    }
  )
);
