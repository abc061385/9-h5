"use client";

import BaseImage from "@/components/base-image";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import HorizontalTabs, { TabItem } from "@/components/tabs/horizontal-tabs";
import { routerMap, useRouter } from "@/i18n/navigation";
import { createAxiosInstance, ApiResponse } from "@/lib/axios";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

const PreviousHighlightsView = () => {
  const api = createAxiosInstance("/app");
  const searchParams = useSearchParams();
  const locale = useLocale();

  const { replace, push } = useRouter();

  const [tabsList, setTabsList] = useState<TabItem[]>([]);
  const [tabsValue, setTabsValue] = useState<number>(0);
  const [meetTypeList, setMeetTypeList] = useState<ActivityCenterListType[]>(
    []
  );
  const [meetPageList, setMeetPageList] = useState<BusinessCollegeMeetType[]>(
    []
  );

  const getTabsList = useCallback(async () => {
    const res: ApiResponse<{ list: BusinessCollegeMeetType[] }> = await api.get(
      "/business-college-meet-type/page-list"
    );
    const newList = res.data?.list.map((v) => ({
      label: v.meetName,
      value: v.id,
    }));
    setTabsList(newList || []);
    setMeetPageList(res?.data?.list || []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getTabsList();
  }, [getTabsList]);

  const getMeetTypeList = useCallback(async (value: number) => {
    const res: ApiResponse<{ list: ActivityCenterListType[] }> = await api.get(
      "/business-college/meet-type/list",
      {
        params: {
          meetTypeId: value,
        },
      }
    );
    setMeetTypeList(res?.data?.list || []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!tabsValue) return;
    getMeetTypeList(tabsValue);
  }, [getMeetTypeList, tabsValue]);

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

  const meetInfo = useMemo(() => {
    return meetPageList.find((v) => v.id === tabsValue);
  }, [meetPageList, tabsValue]);

  return (
    <ViewLayout
      header={<HeaderWithBack title="Previous highlights" algin="center" />}
      heightFull
      className="h-full overflow-auto no-scrollbar"
    >
      <div className="p-content">
        <HorizontalTabs
          tabs={tabsList}
          value={tabsValue}
          type="border"
          wrapClassName="gap-6"
          onChange={(e) => handleTabChange(e.toString())}
        />
        <h2 className="mt-6 font-bold text-xl">{meetInfo?.fullMeetName}</h2>
        <video
          src={meetInfo?.fileUrl}
          controls
          className="w-full h-45 rounded-lg my-4"
        ></video>
        <p className="text-sm mt-4">
          {meetInfo?.i18nList?.find((v) => v.language === locale)?.meetDesc}
        </p>
        <div className="h-[1px] bg-bg3 mt-6"></div>
        {meetTypeList?.map((v, i) => {
          return (
            <div key={i} className="mt-6">
              <BaseImage
                src={
                  v.attachmentList.find((v) => v.fileType === 1)
                    ?.thumbnailUrl || ""
                }
                className="w-full h-[148px] rounded-lg overflow-hidden"
                onClick={() =>
                  push(
                    `${routerMap.businessSchoolPreviousHighlightsDetail}?id=${v.id}`
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

export default PreviousHighlightsView;
