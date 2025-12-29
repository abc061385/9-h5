import { getIsDev } from "@/lib/utils";
import { CountryListType, SelectListType } from "@/views/meetup/type";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface FileType {
  fileName: string;
  fileUrl: string;
  thumbnailUrl?: string;
  fileType: 1 | 2 | 3;
}

interface MeetupState extends BaseState<MeetupState> {
  formData: Record<string, string>;
  formImageFileList: FileType[];
  formVideoFileList: FileType[];
  formArrangeImageFileList: FileType[];
  formNeedLecturer: string;
  formIsAgreement: boolean;
  formSiteType: string;
  formContactType: SelectListType;
  formPrefixId: CountryListType;
}

export const useMeetupStore = create<MeetupState>()(
  devtools(
    (set) => {
      return {
        formData: {},
        formNeedLecturer: "",
        formIsAgreement: false,
        formSiteType: "",
        formContactType: "",
        formPrefixId: "",
        formImageFileList: [
          { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 1 },
          { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 1 },
        ],
        formArrangeImageFileList: [
          { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 3 },
          { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 3 },
        ],
        formVideoFileList: [
          { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 2 },
          { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 2 },
          { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 2 },
        ],
        setField: (key, value) => set({ [key]: value }),
      };
    },
    { enabled: getIsDev() },
  ),
);
