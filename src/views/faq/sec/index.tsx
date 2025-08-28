"use client";

import { api } from "@/api";
import ViewLayout from "@/components/layout";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { useLocale } from "next-intl";
import { langType } from "@/views/news";
import { HeaderWithBack } from "@/components/header-with-back";

const FAQSECView = () => {
  const locale = useLocale();

  const { data } = useRequestQuery(api.cms.getByTypeUsingGet, { type: 7 });
  const detail = data?.data || {};

  return (
    <ViewLayout
    heightFull
      header={<HeaderWithBack title={"SEC License"} algin="center" />}
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
