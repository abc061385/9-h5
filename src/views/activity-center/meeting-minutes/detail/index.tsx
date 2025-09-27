"use client";

import BaseImage from "@/components/base-image";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { createAxiosInstance, ApiResponse } from "@/lib/axios";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const MeetingMinutesDetailView = () => {
  const api = createAxiosInstance("/app");
  const searchParams = useSearchParams();

  const [cityData, setCityData] = useState<ActivityCenterListType>();

  const getActivityList = useCallback(async (value: number) => {
    try {
      const res: ApiResponse<ActivityDataType> = await api.get(
        "/global-activity/country/activity",
        {
          params: { countryId: value },
        }
      );
      if (res.code === 200) {
        const venueId = searchParams.get("venueId");
        const data = res.data.activityList.find(
          (v) => v.venueId?.toString() === venueId
        );
        setCityData(data);
      }
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!searchParams.get("id")) return;
    getActivityList(Number(searchParams.get("id")));
  }, [getActivityList, searchParams]);

  return (
    <ViewLayout
      theme="dark"
      header={
        <HeaderWithBack
          title={`Meeting Minutes - ${cityData?.address}`}
          algin="center"
          theme="dark"
        />
      }
    >
      <div className="p-content text-white">
        <BaseImage
          src={
            cityData?.attachmentList.find((v) => v.fileType === 1)?.fileUrl ||
            ""
          }
          className="w-full h-[148px] rounded-lg overflow-hidden"
        />
        <p className="text-sm leading-5 mt-6">
          {cityData?.activityDesc || "--"}
        </p>
        <div className="h-[1px] bg-text3 my-6"></div>

        <h2 className="text-lg font-medium leading-6 mb-6">Live video</h2>
        {cityData?.attachmentList
          ?.filter((v) => v.fileType === 2)
          ?.map((v, i) => {
            return (
              <video
                src={v.fileUrl}
                controls
                className="w-full h-45 rounded-lg mb-6"
                key={i}
              ></video>
            );
          })}

        <h2 className="text-lg font-medium leading-6 mb-6">Live video</h2>

        <div className="grid grid-cols-2 gap-2">
          {cityData?.attachmentList
            ?.filter((v) => v.fileType === 3)
            ?.map((v, i) => {
              return (
                <BaseImage
                  src={v.fileUrl}
                  key={i}
                  className="h-22 w-full rounded-md overflow-hidden"
                />
              );
            })}
        </div>
      </div>
    </ViewLayout>
  );
};
export default MeetingMinutesDetailView;
