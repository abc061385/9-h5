import BaseImage from "@/components/base-image";
import { useTrans } from "@/hooks/useTrans";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface CoinListType {
  list: CurrencyInfo[];
  checkValue?: number;
  onClick?: (item: CurrencyInfo) => void;
}

const CoinList: FC<CoinListType> = ({ list, checkValue, onClick }) => {
  const t = useTrans();
  return (
    <div className="px-2 max-h-[40vh] overflow-auto">
      {list?.length ? (
        list.map((item) => {
          return (
            <div
              key={item.id}
              className={cn(
                "flex items-center justify-center gap-1 h-11 mb-4 font-bold rounded-md",
                item.id === checkValue ? "bg-primary text-white" : ""
              )}
              onClick={() => onClick?.(item)}
            >
              <BaseImage
                src={item.logo || ""}
                className="w-6 h-6 rounded-full overflow-hidden"
              />
              <span>{item.currencyCode}</span>
            </div>
          );
        })
      ) : (
        <h3 className="font-bold text-text2 text-sm text-center py-4">
          {t("暂无数据")}
        </h3>
      )}
    </div>
  );
};
export default CoinList;
