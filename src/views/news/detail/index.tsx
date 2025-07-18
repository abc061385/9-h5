"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import { useTrans } from "@/hooks/useTrans";
import { useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { NewsDataType } from "../type";
import { langType } from "..";

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
    <>
      <HeaderWithBack title={t("详情")} algin="center" />
      <div className="p-content">
        <h2 className="font-bold">
          {newsDetail?.["title" + langType[locale]]}
        </h2>
        <div>{newsDetail?.createTime}</div>
        <div className="border-b border-dashed h-2 border-text2"></div>
        <div
          className="my-4 text-sm"
          dangerouslySetInnerHTML={{
            __html: newsDetail?.["content" + langType[locale]] || "",
          }}
        ></div>
      </div>
    </>
  );
};
export default NewsDetailView;
