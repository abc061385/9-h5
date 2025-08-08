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
      icon: "icon-jlsx",
      title: t("VIP奖励上限"),
      desc: t("VIP奖励上限p", {
        n: currentLevelInfo?.maxProfitMultiplier || "--",
      }),
    },
    {
      icon: "icon-jl",
      title: t("VIP奖励"),
      desc: t("VIP奖励p", {
        n: currentLevelInfo?.teamInvestmentReward || "--",
      }),
    },
    {
      icon: "icon-ai",
      title: t("AI助手权限"),
      desc: t("AI助手权限p", { n: currentLevelInfo?.aiQueryCount || "0" }),
    },
    {
      icon: "",
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
      icon: "icon-jlsx",
      showLevel: 0,
    },
    {
      title: t("VIP奖励"),
      desc: t("VIP奖励p", { n: nextLevelInfo?.teamInvestmentReward || "--" }),
      icon: "icon-jl",
      showLevel: 0,
    },
    {
      title: t("AI助手权限"),
      desc: t("AI助手权限p", { n: nextLevelInfo?.aiQueryCount || "0" }),
      icon: "icon-ai",
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
    <div className="mt-6">
      <h2 className="font-medium">{t("当前特权")}</h2>
      {userInfo.vipLevel && userInfo.vipLevel > 0 ? (
        nowList.map((v, i) => {
          return (
            <div
              key={i}
              className={cn(
                "flex gap-4 mt-6",
                v.judgeShow
                  ? userInfo.vipLevel === 9 && (userInfo?.star || 0) > 0
                    ? ""
                    : "hidden"
                  : ""
              )}
            >
              <BaseImage
                src={`/images/vip/${v.icon}.svg`}
                className="size-6 mt-1"
              />
              <div className="flex-1">
                <h3 className="text-sm font-medium mb-1">{v.title}</h3>
                <p className="text-xs text-text4 leading-4">{v.desc}</p>
              </div>
            </div>
          );
        })
      ) : (
        <div key={"di"} className="flex gap-4">
          <BaseImage src={`/images/vip/icon-ai.svg`} className="size-6 mt-1" />
          <div className="flex-1">
            <h3 className="text-sm font-medium mb-1">{t("AI助手权限")}</h3>
            <p className="text-xs text-text4 leading-4">
              {t("AI助手权限p", {
                n: 20,
              })}
            </p>
          </div>
        </div>
      )}

      <div className="divider"></div>

      {userInfo.vipLevel === 9 && userInfo.star === 3 ? (
        <div className="flex flex-col items-center">
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
          <h2 className="font-medium text-primary">{t("尊享特权")}</h2>
          {enjoyList.map((v, i) => {
            return (userInfo.vipLevel || 0) >= v.showLevel ? (
              <div key={i} className="flex gap-4 mt-6">
                <BaseImage
                  src={`/images/vip/${v.icon}.svg`}
                  className="size-6 mt-1"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-medium mb-1">{v.title}</h3>
                  <p className="text-xs text-text4 leading-4">{v.desc}</p>
                </div>
              </div>
            ) : null;
          })}
        </>
      )}
    </div>
  );
};

export default PrivilegeBox;
