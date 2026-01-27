"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import { useTrans } from "@/hooks/useTrans";
import { useRouter } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { NewsDataType } from "../type";
import ViewLayout from "@/components/layout";
import Bridge from "@/lib/dsBridge";

const NewsDetailView = () => {
  const t = useTrans();
  const { back } = useRouter();
  const [newsDetail, setNewsDetail] = useState<NewsDataType>();
  useEffect(() => {
    const detail = localStorage.getItem("newsDetail");
    if (detail) {
      setNewsDetail(JSON.parse(detail));
      return;
    }
    return back();
  }, [back]);
  useEffect(() => {
    Bridge.setFull(true);
  }, []);
  return (
    <ViewLayout
      heightFull
      header={<HeaderWithBack title={t("详情")} algin="center" />}
    >
      <div className="p-content">
        <h2 className="font-bold text-lg">{newsDetail?.["title"]}</h2>
        <div className="text-text4 mb-6 text-sm mt-1.5">
          {newsDetail?.createTime}
        </div>
        <div className="border-b border-assist1"></div>
        <div
          className="my-4 text-sm text-text4"
          dangerouslySetInnerHTML={{
            __html: newsDetail?.["content"] || "",
          }}
        ></div>
      </div>
    </ViewLayout>
  );
};
export default NewsDetailView;
