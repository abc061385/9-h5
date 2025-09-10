"use client";

import BaseImage from "@/components/base-image";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import ChallengeStatusBox, { IntroduceType } from "./status";
import { routerMap, useRouter } from "@/i18n/navigation";
import { useTrans } from "@/hooks/useTrans";
import { useCallback, useEffect, useState } from "react";
import { createAxiosInstance, ApiResponse } from "@/lib/axios";
import Bridge from "@/lib/dsBridge";
import { useBack } from "@/hooks/useBack";

const VIPLevelUpChallengeView = () => {
  const back = useBack();
  const api = createAxiosInstance("/app/");
  const t = useTrans();
  const { push } = useRouter();

  const [introduce, setIntroduce] = useState<IntroduceType>();

  const getIntroduce = useCallback(async () => {
    try {
      const res: ApiResponse<IntroduceType> = await api.get(
        "/level-race/introduce"
      );
      if (res.code === 200) {
        setIntroduce(res.data);
      }
    } catch (error) {
      console.log(error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getIntroduce();
  }, [getIntroduce]);

  useEffect(() => {
    Bridge.setFull(true);
  }, []);

  return (
    <ViewLayout
      header={
        <HeaderWithBack
          title={
            <div className="flex-1 flex justify-center items-center relative">
              <span></span>
              {t("vipChallengeTitle")}
              <span
                onClick={() => push(routerMap.VIPChallengeRecord)}
                className="absolute right-[-28px] font-medium text-base text-primary"
              >
                {t("records")}
              </span>
            </div>
          }
          algin="center"
          onClick={() => back()}
        />
      }
      heightFull
    >
      <BaseImage
        src="/images/vip-challenge/banner.png"
        className="w-full h-42 mt-2"
      />

      <div className="p-content">
        <div
          dangerouslySetInnerHTML={{
            __html: introduce?.raceIntroduce || "",
          }}
        ></div>
        <ChallengeStatusBox />
      </div>
    </ViewLayout>
  );
};

export default VIPLevelUpChallengeView;
