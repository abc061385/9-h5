"use client";

import ViewLayout from "@/components/layout";
import BannerBox from "./banner";
// import CardsBox from "./cards";
import FundBox from "./fund";
import HomeHeaderBox from "./header";
import BaseImage from "@/components/base-image";
import { Icon } from "@/components/icon";
import { routerMap, useRouter } from "@/i18n/navigation";
import toast from "react-hot-toast";
import { useTrans } from "@/hooks/useTrans";
import SmartChatBox from "./smart-chat";
// import { useRequestQuery } from "@/hooks/useRequestQuery";
// import { api } from "@/api";
import { useMemo } from "react";
import { FixedComponent } from "@/components/fixed";
// import { useLocationHref } from "@/hooks/useLocationHref";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { api } from "@/api";
import ImageQueueModal from "@/components/image-queue-modal";

export default function HomeView() {
  const t = useTrans();
  const { push } = useRouter();
  const { data: popups } = useRequestQuery(api.getPopups, { platform: "all" });
  console.log(popups?.data);
  // const { goToLuckyActivity } = useLocationHref();
  // const { data } = useRequestQuery(api.userActivity.getActivityListUsingGet, {
  //   pageNo: 1,
  //   pageSize: 1000,
  //   activityType: 1,
  // });
  const moduleList = useMemo(() => {
    // const list = data?.data.list || [];
    // const luckyId = list[0]?.id || null;
    return [
      {
        title: "Lucky Wheel",
        icon: "lucky-wheel.svg",
        path: "",
        // goto: () => goToLuckyActivity(luckyId),
      },
      {
        title: "Community Project",
        icon: "com-project.svg",
        path: "",
      },
    ];
  }, []);
  return (
    <ViewLayout
      dock={true}
      header={<HomeHeaderBox />}
      className="h-max md-pc:h-full pt-15.5 pb-20"
      heightFull
    >
      <BannerBox />
      <FixedComponent className="bottom-[100px] right-[16px] size-[56px] z-50">
        <BaseImage
          src="/images/home/AIBall.png"
          className="size-[56px] cursor-pointer"
          onClick={() => push(routerMap["helper-ai"])}
        />
      </FixedComponent>
      <div className="px-content">
        <FundBox />
        <div className="hidden">
          {/* <div className="grid grid-cols-2 gap-2 mt-6"> */}
          {moduleList.map((v, i) => {
            return (
              <div
                key={i}
                className="flex items-center justify-between gap-1 rounded-lg border border-border2 p-4"
                onClick={() => {
                  // if (v?.goto) {
                  //   if (v?.goto()) toast.error(t("notOpenYet"));
                  //   return;
                  // }
                  if (v.path) return push(v.path);
                  toast.error(t("notOpenYet"));
                }}
              >
                <BaseImage
                  src={`/images/home/${v.icon}`}
                  className="w-8 h-8 min-w-8"
                />
                <span className="ml-2 text-sm font-medium flex-1">
                  {v.title}
                </span>
                <Icon name="right-enter" className="w-1.5 h-2.5 min-w-1.5" />
              </div>
            );
          })}
        </div>
        {/* <CardsBox /> */}
        <SmartChatBox />
      </div>

      {popups?.data ? (
        <ImageQueueModal
          images={popups?.data as unknown as { imageUrl: string }[]}
          keyName="imageUrl"
        />
      ) : null}
    </ViewLayout>
  );
}
