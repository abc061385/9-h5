import { getIsDev } from "@/lib/utils";
import { CountryListType } from "@/views/meetup/type";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface SelectListType {
  code: string;
  label: string;
}

interface UCardState extends BaseState<UCardState> {
  formData: Record<string, string>;
  formData1: Record<string, string>;
  formData2: Record<string, string>;
  formIsAgreement: boolean;
  step: number;
  formImageFileList: FileType[];
  formHoldImageFileList: FileType[];
  formCountry: SelectListType;
  formIdType?: SelectListType;
  formCardType: SelectListType;
  formCurrencies: SelectListType[];
  cardTypes: SelectListType[];
  countries: SelectListType[];
  currencies: SelectListType[];
  idTypes: SelectListType[];
  formPrefixId: CountryListType;
  formatBirthDate?: number;
  countryPhoneList: CountryListType[];
  formStatus: string;
}

export const useUCardStore = create<UCardState>()(
  devtools(
    (set) => {
      return {
        formData: {},
        formData1: {},
        formData2: {},
        formIsAgreement: false,
        step: 0,
        formCountry: {},
        formIdType: {},
        formCurrencies: [],
        formPrefixId: {
          code: "HK",
          country: "香港(中国)",
          id: 48,
          phonePrefix: "+852",
        },
        formCardType: {},
        formatBirthDate: undefined,
        formImageFileList: [
          { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 1 },
          { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 1 },
        ],
        formHoldImageFileList: [
          { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 1 },
        ],
        cardTypes: [],
        countries: [],
        currencies: [],
        idTypes: [],
        countryPhoneList: [],
        formStatus: "",
        setField: (key, value) => set({ [key]: value }),
      };
    },
    { enabled: getIsDev() }
  )
);
