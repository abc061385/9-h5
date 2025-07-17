import { useTrans } from "@/hooks/useTrans";
import { useStore } from "@/store";
import { useCallback, useEffect, useState } from "react";
import StarIcon from "./star-icon";
import { api } from "@/api";
import { VipInfoType } from "./type";
import { formatThousand } from "@/lib/utils";

const PromoteBox = () => {
  const t = useTrans();
  const userInfo = useStore((s) => s.userInfo);
  const [nextLevelInfo, setNextLevelInfo] = useState<VipInfoType>({});

  const getNextInfo = useCallback(async () => {
    const { data } = await api.memberVipLevelConfig.listUsingGet({});

    if (userInfo.vipLevel === null || userInfo.vipLevel === undefined) return;

    if (userInfo.vipLevel < 9) {
      // setCurrentLevelInfo(
      //   data.find((v: VipInfoType) => v.vipLevel === userInfo.vipLevel)
      // );
      setNextLevelInfo(
        data.find(
          (v: VipInfoType) => v.vipLevel === Number(userInfo.vipLevel || 0) + 1
        )
      );
    } else {
      const info = data.find((v: VipInfoType) => v.vipLevel === 9);
      // setCurrentLevelInfo(info);
      setNextLevelInfo(info);
    }
  }, [userInfo]);

  useEffect(() => {
    getNextInfo();
  }, [getNextInfo]);

  return (
    <div className="mt-7">
      <div className="flex flex-wrap items-center gap-1.5">
        <div className="font-bold text-nowrap flex items-center">
          <span className="mr-1">
            {t("晋升")} VIP{nextLevelInfo?.vipLevel || "--"}
          </span>
          <StarIcon star={userInfo.star} level={userInfo.vipLevel || 0} />
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
          className="progress progress-primary my-3"
          value={userInfo.totalTeamInvestment}
          max={nextLevelInfo.teamInvestmentTotal}
        ></progress>
        <div className="text-[#E4E0ED] text-sm font-[ysbth] flex">
          <span className="mr-1">VIP{nextLevelInfo.vipLevel}</span>
          <StarIcon
            star={(userInfo.star || 0) + 1}
            level={userInfo.vipLevel || 0}
            type="dark"
          />
        </div>
      </div>
      <div className="font-[510] text-xs text-text2">
        <span>
          {t("还差")}{" "}
          {(nextLevelInfo.teamInvestmentTotal || 0) -
            (userInfo.totalTeamInvestment || 0) >
          0
            ? formatThousand(
                (nextLevelInfo.teamInvestmentTotal || 0) -
                  (userInfo.totalTeamInvestment || 0)
              )
            : 0}{" "}
          USDT
        </span>
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
