"use client";

import BaseImage from "@/components/base-image";
import { HeaderWithBack } from "@/components/header-with-back";
import { Icon } from "@/components/icon";
import ViewLayout from "@/components/layout";
import { Modal } from "@/components/modal";
import { useTrans } from "@/hooks/useTrans";
import { createAxiosInstance, ApiResponse } from "@/lib/axios";
import Bridge from "@/lib/dsBridge";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const PreviousHighlightsDetailView = () => {
  const locale = useLocale();

  const t = useTrans();
  const api = createAxiosInstance("/app");
  const searchParams = useSearchParams();

  const [reviewImageOpen, setReviewImageOpen] = useState(false);
  const [reviewImageSrc, setReviewImageSrc] = useState("");
  const [cityData, setCityData] = useState<ActivityCenterListType>();

  const getActivityList = useCallback(async (value: number) => {
    try {
      const res: ApiResponse<ActivityCenterListType> = await api.get(
        "/business-college/detail",
        {
          params: { id: value },
        }
      );
      if (res.code === 200) {
        setCityData(res.data);
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

  useEffect(() => {
    Bridge.setFull(true);
  }, []);

  return (
    <ViewLayout
      heightFull
      header={
        <HeaderWithBack
          title={`${t("meetingMinutes")} - ${cityData?.eventTime || ""}`}
          algin="center"
        />
      }
      className="h-full overflow-auto no-scrollbar"
    >
      <div className="p-content">
        <BaseImage
          src={
            cityData?.attachmentList?.find((v) => v.fileType === 1)?.fileUrl ||
            ""
          }
          className="w-full h-[148px] rounded-lg overflow-hidden"
        />
        <p
          className="text-sm leading-5 mt-6"
          dangerouslySetInnerHTML={{
            __html: cityData?.content
              ? JSON.parse(cityData.content || "{}")[locale]
                ? JSON.parse(cityData.content || "{}")[locale]
                : JSON.parse(cityData?.content || "{}").en
              : "--",
          }}
        ></p>
        <div className="h-[1px] bg-text3 my-6"></div>

        <h2 className="text-lg font-medium leading-6 mb-6">{t("liveVideo")}</h2>
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

        <h2 className="text-lg font-medium leading-6 mb-6">
          {t("onSitePhotos")}
        </h2>

        <div className="grid grid-cols-2 gap-2">
          {cityData?.attachmentList
            ?.filter((v) => v.fileType === 3)
            ?.map((v, i) => {
              return (
                <BaseImage
                  src={v.fileUrl}
                  key={i}
                  className="h-22 w-full rounded-md overflow-hidden"
                  onClick={() => {
                    setReviewImageOpen(true);
                    setReviewImageSrc(v.fileUrl);
                  }}
                />
              );
            })}
        </div>
      </div>
      <Modal
        close={false}
        open={reviewImageOpen}
        onClose={() => setReviewImageOpen(false)}
        wrapClassName="bg-transparent"
      >
        <div className="text-center">
          <BaseImage src={reviewImageSrc} className="w-full h-[180px] mt-5" />
          <Icon
            name="close"
            className="size-8 mt-4"
            onClick={() => setReviewImageOpen(false)}
          />
        </div>
      </Modal>
    </ViewLayout>
  );
};
export default PreviousHighlightsDetailView;
