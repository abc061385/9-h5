"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import { SupportedLanguages } from "@/i18n/routing";
import { useMemo, useState } from "react";
import { Drawer } from "./drawer";
import { cn } from "@/lib/utils";
import BaseImage from "./base-image";
import { useLocale } from "next-intl";

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange = (value: string) => {
    router.push(pathname, { locale: value });
    setOpen(false);
  };

  const currentLang = useMemo(() => {
    return SupportedLanguages.find((i) => i.lang === locale);
  }, [locale]);

  return (
    <div>
      <div onClick={() => setOpen(true)}>{currentLang?.label}</div>
      <Drawer open={open} title="" className="h-[80%]">
        <ul>
          {SupportedLanguages.map((item, index) => {
            return (
              <li
                key={`${item.lang}_${index}`}
                className={cn([
                  "py-4 border border-transparent border-b-border1",
                  "flex justify-between items-center",
                ])}
                onClick={() => handleChange(item.lang)}
              >
                {item.label}
                {locale === item.lang ? (
                  <BaseImage
                    className="w-[16px] h-[12px]"
                    src="/images/common/select.svg"
                  />
                ) : null}
              </li>
            );
          })}
        </ul>
      </Drawer>
    </div>
  );
}
