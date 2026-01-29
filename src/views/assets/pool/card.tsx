import { FC } from "react";

const CardBox: FC<{
  data: IncomeListType;
  symbol: string;
}> = ({ data, symbol }) => {
  return (
    <div className="border-b border-border2 pb-4 mb-4">
      <div className="flex items-center justify-between text-xs text-text4">
        <span>{data.amount + " " + symbol}</span>
        <span>{data.createTime}</span>
      </div>
    </div>
  );
};

export default CardBox;
