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
  resultPageType: "smart" | "normal";
  coinLogoMap: { [key: string]: string };
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
          coinLogoMap: {},
          chainList: [],
          depositCoinItem: {},
          depositChainItem: {},
          incomeWithdrawAmount: "",
          resultPageType: "normal",
          getBalanceList: async () => {
            const { data } = await api.wallet.listUsingPost();
            set(() => ({ balanceList: data?.wallet || [] }));
          },
          getCoinList: async () => {
            const { data } = await api.currencySettings.protocolListUsingGet1();
            const coinList = Array.isArray(data) ? data : [];
            const coinLogoMap = {} as { [key: string]: string };
            coinList.forEach((item) => {
              coinLogoMap[item?.currencyCode?.toUpperCase()] = item.logo;
            }, coinLogoMap);
            set(() => ({
              coinList,
              coinLogoMap,
            }));
          },
          getChainList: async () => {
            const { data } = await api.currencySettings.pageUsingGet1({
              currencyCode: get().depositCoinItem.currencyCode,
            });
            set(() => ({
              chainList: Array.isArray(data) ? data : [],
            }));
          },
          setField: (key, value) => set({ [key]: value }),
        };
      },
      { enabled: getIsDev() },
    ),
    {
      name: "assets_store",
    },
  ),
);
