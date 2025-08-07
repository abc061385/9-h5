import { api } from "@/api";
import { getIsDev } from "@/lib/utils";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AssetState extends BaseState<AssetState> {
  balanceList: AssetsList[];
  coinList: CryptoAsset[];
  depositCoinItem: CryptoAsset;
  chainList: ChainList[];
  depositChainItem: ChainList;
  incomeWithdrawAmount: string;
  getBalanceList: () => Promise<void>;
  getCoinList: () => Promise<void>;
  formatBalance: (value: string | number, coin: string) => Promise<void>;
  getChainList: () => Promise<void>;
}

export const useAssetStore = create<AssetState>()(
  persist(
    devtools(
      (set, get) => {
        return {
          balanceList: [],
          coinList: [],
          chainList: [],
          depositCoinItem: {},
          depositChainItem: {},
          incomeWithdrawAmount: "",
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
          getChainList: async () => {
            const { data } = await api.currencySettings.pageUsingGet({
              currencyCode: get().depositCoinItem.currencyCode,
            });
            set(() => ({
              chainList: Array.isArray(data) ? data : [],
            }));
          },
          setField: (key, value) => set({ [key]: value }),
        };
      },
      { enabled: getIsDev() }
    ),
    {
      name: "assets_store",
    }
  )
);
