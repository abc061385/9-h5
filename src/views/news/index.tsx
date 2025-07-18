"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/api";
import BaseImage from "@/components/base-image";
import { HeaderWithBack } from "@/components/header-with-back";
import { InfiniteList } from "@/components/infinite-list";
import { useTrans } from "@/hooks/useTrans";
import { useRouter } from "@/i18n/navigation";
import { NewsDataType } from "./type";
import { useLocale } from "next-intl";

export const langType: {
  [key: string]: string;
} = {
  "zh-Hans": "ZhCn",
  "zh-Hant": "ZhTw",
  en: "En",
};

const NewsView = () => {
  const { push } = useRouter();
  const t = useTrans();
  const locale = useLocale();

  const [list, setList] = useState<NewsDataType[]>([]);

  const getList = useCallback(async () => {
    const { data } = await api.cms.pageAnnouncementUsingGet({
      pageNo: 1,
      pageSize: 15,
    });
    setList(data?.list || []);
  }, []);

  useEffect(() => {
    getList();
  }, [getList]);

  return (
    <>
      <HeaderWithBack title={t("消息中心")} algin="center" />
      <div className="p-content">
        <button className="btn btn-primary flex justify-between mb-4">
          {t("公告")}
          <BaseImage
            src="/images/news/news_icon.png"
            className="w-8 h-8 ml-1.5"
          />
        </button>
        <div className="h-[75vh]">
          <InfiniteList<NewsDataType, object>
            data={list}
            fetchMore={async (_index) => {
              console.log(_index);
              return [];
            }}
            itemContent={(_, item) => (
              <div
                key={item.id}
                className="bg-secondary rounded-lg p-2 mt-2 font-bold"
                onClick={() => {
                  localStorage.setItem("newsDetail", JSON.stringify(item));
                  push("/news/detail");
                }}
              >
                <div className="flex items-center">
                  <BaseImage
                    src="/images/news/list_logo.png"
                    className="w-5.5 h-5.5 mr-1"
                  />
                  <div className="flex-1 font-bold text-xs">
                    {item["title" + langType[locale]]}
                  </div>
                </div>
                <div
                  className="text-text2 my-2 text-xs"
                  style={{
                    display: " -webkit-box",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: "1",
                    WebkitBoxOrient: "vertical",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: item["content" + langType[locale]],
                  }}
                ></div>
                <div className="text-text2 text-xs">
                  {t("时间")}：{item.createTime}
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default NewsView;
