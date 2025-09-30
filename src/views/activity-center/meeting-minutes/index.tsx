"use client";

import BaseImage from "@/components/base-image";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import HorizontalTabs, { TabItem } from "@/components/tabs/horizontal-tabs";
import { useTrans } from "@/hooks/useTrans";
import { routerMap, useRouter } from "@/i18n/navigation";
import { createAxiosInstance, ApiResponse } from "@/lib/axios";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface CountryListType {
  holdCountry: string;
  countryId: number;
}

const MeetingMinutesView = () => {
  const t = useTrans();
  const api = createAxiosInstance("/app");
  const { replace, push } = useRouter();
  const searchParams = useSearchParams();
  const [tabsValue, setTabsValue] = useState<number>(0);

  const [countryList, setCountryList] = useState<TabItem[]>([]);
  const [countryData, setCountryData] = useState<ActivityDataType>();

  const getList = useCallback(async () => {
    try {
      const res: ApiResponse<CountryListType[]> = await api.get(
        "/global-activity-country/list"
      );
      if (res.code === 200) {
        const data: CountryListType[] = res.data || [];
        const newList = data?.map((v) => ({
          label: v.holdCountry,
          value: v.countryId,
        }));
        setCountryList(newList || []);
      }
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getActivityList = useCallback(async (value: number) => {
    try {
      const res: ApiResponse<ActivityDataType> = await api.get(
        "/global-activity/country/activity",
        {
          params: { countryId: value },
        }
      );
      if (res.code === 200) {
        setCountryData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!tabsValue) return;
    getActivityList(tabsValue);
  }, [getActivityList, tabsValue]);

  useEffect(() => {
    getList();
  }, [getList]);

  useEffect(() => {
    if (searchParams.get("id")) {
      setTabsValue(Number(searchParams.get("id")));
    }
  }, [searchParams]);

  const handleTabChange = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("id", id);
    setTabsValue(Number(id));
    replace(`?${params.toString()}`);
  };

  return (
    <ViewLayout
      theme="dark"
      heightFull
      header={
        <HeaderWithBack
          title={t("meetingMinutes")}
          algin="center"
          theme="dark"
        />
      }
      className="h-full overflow-auto no-scrollbar"
    >
      <div className="p-content text-white overflow-hidden">
        <HorizontalTabs
          tabs={countryList}
          value={tabsValue}
          type="border"
          borderClassName="bg-white"
          activeClassName="!text-white"
          className="!text-text5"
          wrapClassName="gap-6"
          onChange={(e) => handleTabChange(e.toString())}
        />
        <div className="flex justify-between items-center gap-4 my-6">
          <BaseImage
            src={countryData?.flagUrl || ""}
            className="size-10 rounded-full overflow-hidden"
          />
          <div className="flex-1 flex flex-col font-medium">
            <span className="text-lg leading-6">
              {countryData?.holdCountry || "--"}
            </span>
            <span className="text-sm leading-4">{t("activityCenter")}</span>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <span className="text-xs text-text5">{t("establishmentTime")}</span>
            <span className="text-sm">{countryData?.establishTime || "-"}</span>
          </div>
        </div>
        <p className="text-sm leading-5">{countryData?.description || "--"}</p>
        <div className="h-[1px] bg-text3 my-6"></div>
        <h3 className="font-medium text-lg leading-6">{t("meeting")}</h3>
        {countryData?.activityList?.map((v, i) => {
          return (
            <div key={i} className="mt-6">
              <BaseImage
                src={
                  v.attachmentList.find((v) => v.fileType === 1)
                    ?.fileUrl || ""
                }
                className="w-full h-[148px] rounded-lg overflow-hidden"
                onClick={() =>
                  push(
                    `${routerMap.meetingMinutesDetail}?id=${v.countryId}&venueId=${v.venueId}`
                  )
                }
              />
              <div className="text-sm leading-4 mt-4 flex justify-between items-center">
                <span>{v.eventTime}</span>
                <span>{v.address}</span>
              </div>
            </div>
          );
        })}
      </div>
    </ViewLayout>
  );
};
export default MeetingMinutesView;
