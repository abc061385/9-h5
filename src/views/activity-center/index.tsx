"use client";

import BaseImage from "@/components/base-image";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import ListStepBox from "./list-step";
import { routerMap, useRouter } from "@/i18n/navigation";
import { useTrans } from "@/hooks/useTrans";
// import Platform from "@/lib/platfrom";
// import Bridge from "@/lib/dsBridge";

const ActivityCenterView = () => {
  const { push } = useRouter();
  const t = useTrans();
  return (
    <ViewLayout
      theme="dark"
      heightFull
      header={
        <HeaderWithBack
          algin="center"
          title={t("globalActivityCenter")}
          theme="dark"
        />
      }
      className="h-full overflow-auto no-scrollbar"
    >
      <BaseImage
        src="/images/activity/center-banner.png"
        className="w-full h-50"
      />
      <div className="p-content text-white">
        <div className="text-sm leading-5 py-10 border-b border-text3">
          <p>{t("offlineCentersIntro")}</p>
          <p className="my-10">{t("centersPurpose")}</p>
          <p>{t("futureFintechBelief")}</p>
        </div>

        <ListStepBox />
        <p className="my-10 text-sm leading-5">{t("partnershipProgress")}</p>
        <button
          className="btn btn-primary w-full h-12 mb-10"
          onClick={() => {
            // if (Platform.isInApp()) {
            //   Bridge.jumpTo("/activitys");
            // } else {
            push(routerMap.activity);
            // }
          }}
        >
          {t("signUpForEvent")}
        </button>
      </div>
    </ViewLayout>
  );
};

export default ActivityCenterView;
