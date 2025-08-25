"use client";

import { api } from "@/api";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { useTrans } from "@/hooks/useTrans";
import { langType } from "../news";
import { useLocale } from "next-intl";
import BaseImage from "@/components/base-image";
import { routerMap, useRouter } from "@/i18n/navigation";

const FAQView = () => {
  const t = useTrans();
  const locale = useLocale();
  const { push } = useRouter();

  const { data } = useRequestQuery(api.cms.getByTypeUsingGet, { type: 5 });
  const detail = data?.data || {};

  return (
    <ViewLayout
      header={
        <div className="p-content">
          <BaseImage
            src="/images/common/logo.svg"
            className="h-[31px] w-[91px] cursor-pointer"
            onClick={() => push(routerMap.home)}
          />
        </div>
      }
    >
      <div
        className="p-content text-sm"
        dangerouslySetInnerHTML={{
          __html: detail?.["content" + (langType[locale] || "En")] || "",
        }}
      ></div>
    </ViewLayout>
  );
};

export default FAQView;
