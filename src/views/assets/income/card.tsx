import { useFormatBalance } from "@/hooks/useFormatBalance";
import { useTrans } from "@/hooks/useTrans";
import { typeMap } from "@/lib/const";
import { FC, useMemo } from "react";

const CardBox: FC<{
  data: IncomeListType;
  symbol: string;
}> = ({ data, symbol }) => {
  const t = useTrans();
  const { formatBalance } = useFormatBalance();

  const title = useMemo(() => {
    if (data.fundType === 1 && data.type === "INVESTMENT_INCOME") {
      return t("fund_no_2");
    }
    if (data.fundType === 2 && data.type === "INVESTMENT_INCOME") {
      return t("fund_no_1");
    }
    return t(typeMap[data.type]);
  }, [data, t]);
  return (
    <div className="border-b border-border2 pb-4 mb-4">
      <div className="flex items-center justify-between text-sm mb-1">
        <span className="flex-1">{title}</span>
        {/* <span className="flex-1"> */}
        {/*   {data.fundType === 1 ? t("稳健基金") : t("策略基金")} */}
        {/* </span> */}
        <span className="flex-1 text-right">
          {data.inout === 2 ? "-" : "+"}{" "}
          {formatBalance(data.amount, symbol) + " " + symbol}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs text-text4">
        <span>{t("投资收益")}</span>
        <span>{data.createTime}</span>
      </div>
    </div>
  );
};

export default CardBox;
