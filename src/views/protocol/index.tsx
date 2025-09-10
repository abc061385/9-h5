"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/api";
import ViewLayout from "@/components/layout";
import { HeaderWithBack } from "@/components/header-with-back";
import { useTrans } from "@/hooks/useTrans";
import { langType } from "@/views/news";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import Bridge from "@/lib/dsBridge";

const ProtocolView = () => {
  const t = useTrans();
  const locale = useLocale();
  const params = useSearchParams();
  const [detail, setDetail] = useState<{ [x: string]: string }>();

  const getDetail = useCallback(async () => {
    if (!params.get("type")) return;
    const { data } = await api.cms.getByTypeUsingGet({
      type: Number(params.get("type")),
    });
    setDetail(data);
  }, [params]);

  useEffect(() => {
    getDetail();
  }, [getDetail]);

  useEffect(() => {
    Bridge.setFull(true);
  }, []);
  return (
    <ViewLayout
      header={
        <HeaderWithBack
          title={detail?.title || t("common.loading")}
          algin="center"
        />
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
export default ProtocolView;
