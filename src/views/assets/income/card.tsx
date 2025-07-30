import { useFormatBalance } from "@/hooks/useFormatBalance";
import { useTrans } from "@/hooks/useTrans";
import { cn } from "@/lib/utils";
import { FC } from "react";

const CardBox: FC<{ data: IncomeListType; symbol: string }> = ({
  data,
  symbol,
}) => {
  const t = useTrans();
  const { formatBalance } = useFormatBalance();
  const field = [
    {
      label: "基金类型",
      value: data.fundType === 1 ? t("稳健基金") : t("策略基金"),
    },
    {
      label: "发放金额",
      value: formatBalance(data.amount, symbol) + " " + symbol,
    },
    { label: "发放时间", value: data.createTime },
  ];
  return (
    <div className="rounded-md px-3.5 pt-2 pb-5 bg-bg1 mt-4">
      <h3 className="flex items-center justify-between font-bold">
        <span>{t("投资收益")}</span>
        <div
          className={cn(
            "badge rounded-md px-1.5 text-xs",
            data.status === 1 ? "badge-success " : "badge-info"
          )}
        >
          {t(data.status === 1 ? "已发放" : "已提取")}
        </div>
      </h3>
      <div className="rounded-md bg-white py-4 px-2.5 mt-4 font-bold">
        {field.map((item, index) => {
          return (
            <div
              key={index}
              className="flex justify-between items-center mb-4 last:mb-0"
            >
              <span>{item.label}</span>
              <span>{item.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardBox;
