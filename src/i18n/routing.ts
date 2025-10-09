import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: [
    // "id-ID", // 印尼语
    "en",
    "zh-Hans",
    "zh-Hant",
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
    // 新增的5个语言用英文
    "nl-NL",
    "no-NO",
    "sv-SE",
    "ro-RO",
    "cs-CZ",
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
  { lang: "hi-IN", label: "हिन्दी" }, // 印地语
  { lang: "de-DE", label: "Deutsch" }, // 德语（German）
  { lang: "it-IT", label: "Italiano" }, // 意大利语 (Italian)
  { lang: "fr-FR", label: "Français" }, // 法语（French）
  { lang: "pt-PT", label: "Português" }, // 葡萄牙语（Portuguese）
  { lang: "es-ES", label: "Español" }, // 西班牙语（Spanish）
  // 新增的5个语言用先不展示
  { lang: "nl-NL", label: "Nederlands" }, // 荷兰语 (Nederlands)
  { lang: "no-NO", label: "Norsk" }, // 挪威语（Norsk）
  { lang: "sv-SE", label: "Svenska" }, //  瑞典语（Svenska）
  { lang: "ro-RO", label: "Română" }, // 罗马尼亚语（Română）
  { lang: "cs-CZ", label: "Čeština" }, // 捷克语（Čeština）
];

export const APILang = {
  en: "en",
  "zh-Hans": "zh-cn",
  "zh-Hant": "zh-tw",
  "ja-JP": "ja",
  "ko-KR": "ko",
  "ms-MY": "ms",
  "th-TH": "th",
  "vi-VN": "vi",
  "hi-IN": "hi",
  "de-DE": "de",
  "it-IT": "it",
  "fr-FR": "fr",
  "pt-PT": "pt",
  "es-ES": "es",
  // 新增的5个语言用英文
  "nl-NL": "en",
  "no-NO": "en",
  "sv-SE": "en",
  "ro-RO": "en",
  "cs-CZ": "en",
};

// 客服国际化语言映射
export const CustomerSupportLang = {
  en: "en-US",
  "zh-Hans": "zh-CN",
  "zh-Hant": "zh-HK",
  "ja-JP": "ja-JP",
  "ko-KR": "ko",
  "ms-MY": "en-US",
  "th-TH": "th-TH",
  "vi-VN": "vi-VN",
  "hi-IN": "en-US",
  "de-DE": "de",
  "fr-FR": "fr",
  "it-IT": "it",
  "pt-PT": "pt",
  "es-ES": "es",
  // 新增的5个语言用英文
  "nl-NL": "en-US",
  "no-NO": "en-US",
  "sv-SE": "en-US",
  "ro-RO": "en-US",
  "cs-CZ": "en-US",
};

// 客服语言选项（根据需要选择并设置）
// 'en-US': 'English',       英语
// 'zh-CN': '中文',          简体中文
// 'zh-HK': '繁體中文',      繁体中文
// 'ru-RU': 'русский',      俄语
// 'th-TH': 'ภาษาไทย',     泰语
// 'vi-VN': 'Tiếng Việt',   越南语
// 'mn': 'Монгол',          蒙古语
// 'ja-JP': 'やまと',        日语
// 'fr': 'français',        法语
// 'pt': 'português',       葡萄牙语
// 'es': 'español',         西班牙语
// 'ar': 'العربية',         阿拉伯语
// 'de': 'Deutsch'           德语
//  ro: 'română', // 罗马尼亚语
//  pl: 'polski', // 波兰语
//  id: 'Bahasa Indonesia', // 印度尼西亚语
//  ko: '한국어', // 韩语
//  nl: 'Nederlands', // 荷兰语
//  da: 'Dansk', // 丹麦语
//  it: 'Italiano', // 意大利语
//  tr: 'Türkçe', // 土耳其语
//  bn: 'বাংলা', // 孟加拉语
