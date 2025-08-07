import { useFormatBalance } from "@/hooks/useFormatBalance";
import { useTrans } from "@/hooks/useTrans";
import { FC } from "react";

const CardBox: FC<{ data: IncomeListType; symbol: string }> = ({
  data,
  symbol,
}) => {
  const t = useTrans();
  const { formatBalance } = useFormatBalance();

  return (
    <div className="border-b border-border2 pb-4 mb-4">
      <div className="flex items-center justify-between text-sm mb-1">
        <span>{data.fundType === 1 ? t("稳健基金") : t("策略基金")}</span>
        <span>+ {formatBalance(data.amount, symbol) + " " + symbol}</span>
      </div>
      <div className="flex items-center justify-between text-xs text-text4">
        <span>{t("投资收益")}</span>
        <span>{data.createTime}</span>
      </div>
    </div>
  );
};

export default CardBox;
