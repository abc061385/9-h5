"use client";

import { useCallback, useState } from "react";
import { api } from "@/api";
import { HeaderWithBack } from "@/components/header-with-back";
import { useTrans } from "@/hooks/useTrans";
import { routerMap, useRouter } from "@/i18n/navigation";
import { NewsDataType } from "./type";
import { useLocale } from "next-intl";
import { Icon } from "@/components/icon";
import { InfiniteVirtuosoList } from "@/components/infinite-scroll";
import ViewLayout from "@/components/layout";

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

  const [pageSize] = useState(15);

  const getList = useCallback(
    async (page: number) => {
      const { data } = await api.cms.pageAnnouncementUsingGet({
        pageNo: page,
        pageSize: pageSize,
      });
      const newData = data?.list || [];
      return {
        data: newData,
        hasMore: page < data.total / pageSize,
      };
    },
    [pageSize]
  );

  return (
    <ViewLayout
      header={<HeaderWithBack title={t("消息中心")} algin="center" />}
      heightFull
    >
      <div className="p-content h-full flex flex-col">
        <div>
          <button className="btn border-none bg-bg3 inline-flex justify-between mb-4 text-base font-normal">
            <Icon name="news-icon" className="w-4 h-4 mr-1" />
            {t("公告")}
          </button>
        </div>
        <div className="grow">
          <InfiniteVirtuosoList<NewsDataType>
            fetchData={getList}
            columns={1}
            renderItem={(item: NewsDataType) => (
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
    </ViewLayout>
  );
};

export default NewsView;
