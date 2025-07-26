import { PreviousPageType } from "@/lib/const";
import { getIsDev } from "@/lib/utils";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface SettingState extends BaseState<SettingState> {
  googleCode: string;
  addressInfo: AddressList;
  clearGoogleCode: () => void;
  clearAddressInfo: () => void;
  previousPageType: PreviousPageType;
}

export const useSettingStore = create<SettingState>()(
  persist(
    devtools(
      (set) => {
        return {
          googleCode: "",
          previousPageType: "",
          addressInfo: {},
          clearGoogleCode: () => {
            set(() => ({ googleCode: "", previousPageType: "" }));
          },
          clearAddressInfo: () => {
            set(() => ({
              addressInfo: {},
            }));
          },
          setField: (key, value) => set({ [key]: value }),
        };
      },
      { enabled: getIsDev() },
    ),
    {
      name: "setting_store",
    },
  ),
);
