"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/api";
import { HeaderWithBack } from "@/components/header-with-back";
import { InfiniteList } from "@/components/infinite-list";
import { useTrans } from "@/hooks/useTrans";
import { routerMap, useRouter } from "@/i18n/navigation";
import { NewsDataType } from "./type";
import { useLocale } from "next-intl";
import { Icon } from "@/components/icon";

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
        <button className="btn border-none bg-bg3 flex justify-between mb-4 text-base font-normal">
          <Icon name="news-icon" className="w-4 h-4 mr-1" />
          {t("公告")}
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
                className="pb-4 mt-4 text-sm border-b border-assist1 "
                onClick={() => {
                  localStorage.setItem("newsDetail", JSON.stringify(item));
                  push(routerMap.newsDetail);
                }}
              >
                <div className="flex items-center">
                  <div className="flex-1 text-xs mb-2">
                    {item["title" + langType[locale]]}
                  </div>
                </div>
                <div className="text-text2 text-xs">{item.createTime}</div>
              </div>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default NewsView;
