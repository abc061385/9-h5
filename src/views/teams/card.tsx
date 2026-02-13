import { FC } from "react";
import { useTrans } from "@/hooks/useTrans";
import { ICardProps, IndividualType, TeamType } from "./type";
import { cn, formatThousand } from "@/lib/utils";
import { routerMap, useRouter } from "@/i18n/navigation";
import StarIcon from "../vip/star-icon";

const CardBox: FC<ICardProps> = ({ data }) => {
  const { push } = useRouter();
  const t = useTrans();
  const individualList: IndividualType[] = [
    { label: "代数", value: "generation" },
    { label: "昨日投资金额", value: "totalInvestmentYesterday" },
    { label: "总投资金额", value: "totalInvestment" },
    { label: "昨日动态收益", value: "yesterdayReturn" },
    { label: "累计动态收益", value: "totalFundReturn" },
  ];

  const teamList: TeamType[] = [
    { label: "昨日新增人数", value: "yesterdayNewUsersCount" },
    { label: "团队总人数", value: "totalUsersCount" },
    { label: "团队投资金额", value: "totalInvestmentTeam" },
  ];
  return (
    <div
      className="rounded-md bg-bg1 mb-6 p-4"
      onClick={() => push(`${routerMap.teamsInformation}?id=${data.id}`)}
    >
      <div className="flex justify-between border-b border-border2 pb-4 mb-4">
        <div className="flex flex-wrap gap-1 items-center max-w-[70%]">
          <span className="text-lg font-bold mr-2 max-w-[100%] wrap-break-word">
            {data.nickname || "--"}
            {/* {maskString(data.nickname) || "--"} */}
          </span>
          <div className="badge badge-soft badge-primary rounded-xs text-xs">
            V{data?.vipLevel || "0"}
            <StarIcon level={data?.vipLevel || 0} star={data?.star || 0} />
          </div>
          {/* <div className="badge badge-soft badge-primary2 rounded-xs text-xs">
            {data.area || "--"} {t("区")}
          </div> */}
        </div>
        <div
          className={cn(
            "flex items-center gap-1 text-sm text-right",
            data.isInvest === 0 ? "text-text2" : "text-primary"
          )}
        >
          {data.isInvest === 0 ? t("未投资") : t("已投资")}
        </div>
      </div>
      <h3 className="font-medium mb-2">{t("个人")}</h3>
      <div className="bg-bg rounded-lg p-4">
        {individualList.map((item) => {
          return (
            <div key={item.value} className="flex justify-between mt-2 text-sm">
              <span className="text-text2">{t(item.label)}</span>
              <span>{formatThousand(data[item.value] || 0)}</span>
            </div>
          );
        })}
      </div>
      <h3 className="font-medium mb-2 mt-4">{t("团队")}</h3>
      <div className="bg-bg rounded-lg p-4">
        {teamList.map((item) => {
          return (
            <div key={item.value} className="flex justify-between mt-2">
              <span className="text-text2">{t(item.label)}</span>
              <span>{formatThousand(data[item.value] || 0)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CardBox;
