"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import { Icon } from "@/components/icon";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
import { SupportedLanguages } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { useRouter, routerMap } from "@/i18n/navigation";

const LangView = () => {
  const t = useTrans();
  const locale = useLocale();
  const router = useRouter();
  return (
    <ViewLayout
      header={
        <HeaderWithBack title={t("languageSelector.title")} algin="center" />
      }
    >
      <div className="p-content pt-6">
        {SupportedLanguages.map((v) => {
          return (
            <div
              key={v.lang}
              className={cn(
                "mb-10 font-bold flex items-center justify-between",
                locale === v.lang && "text-primary"
              )}
              onClick={() => {
                router.push(routerMap.user, { locale: v.lang });
              }}
            >
              <span>{v.label}</span>

              {locale === v.lang && <Icon name="check-l" />}
            </div>
          );
        })}
      </div>
    </ViewLayout>
  );
};
export default LangView;
