"use client";

import { api } from "@/api";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useLocationHref } from "@/hooks/useLocationHref";
import { useTrans } from "@/hooks/useTrans";
import { ShowIf } from "@/components/show-if";
import { ListNoData } from "@/components/nodata/list-nodata";
import { utils } from "@/lib/utils";
import Bridge from "@/lib/dsBridge";
import { useBack } from "@/hooks/useBack";

const ActivityView = () => {
  const locale = useLocale();
  const t = useTrans();
  const { goToActivity } = useLocationHref();
  const back = useBack();

  const [activityList, setActivityList] = useState<ActivityList[]>([]);
  const [loading, setLoading] = useState(true);

  const getActivityList = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.userActivity.getActivityListUsingGet({
        pageNo: 1,
        pageSize: 100,
      });
      if (res.code === 200) {
        setLoading(false);
        setActivityList(res.data?.list || []);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getActivityList();
  }, [getActivityList]);

  useEffect(() => {
    Bridge.setFull(true);
  }, []);
  return (
    <ViewLayout
      heightFull
      header={
        <HeaderWithBack
          title={t("activityCenter")}
          algin="center"
          onClick={() => back()}
        />
      }
    >
      <div className="p-content bg-bg">
        {
          <ShowIf
            condition={!loading}
            elseEl={<span className="loading flex mx-auto mt-10"></span>}
          >
            {activityList?.length ? (
              activityList.map((v) => {
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
                        __html: JSON.parse(v.title || "{}")[locale]
                          ? JSON.parse(v.title || "{}")[locale]
                          : JSON.parse(v.title || "{}")["en"],
                      }}
                    ></div>
                    <p>
                      {v?.startDate
                        ? utils.dayjs(v?.startDate).format("YYYY-MM-DD")
                        : null}
                    </p>
                  </div>
                );
              })
            ) : (
              <ListNoData />
            )}
          </ShowIf>
        }
      </div>
    </ViewLayout>
  );
};
export default ActivityView;
