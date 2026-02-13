"use client";

import { api } from "@/api";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { useTrans } from "@/hooks/useTrans";

const AboutUsView = () => {
  const t = useTrans();

  // api.cms.getByTypeUsingGet
  const { data } = useRequestQuery(
    api.nineIndex.privacyPolicy.getPrivacyPolicy,
    { type: 4 },
  );
  const detail = data?.data || {};

  return (
    <ViewLayout
      header={<HeaderWithBack title={t("关于我们")} algin="center" />}
    >
      <div
        className="p-content text-sm !bg-bg"
        dangerouslySetInnerHTML={{
          __html: detail?.["content"] || "",
        }}
      />
    </ViewLayout>
  );
};

export default AboutUsView;
