"use client";

import BaseImage from "@/components/base-image";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
import { utils } from "@/lib/utils";
import { useUserStore } from "@/store/useUserStore";
import { useMemo, useRef } from "react";
import StarIcon from "../vip/star-icon";
import { AvatarUploader } from "@/components/avatar-uploader";

const CertificateView = () => {
  const t = useTrans();
  const ref = useRef(null);
  const userInfo = useUserStore((s) => s.userInfo);
  const vipTagImg = useMemo(() => {
    const imgMap = {
      vip0: "",
      vip1: "/images/certificate/v1.png",
      vip2: "/images/certificate/v2.png",
      vip3: "/images/certificate/v3.png",
      vip4: "/images/certificate/v4.png",
      vip5: "/images/certificate/v5.png",
      vip6: "/images/certificate/v6.png",
      vip7: "/images/certificate/v7.png",
      vip8: "/images/certificate/v8.png",
      vip9: "/images/certificate/v9.png",
    } as { [key in string]: string };
    return imgMap[`vip${userInfo.vipLevel || 0}`];
  }, [userInfo]);
  // const currentImg = useMemo(() => {
  //   return userInfo.cardBackgroundUrl;
  // }, [userInfo]);

  // const userName = useMemo(() => {
  //   return userInfo?.emailAccount || userInfo?.bindEmail || userInfo?.tel;
  // }, [userInfo]);
  const starText = useMemo(() => {
    if (userInfo?.highestVipStar && userInfo?.highestVipStar > 0) {
      return t("my_highest_level_star", {
        star: userInfo?.highestVipStar,
      });
    }
    return "";
  }, [userInfo, t]);

  return (
    <ViewLayout
      heightFull
      className="bg-black"
      header={
        <HeaderWithBack
          title={t("level_certificate")}
          algin="center"
          theme="dark"
        />
      }
    >
      <div className="size-full pb-6">
        <div className="relative" ref={ref}>
          <BaseImage src="/images/certificate/bg.png" className="w-full h-[626px]" />
          <div className="absolute top-[30px] z-10 flex justify-between items-start pl-[24px] pr-[24px] w-full">
            <BaseImage
                src="/images/common/logo.svg"
                className="h-[34px] w-[90px] cursor-pointer"
              />
            <div className="text-white text-right min-w-[80px]">
              <div className="text-sm">{t("my_level")}</div>
              <div className="text-2xl font-bold flex items-center justify-end">
                {(userInfo?.vipLevel || 0) > 0
                  ? `VIP${userInfo.vipLevel}`
                  : t("user.normalUser")}
                <StarIcon level={userInfo?.vipLevel || 0} star={userInfo.star} />
              </div>
              <BaseImage
                src={vipTagImg}
                className="size-[74px] cursor-pointer"
              />
            </div>
          </div>
          <div className="absolute top-[212px] left-1/2 translate-x-[-50%]">

            {/* 居中头像（相对于父 .relative 容器） */}
            <div className="absolute left-[-4px] top-[32px] z-20 transform -translate-x-1/2">
              <AvatarUploader className="size-[164px]" showIcon={true} />
            </div>

            {/* 如果还需要保留 header 装饰图，可放在居中头像上方 */}
            <div className="absolute left-1/2 top-[0] z-10 transform -translate-x-1/2">
              <BaseImage src="/images/certificate/header.png" className="w-[215px] h-[203px]" />
            </div>
          </div>
          <div className="absolute left-[50%] bottom-[140px]  translate-x-[-50%] z-10 text-white">
            <div className="text-xl font-medium">{userInfo.invitationCode}</div>
          </div>
          <div className="absolute left-0 bottom-[70px] z-50 text-white w-full flex flex-col items-center">
            <div className="text-xl font-bold text-center leading-[1]">
              {t("my_highest_level", {
                vip: `VIP${userInfo?.highestVipLevel}`,
              })}
              {starText}
            </div>
            <div className="text-xl font-bold text-center leading-[1]">
              {t("my_level_slogan")}
            </div>
          </div>
        </div>
        <div className="w-full p-6 bg-black">
          <button
            className="w-full btn h-[48px] btn-primary flex-1"
            onClick={() => {
              if (ref.current) {
                utils.handleCapture(
                  ref.current,
                  `download_${userInfo.invitationCode}.png`,
                );
              }
              // if (ref.current) {
              //   utils.handleShare(ref.current, `share_${userName}.png`, () => {
              //   });
              // }
            }}
          >
            {t("download_and_share")}
          </button>
        </div>
      </div>
    </ViewLayout >
  );
};

export default CertificateView;
