import { getIsDev } from "@/lib/utils";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface FileType {
  fileName: string;
  fileUrl: string;
  thumbnailUrl?: string;
  fileType: 1 | 2;
}

interface StudioState extends BaseState<StudioState> {
  formData: Record<string, string>;
  formImageFileList: FileType[];
  formVideoFileList: FileType[];
  formNeedLecturer: string;
  formIsAgreement: boolean;
  formSiteType: string;
}

export const useStudioStore = create<StudioState>()(
  devtools(
    (set) => {
      return {
        formData: {},
        formNeedLecturer: "",
        formIsAgreement: false,
        formSiteType: "",
        formImageFileList: [
          { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 1 },
          { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 1 },
        ],
        formVideoFileList: [
          { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 1 },
          { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 1 },
        ],
        setField: (key, value) => set({ [key]: value }),
      };
    },
    { enabled: getIsDev() }
  )
);
