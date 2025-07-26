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
          clearGoogleCode: () => {
            set(() => ({ googleCode: "", gaPreviousPageType: "" }));
          },
          clearAddressInfo: () => {
            set(() => ({
              addressInfo: {},
              addressPreviousPageType: "",
            }));
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
