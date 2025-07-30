"use client";

import { ReactNode, useCallback, useEffect } from "react";
import { api } from "@/api";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useRequestMutation } from "@/hooks/useRequestMutation";
import { useTrans } from "@/hooks/useTrans";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Skeleton } from "@/components/skeleton";
import { useFormatBalance } from "@/hooks/useFormatBalance";

const FundDetailView = () => {
  const t = useTrans();
  const params = useSearchParams();
  const { formatBalance } = useFormatBalance();
  const [data, setData] = useState<FundDetailOrder>();

  const { trigger, isMutating } = useRequestMutation(
    api.fundProductConfig.purchaseDetailUsingGet
  );

  useEffect(() => {
    if (!params.get("id") || !params.get("orderType")) return;
    trigger(
      {
        id: Number(params.get("id")),
        orderType: params.get("orderType") || "",
      },
      {
        onSuccess: ({ data }) => {
          setData(data as FundDetailOrder);
        },
      }
    );
  }, [params, trigger]);

  const cardEl = useCallback(
    (label: string | ReactNode, value: string | ReactNode) => {
      return (
        <div className="flex items-start justify-between text-xs mb-4 last:mb-0">
          <span className="font-medium">{label}</span>
          <Skeleton isLoading={isMutating} className="text-right">
            <span>{value}</span>
          </Skeleton>
        </div>
      );
    },
    [isMutating]
  );

  return (
    <ViewLayout
      header={<HeaderWithBack title={t("投资详情")} algin="center" />}
    >
      <div className="p-content">
        <div className="bg-bg1 px-3.5 py-4 rounded-md font-bold">
          <h3 className="flex items-center justify-between">
            <span>{t("购买信息")}</span>
          </h3>
          <div className="bg-white px-3.5 py-4 rounded-md mt-4">
            {cardEl(
              t("购买总额"),
              `${formatBalance(data?.investmentAmount || 0, "USDT")} USDT`
            )}
            {cardEl(
              t("支付代币"),
              <div className="flex flex-col items-end">
                <span>
                  {formatBalance(
                    data?.pledgeToken1Amount || 0,
                    data?.pledgeToken1 || "USDT"
                  )}{" "}
                  {data?.pledgeToken1}
                </span>
                <span>
                  {formatBalance(
                    data?.pledgeToken2Amount || 0,
                    data?.pledgeToken2 || "USDT"
                  )}{" "}
                  {data?.pledgeToken2}
                </span>
              </div>
            )}
            {cardEl(t("购买时间"), `${data?.purchaseTime}`)}
            {cardEl(t("锁仓期"), `${data?.fundCycleDays} ${t("天")}`)}
          </div>
          <h3 className="text-center my-4">{t("收益规则")}</h3>
          <div className="bg-white px-3.5 py-4 rounded-md font-bold">
            {cardEl(
              t("昨日收益"),
              `${formatBalance(
                data?.yesterdayProfit || 0,
                data?.outputToken || "USDM"
              )} ${data?.outputToken}`
            )}
            {cardEl(
              t("已获取收益"),
              `${formatBalance(
                data?.totalProfit || 0,
                data?.outputToken || "USDM"
              )} ${data?.outputToken}`
            )}
            {cardEl(
              t("最大收益"),
              `${formatBalance(data?.maxProfit || 0, "USDM")} USDM`
            )}
            {cardEl(t("日收益率"), `≈${data?.dailyYield}%`)}
            {cardEl(t("发放时间"), t("发放时间p"))}
            {cardEl(t("到账方式"), t("实时到账"))}
          </div>
        </div>
      </div>
    </ViewLayout>
  );
};
export default FundDetailView;
