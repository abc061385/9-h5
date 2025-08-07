import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: [
    "en",
    "zh-Hans",
    "zh-Hant",
    // "id-ID", // 印尼语
    "it-IT",
    "ja-JP",
    "ko-KR",
    "ms-MY",
    "pt-PT",
    "th-TH",
    "vi-VN",
    "hi-IN",
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
  { lang: "it-IT", label: "Italiano" }, // 意大利语
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
