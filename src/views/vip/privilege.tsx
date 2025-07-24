import { useEffect } from "react";
import BaseImage from "@/components/base-image";
import { useTrans } from "@/hooks/useTrans";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/useUserStore";
import { useVipStore } from "@/store/useVipStore";

const PrivilegeBox = () => {
  const t = useTrans();
  const userInfo = useUserStore((s) => s.userInfo);
  const nextLevelInfo = useVipStore((s) => s.nextLevelInfo);
  const currentLevelInfo = useVipStore((s) => s.currentLevelInfo);
  const currentStartConfig = useVipStore((s) => s.currentStartConfig);
  const nextStartConfig = useVipStore((s) => s.nextStartConfig);
  const fetchNextConfig = useVipStore((s) => s.fetchNextConfig);

  useEffect(() => {
    if (userInfo.vipLevel && userInfo.vipLevel < 9) return;
    fetchNextConfig();
  }, [fetchNextConfig, userInfo]);

  const nowList = [
    {
      title: t("VIP奖励上限"),
      desc: t("VIP奖励上限p", {
        n: currentLevelInfo?.maxProfitMultiplier || "--",
      }),
    },
    {
      title: t("VIP奖励"),
      desc: t("VIP奖励p", {
        n: currentLevelInfo?.teamInvestmentReward || "--",
      }),
    },
    {
      title: t("AI助手权限"),
      desc: t("AI助手权限p", { n: currentLevelInfo?.aiQueryCount || "0" }),
    },
    {
      title: t("币权奖励"),
      desc: t("币权奖励p", { n: currentStartConfig?.coefficient || "--" }),
      judgeShow: true,
    },
  ];
  const enjoyList = [
    {
      title: t("VIP奖励上限"),
      desc: t("VIP奖励上限p", {
        n: nextLevelInfo?.maxProfitMultiplier || "--",
      }),
      icon: "jlsx",
      showLevel: 0,
    },
    {
      title: t("VIP奖励"),
      desc: t("VIP奖励p", { n: nextLevelInfo?.teamInvestmentReward || "--" }),
      icon: "vipjl",
      showLevel: 0,
    },
    {
      title: t("AI助手权限"),
      desc: t("AI助手权限p", { n: nextLevelInfo?.aiQueryCount || "0" }),
      icon: "aizsqx",
      showLevel: 0,
    },
    {
      title: t("币权奖励"),
      desc: t("币权奖励p", { n: nextStartConfig?.coefficient || "--" }),
      icon: "bqjl",
      showLevel: 9,
    },
  ];
  return (
    <div className="mt-5">
      <h2 className="font-bold mb-2">{t("当前特权")}</h2>
      {userInfo.vipLevel && userInfo.vipLevel > 0 ? (
        nowList.map((v, i) => {
          return (
            <div
              key={i}
              className={cn(
                "bg-bg1 rounded-md mb-2 px-2 py-3 font-bold",
                v.judgeShow
                  ? userInfo.vipLevel === 9 && (userInfo?.star || 0) > 0
                    ? ""
                    : "hidden"
                  : ""
              )}
            >
              <h3 className="text-primary mb-2">{v.title}</h3>
              <p className="font-[510] text-xs text-text2 leading-[120%]">
                {v.desc}
              </p>
            </div>
          );
        })
      ) : (
        <div
          key={"di"}
          className="bg-bg1 rounded-md mb-2 px-2 py-3 font-bold"
        >
          <h3 className="text-primary mb-2">{t("AI助手权限")}</h3>
          <p className="font-[510] text-xs text-text2 leading-[120%]">
            {t("AI助手权限p", {
              n: 20,
            })}
          </p>
        </div>
      )}
      {userInfo.vipLevel === 9 && userInfo.star === 3 ? (
        <div className="text-center">
          <BaseImage
            src="/images/vip/icon-maxStar.png"
            className="w-[140px] h-[140px] mx-auto mt-10 mb-4"
          />
          <span className="font-bold text-[#d69603] text-lg">
            {t("您已达成最高等级")}
          </span>
        </div>
      ) : (
        <>
          <h2 className="font-bold mb-5 mt-6 flex gap-1">
            <BaseImage src={`/images/vip/enjoy_vip.png`} className="w-6 h-6" />
            {t("尊享特权")}
          </h2>
          {enjoyList.map((v, i) => {
            return (userInfo.vipLevel || 0) >= v.showLevel ? (
              <div
                key={i}
                className="bg-bg1 rounded-md mb-2 px-2 py-3 font-bold"
              >
                <h3 className="mb-2 flex gap-1">
                  <BaseImage
                    src={`/images/vip/${v.icon}.png`}
                    className="w-6 h-6"
                  />
                  {v.title}
                </h3>
                <p className="font-[510] text-xs text-text2 leading-[120%]">
                  {v.desc}
                </p>
              </div>
            ) : null;
          })}
        </>
      )}
    </div>
  );
};

export default PrivilegeBox;
