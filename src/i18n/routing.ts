import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: [
    "en",
    "zh-Hans",
    "zh-Hant",
    // "id-ID", // 印尼语
    "ja-JP",
    "ko-KR",
    "ms-MY",
    "th-TH",
    "vi-VN",
    "hi-IN",
    "it-IT",
    "de-DE",
    "fr-FR",
    "pt-PT",
    "es-ES",
  ],

  // Used when no locale matches
  defaultLocale: "en",
  // localePrefix: "as-needed",
});

export const SupportedLanguages = [
  { lang: "en", label: "English" }, // 英语
  { lang: "zh-Hans", label: "简体中文" }, // 简体中文
  { lang: "zh-Hant", label: "繁體中文" }, // 繁体中文
  { lang: "th-TH", label: "ไทย" }, // 泰语
  { lang: "vi-VN", label: "Tiếng Việt" }, // 越南语
  { lang: "ja-JP", label: "日本語" }, // 日语
  { lang: "ko-KR", label: "한국어" }, // 韩语
  { lang: "ms-MY", label: "Bahasa Melayu" }, // 马来语
  { lang: "pt-PT", label: "Português" }, // 葡萄牙语
  { lang: "hi-IN", label: "हिन्दी" }, // 印地语
  { lang: "de-DE", label: "Klicken" }, // 德语（German）
  { lang: "it-IT", label: "Clicca" }, // 意大利语 (Italian)
  { lang: "fr-FR", label: "Cliquez" }, // 法语（French）
  { lang: "pt-PT", label: "Clique" }, // 葡萄牙语（Portuguese）
  { lang: "es-ES", label: "Haz clic" }, // 西班牙语（Spanish）
];

export const APILang = {
  en: "en",
  "zh-Hans": "zh-cn",
  "zh-Hant": "zh-tw",
  "it-IT": "it",
  "ja-JP": "ja",
  "ko-KR": "ko",
  "ms-MY": "ms",
  "pt-PT": "pt",
  "th-TH": "th",
  "vi-VN": "vi",
  "hi-IN": "hi",
};

// 客服国际化语言映射
export const CustomerSupportLang = {
  en: "en-US",
  "zh-Hans": "zh-CN",
  "zh-Hant": "zh-HK",
  "it-IT": "it",
  "ja-JP": "ja-JP",
  "ko-KR": "ko",
  "ms-MY": "en-US",
  "pt-PT": "pt",
  "th-TH": "th-TH",
  "vi-VN": "vi-VN",
  "hi-IN": "en-US",
};
