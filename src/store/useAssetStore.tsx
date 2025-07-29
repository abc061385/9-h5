import { api } from "@/api";
import { getIsDev } from "@/lib/utils";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AssetState extends BaseState<AssetState> {
  balanceList: AssetsList[];
  coinList: CryptoAsset[];
  getBalanceList: () => Promise<void>;
  getCoinList: () => Promise<void>;
  formatBalance: (value: string | number, coin: string) => Promise<void>;
}

export const useAssetStore = create<AssetState>()(
  devtools(
    (set) => {
      return {
        balanceList: [],
        coinList: [],
        getBalanceList: async () => {
          const { data } = await api.wallet.listUsingPost();
          set(() => ({ balanceList: data?.wallet || [] }));
        },
        getCoinList: async () => {
          const { data } = await api.currencySettings.protocolListUsingGet();
          set(() => ({
            coinList: Array.isArray(data) ? data : [],
          }));
        },
      };
    },
    { enabled: getIsDev() }
  )
);
