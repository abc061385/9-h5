import { routerMap, useRouter } from "@/i18n/navigation";
import CoinIcon from "./coin-icon";
import { useTrans } from "@/hooks/useTrans";
import { FC } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/icon";
import { ShowIf } from "@/components/show-if";

interface IProps {
  item: TokenListType;
  pledgeDays: number;
}

const ListCardBox: FC<IProps> = ({ item, pledgeDays }) => {
  const t = useTrans();
  const { push } = useRouter();
  return (
    <div
      key={item.id}
      className={cn(
        "bg-bg2 rounded-2xl p-4 relative",
        item.isHot === 1 && "bg-[rgba(110,42,254,0.08)]"
      )}
      onClick={() =>
        push(
          `${routerMap.fundBuy}?id=${item.productId}&pledgeDays=${pledgeDays}`
        )
      }
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-base font-medium">
          {item.pledgeToken1}/{item.pledgeToken2}
        </span>
        <ShowIf condition={item.isHot === 1}>
          <Icon name="hot" className="size-8 absolute top-[-10px] left-4" />
        </ShowIf>

        <CoinIcon
          coins={[
            { src: item.pledgeToken1Logo },
            { src: item.pledgeToken2Logo },
          ]}
          size={20}
          overlap={16}
          className="pr-2"
        />
      </div>
      <div className="text-text4 text-xs mt-1 flex flex-col">
        {t("日收益率")}
        <span className="text-rise text-base font-bold">
          {" "}
          ≈ {item.dailyYield}%
        </span>
      </div>
      <ShowIf condition={item.isHot === 1}>
        <Icon name="hot-gift" className="size-5 absolute right-4 bottom-4" />
      </ShowIf>
    </div>
  );
};
export default ListCardBox;
