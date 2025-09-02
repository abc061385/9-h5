import React, { ReactNode, useState } from "react";
import { Icon } from "@/components/icon";
import { useTrans } from "@/hooks/useTrans";
import { routerMap, usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { SupportedLanguages } from "@/i18n/routing";
import { Drawer } from "@/components/drawer";
import { cn } from "@/lib/utils";
import { IconName } from "@/types/icons";

interface MenuType {
  icon: IconName;
  title: string;
  path: string;
  value?: string | ReactNode;
  click?: () => void;
}

interface MenuListType {
  title: string;
  list: MenuType[];
}

const ListBox = () => {
  const t = useTrans();
  const { push } = useRouter();
  const locale = useLocale();
  const pathname = usePathname();

  const [langSelectOpen, setLangSelectOpen] = useState(false);

  const menuList: MenuListType[] = [
    {
      title: t("accountSettings"),
      list: [
        {
          icon: "save",
          title: "user.securitySettings",
          path: routerMap.setting,
        },
        {
          icon: "accounts",
          title: "accountManagement",
          path: routerMap.accounts,
        },
      ],
    },
    {
      title: t("transactionSettings"),
      list: [
        {
          icon: "books",
          title: "user.addressBook",
          path: routerMap.settingAddress,
        },
      ],
    },
    {
      title: "Other Settings",
      list: [
        {
          icon: "card",
          title: "level_certificate",
          path: routerMap.certificate,
        },
        {
          icon: "language",
          title: "user.language",
          path: routerMap.lang,
          value:
            SupportedLanguages.find((v) => v.lang === locale)?.label || locale,
          click: () => setLangSelectOpen(true),
        },
        {
          icon: "about-us",
          title: "关于我们",
          path: routerMap.aboutUs,
        },
      ],
    },
  ];
  return (
    <div className="pt-5">
      <div>
        {menuList.map((item, index) => {
          return (
            <div
              key={index}
              className="border-b border-border2 pb-8 mb-8 last:mb-0 last:border-0"
            >
              <h4 className="text-sm text-text4 mb-6">{item.title}</h4>
              {item.list.map((v, i) => {
                return (
                  <div
                    key={index + "-" + i}
                    className="flex items-center justify-between mb-8 last:mb-0"
                    onClick={() => {
                      if (v.click) return v.click();
                      push(v.path);
                    }}
                  >
                    <Icon name={v.icon} className="size-5 mr-4" />
                    <span className="flex-1">{t(v.title)}</span>
                    <span className="text-text4 text-sm mr-2">{v.value}</span>
                    <Icon name="right-enter" className="w-1.5 h-2.5" />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
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
  );
};
export default ListBox;
