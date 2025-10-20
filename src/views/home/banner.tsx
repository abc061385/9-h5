"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useTrans } from "@/hooks/useTrans";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { api } from "@/api";
import { BannerRespDTO } from "@/api/NineIndexClient";
import { useRouter } from "@/i18n/navigation";

const BannerBox = () => {
  const t = useTrans();
  const { push } = useRouter();
  const locale = useLocale();
  const [bannerList, setBannerList] = useState<BannerRespDTO[]>();

  const getBannerList = useCallback(async () => {
    try {
      const res = await api.nineIndex.banner.getBanners({ platform: "all" });
      console.log(res);
      if (res.code === 200) {
        setBannerList(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getBannerList();
  }, [getBannerList]);

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
          "swiper-pagination-bullet !rounded-none !w-3 !h-0.5 transition-all duration-300 ease-in-out z-10",
        bulletActiveClass: "swiper-pagination-bullet-active !bg-primary",
      }}
      className="h-[178px]"
    >
      <SwiperSlide>
        <div className="flex h-full justify-between bg-[url('/images/home/home_banner.png')] bg-contain bg-no-repeat p-content !py-7">
          <div>
            <h2 className="text-xl leading-6 mb-2.5 font-bold">{t("公司")}</h2>
            <p className="text-sm leading-3.5 w-[55%] line-clamp-6">{t("公司简介")}</p>
          </div>
        </div>
      </SwiperSlide>
      {bannerList?.map((v) => {
        return (
          <SwiperSlide key={v.id}>
            <div
              onClick={() => {
                if (v?.linkUrl) {
                  const url = v.linkUrl as string;
                  if (/^https?:\/\//.test(url)) {
                    window.location.href = url.replace("{lang}", locale);
                  } else {
                    push(url);
                  }
                }
              }}
              className="h-[163px] overflow-hidden relative"
            >
              <Image
                src={v.imageUrl || ""}
                alt=""
                style={{
                  objectFit: "cover",
                }}
                fill
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
