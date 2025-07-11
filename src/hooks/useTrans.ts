import { useTranslations } from "next-intl";

export const useTrans = (namespace?: string) => {
  return useTranslations(namespace);
};
