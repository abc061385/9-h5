import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "zh-Hans", "zh-Hant"],

  // Used when no locale matches
  defaultLocale: "en",
  // localePrefix: "as-needed",
});

export const SupportedLanguages = [
  { lang: "en", label: "English" },
  { lang: "zh-Hans", label: "简体中文" },
  { lang: "zh-Hant", label: "繁體中文" },
];
