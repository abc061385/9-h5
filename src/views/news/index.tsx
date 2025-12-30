"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/api";
import { HeaderWithBack } from "@/components/header-with-back";
import { useTrans } from "@/hooks/useTrans";
import { routerMap, useRouter } from "@/i18n/navigation";
import { Icon } from "@/components/icon";
import { InfiniteVirtuosoList } from "@/components/infinite-scroll";
import ViewLayout from "@/components/layout";
import { AnnouncementRespDTO } from "@/api/NineIndexClient";
import Bridge from "@/lib/dsBridge";
import { useBack } from "@/hooks/useBack";
import Tabs from "@/components/tabs/tabs";

export const langType: {
  [key: string]: string;
} = {
  "zh-Hans": "ZhCn",
  "zh-Hant": "ZhTw",
  en: "En",
};

const pageSize = 15;
const NewsView = () => {
  const { push } = useRouter();
  const t = useTrans();
  const back = useBack();
  const [tab, setTab] = useState(0);

  const getList = useCallback(async (page: number) => {
    const { data } = await api.nineIndex.announcement.getAnnouncementPage({
      pageNo: page.toString(),
      pageSize: pageSize.toString(),
    });
    const newData = data?.list || [];
    return {
      data: newData,
      hasMore: page < data.total / pageSize,
    };
  }, []);
  const getList1 = useCallback(async (page: number) => {
    const { data } = await api.getMemberMessageList({
      pageNo: page,
      pageSize: pageSize,
    });
    const newData = data?.list || [];
    return {
      data: newData,
      hasMore: page < data.total / pageSize,
    };
  }, []);
  useEffect(() => {
    Bridge.setFull(true);
  }, []);

  return (
    <ViewLayout
      header={
        <HeaderWithBack
          title={t("消息中心")}
          algin="center"
          onClick={() => back()}
        />
      }
      heightFull
    >
      <div className="p-content h-full flex flex-col">
        <div>
          <Tabs
            tabs={[
              {
                label: (
                  <span className="flex items-center justify-center mb-2">
                    <Icon name="news-icon" className="size-3.5 mr-1" />
                    {t("公告")}
                  </span>
                ),
                value: 0,
              },
              {
                label: (
                  <span className="flex items-center justify-center mb-2">
                    <Icon name="email-fill" className="w-4 h-4 mr-1" />
                    {t("站内信")}
                  </span>
                ),
                value: 1,
              },
            ]}
            value={tab}
            onChange={(e) => setTab(e as number)}
          ></Tabs>
        </div>
        <div className="grow">
          {tab === 0 ? (
            <InfiniteVirtuosoList<AnnouncementRespDTO>
              key="sc_0"
              fetchData={getList}
              columns={1}
              renderItem={(item: AnnouncementRespDTO) => (
                <div
                  key={item.id}
                  className="pb-4 mt-4 text-sm border-b border-assist1 "
                  onClick={() => {
                    localStorage.setItem("newsDetail", JSON.stringify(item));
                    push(routerMap.newsDetail);
                  }}
                >
                  <div className="flex items-center">
                    <div className="flex-1 text-xs mb-2">{item["title"]}</div>
                  </div>
                  <div className="text-text2 text-xs">{item.createTime}</div>
                </div>
              )}
            />
          ) : (
            <InfiniteVirtuosoList<AnnouncementRespDTO>
              key="sc_1"
              fetchData={getList1}
              columns={1}
              renderItem={(item: AnnouncementRespDTO) => (
                <div
                  key={item.id}
                  className="pb-4 mt-4 text-sm border-b border-assist1 "
                  onClick={() => {
                    api
                      .postMemberMessageChangeStatus({
                        id: item.id as number,
                      })
                      .then(() => {
                        localStorage.setItem(
                          "newsDetail",
                          JSON.stringify(item),
                        );
                        push(routerMap.newsDetail);
                      })
                      .catch(() => {
                        localStorage.setItem(
                          "newsDetail",
                          JSON.stringify(item),
                        );
                        push(routerMap.newsDetail);
                      });
                  }}
                >
                  <div className="flex justify-between">
                    <div>
                      <div className="flex items-center">
                        <div className="flex-1 text-xs mb-2">
                          {item["title"]}
                        </div>
                      </div>
                      <div className="text-text2 text-xs">
                        {item.createTime}
                      </div>
                    </div>
                    {item.status ? null : (
                      <div
                        aria-label="error"
                        className="status status-error bg-[#FF0A52]"
                      ></div>
                    )}
                  </div>
                </div>
              )}
            />
          )}
        </div>
      </div>
    </ViewLayout>
  );
};

export default NewsView;
