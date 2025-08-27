"use client";

import { api } from "@/api";
import ViewLayout from "@/components/layout";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { useLocale } from "next-intl";
import BaseImage from "@/components/base-image";
import { routerMap, useRouter } from "@/i18n/navigation";
import { langType } from "@/views/news";
import { HeaderWithBack } from "@/components/header-with-back";
import { useTrans } from "@/hooks/useTrans";

const FAQIntroductionView = () => {
  const locale = useLocale();
  const t = useTrans();
  const { push } = useRouter();

  const { data } = useRequestQuery(api.cms.getByTypeUsingGet, { type: 5 });
  const detail = data?.data || {};

  return (
    <ViewLayout
      header={<HeaderWithBack title={t("平台介绍")} algin="center" />}
    >
      <div className="flex justify-center mt-[60px] mb-[48px]">
        <BaseImage
          src="/images/common/1024x1024.png"
          className="size-[80px] cursor-pointer"
          onClick={() => push(routerMap.home)}
        />
      </div>
      <div
        className="p-content text-sm"
        dangerouslySetInnerHTML={{
          __html: detail?.["content" + (langType[locale] || "En")] || "",
        }}
      ></div>
    </ViewLayout>
  );
};

export default FAQIntroductionView;
