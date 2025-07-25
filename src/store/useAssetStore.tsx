import { api } from "@/api";
import { getIsDev } from "@/lib/utils";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AssetState extends BaseState<AssetState> {
  balanceList: AssetsList[];
  getBalanceList: () => Promise<void>;
}

export const useAssetStore = create<AssetState>()(
  persist(
    devtools(
      (set) => {
        return {
          banalceList: [],
          getBalanceList: async () => {
            const { data } = await api.wallet.listUsingPost();
            set(() => ({ balanceList: data?.wallet || [] }));
          },
        };
      },
      { enabled: getIsDev() }
    ),
    {
      name: "verification_store",
    }
  )
);
