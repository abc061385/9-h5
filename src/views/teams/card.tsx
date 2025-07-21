import { FC } from "react";
import { useTrans } from "@/hooks/useTrans";
import { ICardProps, IndividualType, TeamType } from "./type";
import { cn, maskString } from "@/lib/utils";

const CardBox: FC<ICardProps> = ({ data, onClick }) => {
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
    <div className="rounded-md bg-[#F6F7FD] mb-4 p-3.5">
      <div className="flex justify-between font-bold">
        <div className="flex flex-wrap gap-1 items-center">
          <span>{maskString(data.nickname) || "--"}</span>
          <div className="badge badge-soft badge-primary rounded-sm py-1.5 px-1">
            {data.areaType === 1 ? t("小区") : t("大区")}
          </div>
          <div className="badge badge-soft badge-primary rounded-sm py-1.5 px-1">
            {data.area || "--"} {t("区")}
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <div
            className={cn(
              "badge bg-text2 text-white rounded-sm py-1.5 px-1 leading-[100%]",
              data.isInvest !== 0 && "bg-rise"
            )}
          >
            {data.isInvest === 0 ? t("未投资") : t("已投资")}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-md py-4 px-3 mt-4 grid grid-cols-2 font-bold">
        <div className="border-r border-[#F4F1FD] pr-3">
          <h3 className="text-center">{t("个人")}</h3>
          {individualList.map((item) => {
            return (
              <div key={item.value} className="flex justify-between mt-4">
                <span>{t(item.label)}</span>
                <span>{data[item.value]}</span>
              </div>
            );
          })}
        </div>
        <div className="pl-3">
          <h3 className="text-center">{t("团队")}</h3>
          {teamList.map((item) => {
            return (
              <div key={item.value} className="flex justify-between mt-4">
                <span>{t(item.label)}</span>
                <span>{data[item.value]}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="btn btn-primary w-full mt-4" onClick={() => onClick?.()}>
        {t("查看下级")}
      </div>
    </div>
  );
};
export default CardBox;
