import { useFormatBalance } from "@/hooks/useFormatBalance";
import { useTrans } from "@/hooks/useTrans";
import { typeMap } from "@/lib/const";
import { FC } from "react";

const CardBox: FC<{
  data: IncomeListType;
  symbol: string;
}> = ({ data, symbol }) => {
  const t = useTrans();
  const { formatBalance } = useFormatBalance();

  return (
    <div className="border-b border-border2 pb-4 mb-4">
      <div className="flex items-center justify-between text-sm mb-1">
        <span className="flex-1">{t(typeMap[data.type])}</span>
        <span className="flex-1 text-right">
          {data.inout === 2 ? "-" : "+"}{" "}
          {formatBalance(data.amount, symbol) + " " + symbol}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs text-text4">
        <span></span>
        <span>{data.createTime}</span>
      </div>
    </div>
  );
};

export default CardBox;
