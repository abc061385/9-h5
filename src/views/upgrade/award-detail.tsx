import { api } from "@/api";
import { ListNoData } from "@/components/nodata/list-nodata";
import { useFormatBalance } from "@/hooks/useFormatBalance";
import { useRequestMutation } from "@/hooks/useRequestMutation";
import { useTrans } from "@/hooks/useTrans";
import { typeMap } from "@/lib/const";
import { cn, maskString } from "@/lib/utils";
import { FC, ReactNode, useCallback, useEffect, useState } from "react";

const AwardDetail: FC<{ tabsValue: string }> = ({ tabsValue }) => {
  const t = useTrans();
  const { formatBalance } = useFormatBalance();

  const [list, setList] = useState<AwardListType[]>();

  const { trigger } = useRequestMutation(
    api.fundProductConfig.rewardTransactionUsingGet
  );

  const getList = useCallback(() => {
    if (!tabsValue) return;
    trigger(
      {
        pageNo: 1,
        pageSize: 100,
        outputToken: tabsValue,
      },
      { onSuccess: ({ data }) => setList(data?.list || []) }
    );
  }, [tabsValue, trigger]);

  useEffect(() => {
    getList();
  }, [getList]);

  const FieldEL = useCallback(
    (label: string | ReactNode, value: string | ReactNode) => {
      return (
        <div className="flex justify-between items-center mb-4 last:mb-0">
          <span>{label}</span>
          <span>{value}</span>
        </div>
      );
    },
    []
  );

  return (
    <div className="mt-4">
      <h2 className="font-bold">{t("奖励明细")}</h2>
      {list?.length ? (
        list.map((item) => {
          return (
            <div
              key={item.id}
              className="rounded-md px-3.5 pt-2 pb-5 bg-bg1 mt-4"
            >
              <h3 className="flex items-center justify-between font-bold">
                <span>{t("投资收益")}</span>
                <div
                  className={cn(
                    "badge rounded-md px-1.5 text-xs",
                    item.status === 1 ? "badge-success " : "badge-info"
                  )}
                >
                  {t(item.status === 1 ? "已发放" : "已提取")}
                </div>
              </h3>
              <div className="rounded-md bg-white py-4 px-2.5 mt-4 font-bold">
                {FieldEL(t("奖励类型"), t(typeMap[item.type]))}
                {FieldEL(
                  t("奖励金额"),
                  <span>
                    {formatBalance(item.amount, tabsValue)} {tabsValue}
                  </span>
                )}
                {FieldEL(t("收益来源"), maskString(item.from))}
                {FieldEL(t("发放时间"), item.createTime)}
              </div>
            </div>
          );
        })
      ) : (
        <ListNoData />
      )}
    </div>
  );
};
export default AwardDetail;
