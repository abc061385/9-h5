"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useTrans } from "@/hooks/useTrans";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

const BannerBox = () => {
  const t = useTrans();
  const locale = useLocale();
  const { push } = useRouter();

  const [activityList, setActivityList] = useState<ActivityList[]>([]);

  useEffect(() => {
    getActivityList();
  }, []);

  const getActivityList = async () => {
    const { data } = await axios.get("/app/userActivity/getApiActivityList");
    const list = data?.data?.list || [];
    setActivityList(list);
  };
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      speed={800}
      spaceBetween={10}
      pagination={{
        el: ".custom-pagination",
        clickable: true,
        bulletClass:
          "swiper-pagination-bullet !rounded-none !w-3 !h-0.5 transition-all duration-300 ease-in-out",
        bulletActiveClass: "swiper-pagination-bullet-active !bg-primary",
      }}
      className="h-[174px]"
    >
      <SwiperSlide>
        <div className="flex h-full items-center justify-between bg-[url('/images/home/home_banner.png')] bg-contain bg-no-repeat p-content !py-7">
          <div>
            <h2 className="text-xl leading-6 mb-2.5 font-bold">{t("公司")}</h2>
            <p className="text-sm leading-3.5 w-[52%]">{t("公司简介")}</p>
          </div>
        </div>
      </SwiperSlide>

      {activityList.map((v, i) => {
        return (
          <SwiperSlide key={i}>
            <div onClick={() => push(`/activity/${v.id}`)}>
              <Image
                src={locale === "zh-Hans" ? v.bannerZh : v.bannerEn}
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                  position: "relative",
                }}
              />
            </div>
          </SwiperSlide>
        );
      })}
      <div className="custom-pagination absolute bottom-0 left-0 w-full flex justify-center items-center"></div>
    </Swiper>
  );
};

export default BannerBox;
