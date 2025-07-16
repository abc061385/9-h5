import BaseImage from "@/components/base-image";
import { useTrans } from "@/hooks/useTrans";

const PrivilegeBox = () => {
  const t = useTrans();
  const nowList = [
    {
      title: t("VIP奖励上限"),
      desc: t("VIP奖励上限p", { n: "currentLevel.maxProfitMultiplier" }),
    },
    {
      title: t("VIP奖励"),
      desc: t("VIP奖励p", { n: "currentLevel.teamInvestmentReward" }),
    },
    {
      title: t("AI助手权限"),
      desc: t("AI助手权限p", { n: "currentLevel.aiQueryCount" }),
    },
    {
      title: t("币权奖励"),
      desc: t("币权奖励p", { n: "currentStartConfig.coefficient" }),
    },
  ];
  const enjoyList = [
    {
      title: t("VIP奖励上限"),
      desc: t("VIP奖励上限p", { n: "nextLevel.maxProfitMultiplier" }),
      icon: "jlsx",
    },
    {
      title: t("VIP奖励"),
      desc: t("VIP奖励p", { n: "nextLevel.teamInvestmentReward" }),
      icon: "vipjl",
    },
    {
      title: t("AI助手权限"),
      desc: t("AI助手权限p", { n: "nextLevel.aiQueryCount" }),
      icon: "aizsqx",
    },
    {
      title: t("币权奖励"),
      desc: t("币权奖励p", { n: "nextStartConfig.coefficient" }),
      icon: "bqjl",
    },
  ];
  return (
    <div className="mt-5">
      <h2 className="font-bold mb-2">{t("当前特权")}</h2>
      {nowList.map((v, i) => {
        return (
          <div
            key={i}
            className="bg-[#F6F7FD] rounded-md mb-2 px-2 py-3 font-bold"
          >
            <h3 className="text-primary mb-2">{v.title}</h3>
            <p className="font-[510] text-xs text-text2 leading-[120%]">
              {v.desc}
            </p>
          </div>
        );
      })}
      <h2 className="font-bold mb-5 mt-6 flex gap-1">
        <BaseImage src={`/images/vip/enjoy_vip.png`} className="w-6 h-6" />
        {t("尊享特权")}
      </h2>

      {enjoyList.map((v, i) => {
        return (
          <div
            key={i}
            className="bg-[#F6F7FD] rounded-md mb-2 px-2 py-3 font-bold"
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
        );
      })}
    </div>
  );
};

export default PrivilegeBox;
