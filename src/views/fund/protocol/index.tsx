"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/api";
import ViewLayout from "@/components/layout";
import { HeaderWithBack } from "@/components/header-with-back";
import { useTrans } from "@/hooks/useTrans";
import { langType } from "@/views/news";
import { useLocale } from "next-intl";

const FundProtocolView = () => {
  const t = useTrans();
  const locale = useLocale();
  const [detail, setDetail] = useState<{ [x: string]: string }>();
  const getDetail = useCallback(async () => {
    const { data } = await api.cms.getByTypeUsingGet({ type: 2 });
    setDetail(data);
  }, []);

  useEffect(() => {
    getDetail();
  }, [getDetail]);
  return (
    <ViewLayout
      header={
        <HeaderWithBack
          title={t(detail?.title || "common.loading")}
          algin="center"
        />
      }
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
export default FundProtocolView;
