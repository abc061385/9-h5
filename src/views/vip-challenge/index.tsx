"use client";

import BaseImage from "@/components/base-image";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import ChallengeRewardRules from "./rules";
import ChallengeStatusBox, { IntroduceType } from "./status";
import { routerMap, useRouter } from "@/i18n/navigation";
import { useTrans } from "@/hooks/useTrans";
import { useCallback, useEffect, useState } from "react";
import { createAxiosInstance, ApiResponse } from "@/lib/axios";
import Bridge from "@/lib/dsBridge";

const VIPLevelUpChallengeView = () => {
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
        />
      }
      heightFull
    >
      <BaseImage
        src="/images/vip-challenge/banner.png"
        className="w-full h-42 mt-2"
      />
      <div className="p-content">
        <h2 className="font-bold text-xl leading-5 mb-4">
          9M AI | {t("vipLevelChallenge")}
        </h2>
        <h3 className="font-medium text-sm leading-6">
          {t("eventTime")}: {t("longTermOpen")}
        </h3>
        <p className="text-text4 text-sm">({t("challengeTimeTips")})</p>

        <div className="divider"></div>

        <div>
          <h3 className="font-bold leading-6 mb-4">{t("eventIntro")}</h3>
          <p className="text-sm leading-5">
            {introduce?.raceIntroduce || t("eventMechanics")}
          </p>
        </div>

        <div className="divider"></div>

        <div>
          <h3 className="font-bold leading-6 mb-4">
            {t("participationMethod")}
          </h3>
          <p className="text-sm leading-5">{t("loginSteps")}</p>
          <p className="text-sm leading-5">{t("singleChallenge")}</p>
          <p className="text-sm leading-5">{t("nextChallengeRule")}</p>
        </div>

        <div className="divider"></div>

        <h3 className="font-bold leading-6 mb-4">
          {t("challengeRequirements")}
        </h3>
        <p className="text-sm leading-5">{t("requirementDetails")}</p>
        <p className="text-sm leading-5">{t("rewardDistribution")}</p>

        <div className="divider"></div>

        <h3 className="font-bold leading-6 mb-4">{t("specialReminder")}</h3>
        <p className="text-sm leading-5">{t("formalParticipation")}</p>
        <p className="text-sm leading-5">{t("downgradeRule")}</p>
        <p className="text-sm leading-5">{t("oneTimeChallenge")}</p>

        <div className="divider"></div>

        <ChallengeRewardRules />

        <div className="divider"></div>

        <h3 className="font-bold leading-6 mb-4">{t("rewardExplanation")}</h3>
        <p className="text-sm leading-5">{t("usdmDistribution")}</p>
        <p className="text-sm leading-5">{t("withdrawalOptions")}</p>
        <p className="text-sm leading-5">{t("physicalRewards")}</p>

        <div className="divider"></div>

        <h3 className="mb-6 font-medium text-primary leading-6">
          {t("callToAction")}
        </h3>
        <h3 className="font-medium leading-6">{t("usdmOpportunity")}</h3>

        <div className="divider"></div>

        <ChallengeStatusBox />
      </div>
    </ViewLayout>
  );
};

export default VIPLevelUpChallengeView;
