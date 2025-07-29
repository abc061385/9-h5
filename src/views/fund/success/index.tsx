"use client";

import { api } from "@/api";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useRequestMutation } from "@/hooks/useRequestMutation";
import { useTrans } from "@/hooks/useTrans";
import { routerMap, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useFundStore } from "@/store/useFundStore";
import { ReactNode, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const FundSuccessView = () => {
  const t = useTrans();
  const { buyData, setField } = useFundStore();
  const { push } = useRouter();

  const [maximum, setMaximum] = useState(0);
  const [data, setData] = useState<FundBuyType>();
  const [isCheck, setIsCheck] = useState(true);

  const { trigger } = useRequestMutation(
    api.fundProductConfig.calMaxProfitUsingPost
  );
  const { trigger: postBuy, isMutating } = useRequestMutation(
    api.fundProductConfig.purchaseUsingPost
  );

  useEffect(() => {
    if (!buyData?.id) return;
    setData(buyData);
  }, [buyData]);

  useEffect(() => {
    if (!data?.id) return;
    trigger(
      {
        productId: Number(data?.productId),
        pledgeId: Number(data?.pledgeId),
        totalAmount: Number(data?.totalAmount),
      },
      {
        onSuccess: ({ data }) => {
          setMaximum(Number(data));
        },
      }
    );
  }, [data, trigger]);

  const cardEl = useCallback(
    (label: string | ReactNode, value: string | ReactNode) => {
      return (
        <div className="flex items-start justify-between mb-4 text-xs last:mb-0">
          <span className="font-medium">{label}</span>
          <span>{value}</span>
        </div>
      );
    },
    []
  );
  return (
    <ViewLayout
      header={<HeaderWithBack title={t("基金购买")} algin="center" />}
    >
      <div className="p-content">
        <div className="bg-bg1 px-3.5 py-4 rounded-md font-bold">
          <h3 className="flex items-center justify-between">
            <span>{t("基金型号")}</span>
            <span className="text-primary">
              {data?.productType == 1 ? t("稳健基金") : t("策略基金")}
            </span>
          </h3>
          <div className="bg-white px-3.5 py-4 rounded-md mt-4">
            {cardEl(t("购买总额"), `${data?.totalAmount} USDT`)}
            {cardEl(
              t("支付代币"),
              <div className="flex flex-col items-end">
                <span>
                  {data?.pledgeToken1Amount + " " + data?.pledgeToken1}
                </span>
                <span>
                  {data?.pledgeToken2Amount + " " + data?.pledgeToken2}
                </span>
              </div>
            )}
            {cardEl(t("锁仓期"), `${data?.selectCycle} ${t("天")}`)}
          </div>
          <h3 className="text-center my-4">{t("收益规则")}</h3>
          <div className="bg-white px-3.5 py-4 rounded-md font-bold">
            {cardEl(t("最大收益"), `${maximum} USDM`)}
            {cardEl(t("日收益率"), `≈${data?.pledge?.dailyYield}%`)}
            {cardEl(t("发放时间"), t("发放时间p"))}
            {cardEl(t("到账方式"), t("实时到账"))}
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="font-bold">{t("自动复投功能")}</span>
          <input
            type="checkbox"
            checked={isCheck}
            onChange={(e) => setIsCheck(e.target.checked)}
            className="toggle toggle-primary checked:border-primary checked:bg-primary checked:text-white"
          />
        </div>
        <p className="text-text2 font-medium leading-[120%] text-xs mt-2">
          {t("自动复投功能p")}
        </p>
        <button
          className={cn(
            "btn btn-primary w-full mt-4",
            isMutating && "btn-disabled"
          )}
          onClick={() => {
            postBuy(
              {
                productId: Number(data?.productId ?? 0),
                pledgeId: Number(data?.pledgeId ?? 0),
                totalAmount: Number(data?.totalAmount ?? 0),
                isReinvestment: isCheck,
              },
              {
                onSuccess: () => {
                  toast.success(t("购买成功"));
                  setField("buyData", undefined);
                  push(routerMap.fundRecord);
                },
              }
            );
          }}
        >
          {isMutating ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            t("common.confirm")
          )}
        </button>
      </div>
    </ViewLayout>
  );
};
export default FundSuccessView;
