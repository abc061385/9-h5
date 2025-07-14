"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useTrans } from "@/hooks/useTrans";
const BannerBox = () => {
  const t = useTrans();
  return (
    <div>
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
            "swiper-pagination-bullet !rounded-[18px] !w-1.5 !h-1 transition-all duration-300 ease-in-out",
          bulletActiveClass:
            "swiper-pagination-bullet-active !bg-primary !w-3.5",
        }}
      >
        <SwiperSlide>
          <div className="flex items-center justify-between py-6">
            <div className="font-[860] w-[221px]">
              <h2 className="text-lg">{t("公司")}</h2>
              <h3 className="text-lg text-primary">{t("资本连接")}</h3>
              <p className="text-xs text-[#61616E] font-[510]">
                {t("公司简介")}
              </p>
            </div>
            <div className="w-[110px] h-[110px] relative">
              <Image src={"/images/home/home_banner.png"} alt={""} fill />
            </div>
          </div>
        </SwiperSlide>
        <div className="custom-pagination absolute bottom-0 left-0 w-full flex justify-center items-center"></div>
      </Swiper>
    </div>
  );
};

export default BannerBox;
