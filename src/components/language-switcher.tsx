"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import { SupportedLanguages } from "@/i18n/routing";
import { ChangeEvent } from "react";

type Props = {
  locale: string;
};

export function LanguageSwitcher({ locale }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    router.push(pathname, { locale: e.target.value });
  };

  return (
    <select value={locale} onChange={handleChange}>
      {SupportedLanguages.map((item, index) => {
        return (
          <option key={`${item.lang}_${index}`} value={item.lang}>
            {item.label}
          </option>
        );
      })}
    </select>
  );
}
