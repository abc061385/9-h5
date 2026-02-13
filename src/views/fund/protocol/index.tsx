"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/api";
import ViewLayout from "@/components/layout";
import { HeaderWithBack } from "@/components/header-with-back";
import { useTrans } from "@/hooks/useTrans";
import { PrivacyPolicyRespDTO } from "@/api/NineIndexClient";

const FundProtocolView = () => {
  const t = useTrans();
  const [detail, setDetail] = useState<PrivacyPolicyRespDTO>();
  const getDetail = useCallback(async () => {
    const { data } = await api.nineIndex.privacyPolicy.getPrivacyPolicy({
      type: 2,
    });
    setDetail(data);
  }, []);

  useEffect(() => {
    getDetail();
  }, [getDetail]);
  return (
    <ViewLayout
      className="relative"
      header={
        <HeaderWithBack
          title={t(detail?.title || "common.loading")}
          algin="center"
        />
      }
    >
      <div
        className="absolute top-11 left-0 size-full overscroll-y-auto p-content text-sm !bg-bg"
        dangerouslySetInnerHTML={{
          __html: detail?.["content"] || "",
        }}
      ></div>
    </ViewLayout>
  );
};
export default FundProtocolView;
