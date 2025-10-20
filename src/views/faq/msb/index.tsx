"use client";

import { api } from "@/api";
import ViewLayout from "@/components/layout";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { HeaderWithBack } from "@/components/header-with-back";
import { useTrans } from "@/hooks/useTrans";

const FAQMSBView = () => {
  const t = useTrans();

  const { data } = useRequestQuery(
    api.nineIndex.privacyPolicy.getPrivacyPolicy,
    { type: 6 },
  );
  const detail = data?.data || {};

  return (
    <ViewLayout
      heightFull
      header={<HeaderWithBack title={t("msb_license")} algin="center" />}
    >
      <div
        className="p-content"
        dangerouslySetInnerHTML={{
          __html: detail?.["content"] || "",
        }}
      ></div>
    </ViewLayout>
  );
};

export default FAQMSBView;
