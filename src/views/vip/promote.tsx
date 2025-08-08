import { useTrans } from "@/hooks/useTrans";
import { useEffect } from "react";
import StarIcon from "./star-icon";
import { formatThousand } from "@/lib/utils";
import { useVipStore } from "@/store/useVipStore";
import { useUserStore } from "@/store/useUserStore";

const PromoteBox = () => {
  const t = useTrans();
  const userInfo = useUserStore((s) => s.userInfo);
  const nextLevelInfo = useVipStore((s) => s.nextLevelInfo);
  const fetchNextLevel = useVipStore((s) => s.fetchNextLevel);

  useEffect(() => {
    fetchNextLevel();
  }, [fetchNextLevel]);

  if (userInfo.vipLevel === 9 && userInfo.star === 3) return null;
  return (
    <div className="mt-6 border-b border-border2 pb-6">
      <div className="flex flex-wrap items-center gap-1.5">
        <div className="font-medium leading-6 flex items-center">
          <span className="mr-1">
            {t("晋升")} VIP{nextLevelInfo?.vipLevel || "--"}
          </span>
          <StarIcon
            star={(userInfo.star || 0) + 1}
            level={userInfo.vipLevel || 0}
          />
        </div>
        <div className="badge badge-soft badge-primary rounded-sm">
          &gt;={formatThousand(nextLevelInfo.teamInvestmentTotal || 0)}USDT
        </div>
        <div className="badge badge-soft badge-primary rounded-sm">
          {t("多少个用户", {
            num: nextLevelInfo.teamVipCount || 0,
            level: "VIP" + userInfo.vipLevel,
          })}
        </div>
      </div>
      <div className="flex items-center gap-1">
        <progress
          className="progress progress-gradient w-full h-1.5 rounded-sm bg-border2"
          value={userInfo.totalTeamInvestment}
          max={nextLevelInfo.teamInvestmentTotal}
        ></progress>
        <div className="text-sm font-bold flex">
          <span className="mr-1">VIP{nextLevelInfo.vipLevel}</span>
          <StarIcon
            star={(userInfo.star || 0) + 1}
            level={userInfo.vipLevel || 0}
            type="dark"
          />
        </div>
      </div>
      <div className="text-sm text-primary">
        <span className="text-text1 mr-2">{t("还差")}</span>
        {(nextLevelInfo.teamInvestmentTotal || 0) -
          (userInfo.totalTeamInvestment || 0) >
        0
          ? formatThousand(
              (nextLevelInfo.teamInvestmentTotal || 0) -
                (userInfo.totalTeamInvestment || 0)
            )
          : 0}{" "}
        USDT
        {nextLevelInfo.teamVipCount ? "," : null}
        {nextLevelInfo.teamVipCount ? (
          <span>
            {t("多少个用户", {
              num:
                nextLevelInfo.teamVipCount - (userInfo.inviteCount || 0) > 0
                  ? nextLevelInfo.teamVipCount - (userInfo.inviteCount || 0)
                  : 0,
              level: "VIP" + userInfo.vipLevel,
            })}
          </span>
        ) : null}
      </div>
    </div>
  );
};
export default PromoteBox;
