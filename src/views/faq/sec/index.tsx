"use client";

import { api } from "@/api";
import ViewLayout from "@/components/layout";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { useLocale } from "next-intl";
import { langType } from "@/views/news";
import { HeaderWithBack } from "@/components/header-with-back";
import { useTrans } from "@/hooks/useTrans";

const FAQSECView = () => {
  const t = useTrans();
  const locale = useLocale();

  const { data } = useRequestQuery(api.cms.getByTypeUsingGet, { type: 7 });
  const detail = data?.data || {};

  return (
    <ViewLayout
      heightFull
      header={<HeaderWithBack title={t("sec_license")} algin="center" />}
    >
      <div
        className="p-content"
        dangerouslySetInnerHTML={{
          __html: detail?.["content" + (langType[locale] || "En")] || "",
        }}
      ></div>
    </ViewLayout>
  );
};

export default FAQSECView;
