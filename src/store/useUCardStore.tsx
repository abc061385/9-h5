import { getIsDev } from "@/lib/utils";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UCardState extends BaseState<UCardState> {
  formData: Record<string, string>;
  formIsAgreement: boolean;
  step: number;
  formImageFileList: FileType[];
  formHoldImageFileList: FileType[];
}

export const useUCardStore = create<UCardState>()(
  devtools(
    (set) => {
      return {
        formData: {},
        formIsAgreement: false,
        step: 0,
        formImageFileList: [
          { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 1 },
          { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 1 },
        ],
        formHoldImageFileList: [
          { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 1 },
        ],
        setField: (key, value) => set({ [key]: value }),
      };
    },
    { enabled: getIsDev() }
  )
);
