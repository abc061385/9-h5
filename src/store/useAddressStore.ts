import { getIsDev } from "@/lib/utils";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AddressState extends BaseState<AddressState> {
  cb: (arg0: AddressList) => void;
}

export const useAddressStore = create<AddressState>()(
  persist(
    devtools(
      () => {
        return {
          cb: (item: AddressList) => {
            return item;
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
