import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useTrans } from "@/hooks/useTrans";
import BaseImage from "@/components/base-image";
import { formatThousand } from "@/lib/utils";
import StarIcon from "./star-icon";
import { useUserStore } from "@/store/useUserStore";

const VipBannerBox = () => {
  const t = useTrans();
  const userInfo = useUserStore((s) => s.userInfo);
  console.log(userInfo)
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
          <div className="rounded-2xl py-4.5 px-4 font-bold relative">
            <div className="relative z-1 text-white">
              <h2 className="text-xs text-[rgba(255,255,255,0.7)]">
                {t("目前团队投资总额")}
              </h2>
              <div className="mb-13">
                <span className="text-[26px]">
                  {formatThousand(userInfo?.totalTeamInvestment || 0)}
                </span>
                <span className="text-xs">USDT</span>
              </div>
              <div className="text-[rgba(255,255,255,0.7)] text-xs">
                {t("当前等级")}
              </div>
              <div className="flex items-center">
                {userInfo.vipLevel === 0 ? (
                  t("user.normalUser")
                ) : (
                  <>
                    <span className="mr-1">VIP{userInfo.vipLevel}</span>
                    <StarIcon
                      star={userInfo.star}
                      level={userInfo.vipLevel || 0}
                    />
                  </>
                )}
              </div>
            </div>
            <BaseImage
              src="/images/vip/vip-banner.png"
              className="w-full h-full absolute left-0 top-0 z-0"
            />
            <div className="z-1 absolute right-3 top-3 text-center">
              <BaseImage
                src={`/images/vip/icon-vip${userInfo.vipLevel}.svg`}
                className="w-[82px] h-[75px]"
              />
              <span className="text-white flex items-center justify-center">
                VIP{userInfo.vipLevel}{" "}
                <StarIcon star={userInfo.star} level={userInfo.vipLevel || 0} />
              </span>
            </div>
          </div>
        </SwiperSlide>

        <div className="custom-pagination absolute bottom-0 left-0 w-full flex justify-center items-center"></div>
      </Swiper>
    </div>
  );
};
export default VipBannerBox;
