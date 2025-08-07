import BaseImage from "@/components/base-image";
import { Icon } from "@/components/icon";
import { ShowIf } from "@/components/show-if";
import { useTrans } from "@/hooks/useTrans";
import { FC } from "react";

interface CoinListType {
  list: CurrencyInfo[];
  checkValue?: number;
  onClick?: (item: CurrencyInfo) => void;
  onCancel?: () => void;
}

const CoinList: FC<CoinListType> = ({
  list,
  checkValue,
  onClick,
  onCancel,
}) => {
  const t = useTrans();
  return (
    <div className="px-2 max-h-[40vh] overflow-auto">
      {list?.length ? (
        list.map((item) => {
          return (
            <div
              key={item.id}
              className="flex items-center justify-between py-3.5 border-b border-border2"
              onClick={() => onClick?.(item)}
            >
              <BaseImage
                src={item.logo!}
                className="w-6 h-6 rounded-full overflow-hidden mr-4"
              />
              <span className="font-bold">{item.currencyCode}</span>
              <span className="flex-1 ml-2 text-sm text-text4">
                {item.currencyCode}
              </span>
              <ShowIf condition={item.id === checkValue}>
                <Icon name="duigou-primary" className="w-4 h-3" />
              </ShowIf>
            </div>
          );
        })
      ) : (
        <h3 className="font-bold text-text2 text-sm text-center py-4">
          {t("暂无数据")}
        </h3>
      )}
      <button
        className="btn btn-outline w-full mt-6"
        onClick={() => onCancel?.()}
      >
        {t("common.cancel")}
      </button>
    </div>
  );
};
export default CoinList;
