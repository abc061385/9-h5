"use client";
import BaseImage from "@/components/base-image";
import { Drawer } from "@/components/drawer";
import { Icon } from "@/components/icon";
import ViewLayout from "@/components/layout";
import { routerMap, usePathname, useRouter } from "@/i18n/navigation";
import { SupportedLanguages } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/useUserStore";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

export default function IndexView() {
  const t = useTranslations();
  const { token } = useUserStore();
  const { push } = useRouter();
  const locale = useLocale();
  const pathname = usePathname();

  const [langSelectOpen, setLangSelectOpen] = useState(false);

  return (
    <ViewLayout heightFull>
      <div
        className="p-content h-full flex flex-col pb-15 relative"
        style={{
          background: "url(/images/star-bg.png)",
          backgroundSize: "100% 100%",
        }}
      >
        <BaseImage
          src={"/images/logo-white.svg"}
          className="w-44 h-22 absolute z-10 left-[50%] translate-x-[-50%] top-14"
        />
        <div
          className="absolute top-6 right-6 flex items-center text-white"
          onClick={() => setLangSelectOpen(true)}
        >
          <span className="mr-2 font-medium">
            {SupportedLanguages.find((v) => v.lang === locale)?.label || locale}
          </span>
          <Icon name="language-white" className="size-5" />
        </div>
        <div className="flex-1"></div>
        <h2
          className="text-[28px] font-bold  text-center leading-[32px]
        text-5xl tracking-wide
         bg-gradient-to-b from-[#FFF3C4] via-[#E0B65C] to-[#C9972B]
         bg-clip-text text-transparent
         drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]

        "
        >
          {t("home.welcome")}
        </h2>
        <h2
          className="text-[28px] font-bold  text-center leading-[32px]
                text-5xl tracking-wide
         bg-gradient-to-b from-[#FFF3C4] via-[#E0B65C] to-[#C9972B]
         bg-clip-text text-transparent
         drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]

        "
        >
          {t("home.investmentPlatform")}
        </h2>
        <p className="font-medium leading-[20px] text-lg text-white mt-6 text-center">
          {t("home.subtitle")}
        </p>
        <p className="font-medium leading-[20px] text-lg text-white mt-1 mb-14 text-center">
          {t("home.aiAcceleratesWealth")}
        </p>
        <button
          className="w-full px-10 py-3 
          rounded-full font-semibold text-black
         bg-gradient-to-r from-[#F2B84B] via-[#F9D976] to-[#F4A83D]
         shadow-[0_8px_20px_rgba(0,0,0,0.35)]
         hover:brightness-105 active:brightness-95
         transition
          "
          onClick={() => {
            if (!token) return push(routerMap.login);
            push(routerMap.home);
          }}
        >
          {t("home.startNow")}
        </button>
        <Drawer
          open={langSelectOpen}
          title={t("selectLanguage")}
          className="h-auto"
          onChange={setLangSelectOpen}
        >
          <ul className="max-h-[400px] overflow-y-auto no-scrollbar">
            {SupportedLanguages.map((item, index) => {
              return (
                <li
                  key={`${item.lang}_${index}`}
                  className={cn([
                    "border-b border-border2 py-4",
                    "flex justify-between items-center",
                    locale === item.lang ? "font-medium" : "",
                  ])}
                  onClick={() => {
                    push(pathname, { locale: item.lang });
                    setLangSelectOpen(false);
                  }}
                >
                  {item.label}
                  {locale === item.lang ? (
                    <Icon name="duigou-primary" className="w-4 h-3" />
                  ) : null}
                </li>
              );
            })}
          </ul>
          <button
            className="btn btn-outline w-full mt-6"
            onClick={() => setLangSelectOpen(false)}
          >
            {t("common.confirm")}
          </button>
        </Drawer>
      </div>
    </ViewLayout>
  );
}
