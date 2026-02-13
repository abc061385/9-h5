"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/api";
import ViewLayout from "@/components/layout";
import { HeaderWithBack } from "@/components/header-with-back";
import { useTrans } from "@/hooks/useTrans";
import { useSearchParams } from "next/navigation";
import Bridge from "@/lib/dsBridge";
import { PrivacyPolicyRespDTO } from "@/api/NineIndexClient";

const ProtocolView = () => {
  const t = useTrans();
  const params = useSearchParams();
  const [detail, setDetail] = useState<PrivacyPolicyRespDTO>();

  const getDetail = useCallback(async () => {
    if (!params.get("type")) return;
    const { data } = await api.nineIndex.privacyPolicy.getPrivacyPolicy({
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
      className="relative"
      header={
        <HeaderWithBack
          title={detail?.title || t("common.loading")}
          algin="center"
        />
      }
    >
      <div className="absolute top-11 left-0 size-full overscroll-y-auto">
        <div
          className="p-content text-sm bg-bg"
          dangerouslySetInnerHTML={{
            __html: detail?.["content"] || "",
          }}
        ></div>
      </div>
    </ViewLayout>
  );
};
export default ProtocolView;
