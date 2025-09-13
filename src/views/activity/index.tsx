"use client";

import { api } from "@/api";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useLocationHref } from "@/hooks/useLocationHref";
import { useTrans } from "@/hooks/useTrans";

const ActivityView = () => {
  const locale = useLocale();
  const t = useTrans();
  const { goToActivity } = useLocationHref();

  const [activityList, setActivityList] = useState<ActivityList[]>([]);

  const getActivityList = useCallback(async () => {
    try {
      const res = await api.userActivity.getActivityListUsingGet({
        pageNo: 1,
        pageSize: 100,
      });
      if (res.code === 200) {
        setActivityList(res.data?.list || []);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getActivityList();
  }, [getActivityList]);

  return (
    <ViewLayout
      header={<HeaderWithBack title={t("activityCenter")} algin="center" />}
    >
      <div className="p-content">
        {activityList.map((v) => {
          return (
            <div
              key={v.id}
              className="py-6 border-b border-border2 last:border-0"
              onClick={() => goToActivity(v.id.toString())}
            >
              <Image
                src={
                  ["zh-Hans", "zh-Hant"].indexOf(locale) !== -1
                    ? v.bannerZh
                    : v.bannerEn
                }
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                  position: "relative",
                }}
                className="rounded-xl"
              />

              <div
                className="whitespace-pre-wrap mt-4 line-clamp-3"
                dangerouslySetInnerHTML={{
                  __html: v.content ? JSON.parse(v.content)[locale] : "",
                }}
              ></div>
            </div>
          );
        })}
      </div>
    </ViewLayout>
  );
};
export default ActivityView;
