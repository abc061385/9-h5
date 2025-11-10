import { api } from "@/api";
import { AddressPreviousPageType, GAPreviousPageType } from "@/lib/const";
import { getIsDev } from "@/lib/utils";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface SettingState extends BaseState<SettingState> {
  googleCode: string;
  addressInfo: AddressList;
  clearGoogleCode: () => void;
  clearAddressInfo: () => void;
  gaPreviousPageType: GAPreviousPageType;
  addressPreviousPageType: AddressPreviousPageType;
  withdrawNetwork: string;
  platformInfo: InvestmentRecord
  getPlatformInfo: () => Promise<void>
}

export const useSettingStore = create<SettingState>()(
  persist(
    devtools(
      (set) => {
        return {
          googleCode: "",
          gaPreviousPageType: "",
          addressInfo: {},
          addressPreviousPageType: "",
          withdrawNetwork: "",
          platformInfo: {},
          clearGoogleCode: () => {
            set(() => ({ googleCode: "", gaPreviousPageType: "", withdrawNetwork: "" }));
          },
          clearAddressInfo: () => {
            set(() => ({
              addressInfo: {},
              addressPreviousPageType: "",
              withdrawNetwork: ""
            }));
          },
          getPlatformInfo: async () => {
            try {
              const res = await api.platformConfig.infoUsingGet1();
              set(() => ({ platformInfo: res.data as InvestmentRecord }))
            } catch {}
          },
          setField: (key, value) => set({ [key]: value }),
        };
      },
      { enabled: getIsDev() }
    ),
    {
      name: "setting_store",
    }
  )
);
