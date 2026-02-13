import { api } from "@/api";
import { InfiniteVirtuosoList } from "@/components/infinite-scroll";
import { useFormatBalance } from "@/hooks/useFormatBalance";
import { useTrans } from "@/hooks/useTrans";
import { typeMap } from "@/lib/const";
import { FC, useCallback, useState } from "react";

const AwardDetail: FC<{ tabsValue: string }> = ({ tabsValue }) => {
  const t = useTrans();
  const { formatBalance } = useFormatBalance();

  const [pageSize] = useState(20);

  const getList = useCallback(
    async (page: number) => {
      const { data } = await api.fundProductConfig.rewardTransactionUsingGet({
        pageNo: page,
        pageSize: pageSize,
        outputToken: tabsValue,
      });
      const newData = data?.list || [];
      return {
        data: newData,
        hasMore: page < data.total / pageSize,
      };
    },
    [tabsValue, pageSize],
  );

  return (
    <div className="mt-6">
      <h2 className="font-medium mb-4">{t("奖励明细")}</h2>
      <InfiniteVirtuosoList<IncomeListType>
        fetchData={getList}
        className="!h-[40vh]"
        columns={1}
        renderItem={(item: IncomeListType) => (
          <div key={item.id} className="border-b border-border2 pb-4 mb-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="flex-1">{t(typeMap[item.type])}</span>
              <span className="text-right flex-1">
                {item.inout === 2 ? "-" : "+"}
                {formatBalance(item.amount, tabsValue)} {tabsValue}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-text2">
              <span>{t("投资收益")}</span>
              <span>{item.createTime}</span>
            </div>
          </div>
        )}
      />
    </div>
  );
};
export default AwardDetail;
