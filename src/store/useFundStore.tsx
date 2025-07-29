import { getIsDev } from "@/lib/utils";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface FundState extends BaseState<FundState> {
  buyData?: FundBuyType;
}

export const useFundStore = create<FundState>()(
  persist(
    devtools(
      (set) => {
        return {
          buyData: {},
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
