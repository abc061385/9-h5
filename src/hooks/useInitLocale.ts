import { use } from "react";
import { setRequestLocale } from "next-intl/server";

export default function useInitLocale(params: LocaleParams): string {
  const { locale } = use(params);
  setRequestLocale(locale);
  return locale;
}
