"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import { useTrans } from "@/hooks/useTrans";
import { useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { NewsDataType } from "../type";
import { langType } from "..";
import ViewLayout from "@/components/layout";

const NewsDetailView = () => {
  const t = useTrans();
  const { back } = useRouter();
  const locale = useLocale();
  const [newsDetail, setNewsDetail] = useState<NewsDataType>();
  useEffect(() => {
    const detail = localStorage.getItem("newsDetail");
    if (detail) {
      setNewsDetail(JSON.parse(detail));
      return;
    }
    return back();
  }, [back]);
  return (
    <ViewLayout
      heightFull
      header={<HeaderWithBack title={t("详情")} algin="center" />}
    >
      <div className="p-content">
        <h2 className="font-bold text-lg">
          {newsDetail?.["title" + (langType[locale] || "En")]}
        </h2>
        <div className="text-text4 mb-6 text-sm mt-1.5">
          {newsDetail?.createTime}
        </div>
        <div className="border-b border-assist1"></div>
        <div
          className="my-4 text-sm text-text4"
          dangerouslySetInnerHTML={{
            __html: newsDetail?.["content" + (langType[locale] || "En")] || "",
          }}
        ></div>
      </div>
    </ViewLayout>
  );
};
export default NewsDetailView;
