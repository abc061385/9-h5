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
import CoinIcon from "../coin-icon";

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
        <div className="flex items-start justify-between text-sm mb-4 last:mb-0">
          <span className="text-text4">{label}</span>
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
      heightFull
      header={
        <HeaderWithBack
          title={`${t(data?.fundType === 1 ? "稳健基金" : "策略基金")}-${
            data?.fundCycleDays
          }${t("天")}`}
          algin="center"
        />
      }
    >
      <div className="p-content">
        <div className="flex justify-between items-end pr-4 mb-6">
          <div>
            <h4 className="text-text4 text-sm leading-4 mb-1">
              {t("支付代币")}
            </h4>
            <Skeleton isLoading={isMutating}>
              <p className="font-bold text-base">
                {formatBalance(
                  data?.pledgeToken1Amount || 0,
                  data?.pledgeToken1 || "USDT"
                )}
                {data?.pledgeToken1} +{" "}
                {formatBalance(
                  data?.pledgeToken2Amount || 0,
                  data?.pledgeToken2 || "USDT"
                )}{" "}
                {data?.pledgeToken2}
              </p>
            </Skeleton>
          </div>
          <CoinIcon
            coins={[
              { src: data?.pledgeToken1Logo || "" },
              { src: data?.pledgeToken2Logo || "" },
            ]}
            overlap={16}
            size={32}
            className="mb-1"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-text4 text-sm">{t("购买总额")}</span>
          <Skeleton isLoading={isMutating}>
            <b className="text-xl">
              {formatBalance(data?.investmentAmount || "", "USDT")} USDT
            </b>
          </Skeleton>
        </div>
        <h3 className="border-t border-border2 mt-6 pt-6 font-medium">
          {t("购买信息")}
        </h3>
        <div className="mt-4">
          {cardEl(t("购买时间"), `${data?.purchaseTime}`)}
          {cardEl(t("到期时间"), `${data?.maturityTime}`)}
          {cardEl(t("锁仓期"), `${data?.fundCycleDays} ${t("天")}`)}
        </div>
        <div className="border-y border-border2 py-6 my-6">
          <div className="flex items-center justify-between ">
            <span className="text-text6 text-sm">{t("自动复投")}</span>
            <input
              type="checkbox"
              checked={Boolean(data?.isReinvestment)}
              className="toggle toggle-primary checked:border-primary checked:bg-primary checked:text-white"
              readOnly
            />
          </div>
          <p className="text-xs text-text4 mt-4 leading-4">
            {t("autoReinvestmentDesc")}
          </p>
        </div>
        <h3 className="font-medium mb-4">{t("收益规则")}</h3>
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
    </ViewLayout>
  );
};
export default FundDetailView;
