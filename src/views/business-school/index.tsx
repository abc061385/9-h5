"use client";

import BaseImage from "@/components/base-image";
import { HeaderWithBack } from "@/components/header-with-back";
import { Icon } from "@/components/icon";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
import { routerMap, useRouter } from "@/i18n/navigation";
import { APILang } from "@/i18n/routing";
import { createAxiosInstance, ApiResponse } from "@/lib/axios";
import Bridge from "@/lib/dsBridge";
// import Platform from "@/lib/platfrom";
import { useLocale } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { useBack } from "@/hooks/useBack";
const BusinessSchoolView = () => {
  const t = useTrans();
  const api = createAxiosInstance("/app");
  const locale = useLocale();
  const { push } = useRouter();
  const back = useBack();

  const [meetTypeList, setMeetTypeList] = useState<BusinessCollegeMeetType[]>();

  const getList = useCallback(async () => {
    const res: ApiResponse<{ list: BusinessCollegeMeetType[] }> = await api.get(
      "/business-college-meet-type/page-list",
    );
    setMeetTypeList(res?.data?.list || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getList();
  }, [getList]);

  useEffect(() => {
    Bridge.setFull(true);
  }, []);

  return (
    <ViewLayout
      header={
        <HeaderWithBack
          title={t("businessSchool")}
          algin="center"
          onClick={() => back()}
        />
      }
      heightFull
      className="h-full overflow-auto no-scrollbar"
    >
      <div className="h-[148px] relative">
        <BaseImage
          src="/images/activity/center-banner.png"
          className="w-full h-full"
        />
        <h3 className="absolute text-xl font-bold w-40 top-13 left-6 text-white">
          {t("businessSchool")}
        </h3>
      </div>

      <div className="p-content">
        <div className="text-sm border-b border-bg3 pb-6">
          <p>{t("businessSchoolDesc1")}</p>
          <p className="my-6">{t("businessSchoolDesc2")}</p>
          <p>{t("businessSchoolDesc3")}</p>
        </div>
        {meetTypeList?.map((v) => {
          return (
            <div key={v.id} className="mt-6 pb-6 border-b border-bg3">
              <h3 className="mb-6 flex items-center justify-between">
                <span className="font-bold text-xl">{v.meetName}</span>
                <span
                  className="text-sm"
                  onClick={() =>
                    push(
                      `${routerMap.businessSchoolPreviousHighlights}?id=${v.id}`,
                    )
                  }
                >
                  {t("seeMore")}{" "}
                  <Icon name="right-enter" className="w-1.5 h-2.5" />
                </span>
              </h3>
              <video
                src={v.fileUrl}
                controls
                className="h-[180px] w-full rounded-lg"
              ></video>

              <div
                className="overflow-hidden text-ellipsis"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                }}
              >
                <div
                  className="text-sm mt-4"
                  dangerouslySetInnerHTML={{
                    __html:
                      v?.i18nList?.find(
                        (v) =>
                          v.language ===
                          (APILang as Record<string, string>)[locale],
                      )?.meetDesc ||
                      v?.i18nList?.find((v) => v.language === "en")?.meetDesc ||
                      "",
                  }}
                ></div>
              </div>
            </div>
          );
        })}
        <h3 className="font-bold text-xl my-6">{t("journey")}</h3>
        <h4 className="font-medium text-xl mb-6">{t("mainHeading")}</h4>
        <p className="text-sm mb-6">{t("mainDescription")}</p>
        <p className="font-medium text-sm mb-6">{t("mainDescription1")}</p>
        <button
          className="btn btn-primary1 w-full h-12 mb-4 mt-10"
          onClick={() => push(routerMap.studio)}
        >
          {t("learnMore")}
        </button>
        <button
          className="btn btn-primary w-full h-12"
          onClick={() => {
            // if (Platform.isInApp()) {
            //   Bridge.jumpTo("/activitys");
            // } else {
            push(routerMap.activity);
            // }
          }}
        >
          {t("registerEvent")}
        </button>
      </div>
    </ViewLayout>
  );
};

export default BusinessSchoolView;
