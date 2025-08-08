"use client";

import { api } from "@/api";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { useTrans } from "@/hooks/useTrans";
import { langType } from "../news";
import { useLocale } from "next-intl";

const AboutUsView = () => {
  const t = useTrans();
  const locale = useLocale();

  const { data } = useRequestQuery(api.cms.getByTypeUsingGet, { type: 4 });
  const detail = data?.data || {};

  return (
    <ViewLayout
      header={<HeaderWithBack title={t("关于我们")} algin="center" />}
    >
      <div
        className="p-content text-sm"
        dangerouslySetInnerHTML={{
          __html: detail?.["content" + langType[locale]] || "",
        }}
      ></div>
    </ViewLayout>
  );
};

export default AboutUsView;
