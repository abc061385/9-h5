"use client";

import { useEffect, useState } from "react";
import BaseImage from "@/components/base-image";
import { HeaderWithBack } from "@/components/header-with-back";
import { useTrans } from "@/hooks/useTrans";
import { ListNoData } from "@/components/nodata/list-nodata";
import { useRequestMutation } from "@/hooks/useRequestMutation";
import { api } from "@/api";
import { routerMap } from "@/i18n/navigation";

const FundRecordView = () => {
  const t = useTrans();
  const [tabsValue, setTabsValue] = useState("");
  const [list, setList] = useState<FundOrder[]>([]);
  const { trigger } = useRequestMutation(
    api.fundProductConfig.purchaseRecordUsingGet
  );

  useEffect(() => {
    trigger(
      { pageNo: 1, pageSize: 100, outputToken: tabsValue },
      {
        onSuccess: ({ data }) => {
          setList(data.list);
        },
      }
    );
  }, [trigger, tabsValue]);

  const tabs = [
    {
      label: t("walletDetail.all"),
      value: "",
    },
    {
      label: "USDM",
      value: "USDM",
    },
    {
      label: "9MC",
      value: "9MC",
    },
  ];

  const fieldMap = [
    {
      label: t("质押代币"),
      value: "pledgeToken1Amount",
      symbol: "pledgeToken1",
      render: (item: FundOrder) => (
        <div className="flex flex-col items-end">
          <span>
            {item.pledgeToken1Amount}
            {item.pledgeToken1}
          </span>
          <span>
            {item.pledgeToken2Amount}
            {item.pledgeToken2}
          </span>
        </div>
      ),
    },
    { label: t("购买总额"), value: "investmentAmount", symbol: "pledgeToken1" },
    { label: t("购买时间"), value: "purchaseTime" },
    { label: t("到期时间"), value: "maturityTime" },
  ];

  const statusText = [
    t("处理中"),
    t("投资中"),
    t("已到期"),
    t("已赎回"),
    t("已取消"),
  ];
  return (
    <>
      <HeaderWithBack
        title={t("购买记录")}
        algin="center"
        path={routerMap.fund}
      />
      <div className="p-content">
        <div className="flex gap-1 items-center bg-secondary h-10 rounded-lg p-1 font-bold text-sm mb-4">
          {tabs.map((tab) => (
            <div
              key={tab.value}
              className={`flex-1 flex items-center justify-center h-full transition-all font-bold text-xs ${
                tabsValue === tab.value
                  ? "text-white font-bold bg-primary rounded-md"
                  : "text-[#61616E]"
              }`}
              onClick={() => setTabsValue(tab.value)}
            >
              {tab.label}
            </div>
          ))}
        </div>
        {list?.length ? (
          list.map((item) => (
            <div key={item.id} className="mb-4">
              <div className="bg-bg1 rounded-md pt-2 px-3.5 pb-5 font-bold text-sm">
                <h3 className="mb-5 flex items-center justify-between">
                  {item.fundType == 1 ? t("稳健基金") : t("策略基金")}
                  <div className="flex items-center gap-1">
                    <div className="rounded-sm px-1.5 py-1 bg-rise text-white text-xs">
                      {statusText[item.status]}
                    </div>
                    <BaseImage
                      src="/images/fund/right-arrow.svg"
                      className="w-3 h-4"
                    />
                  </div>
                </h3>
                <div className="bg-white rounded-md p-4">
                  {fieldMap.map((field) => (
                    <div
                      key={field.value}
                      className="text-sm flex items-center justify-between mb-4"
                    >
                      <span className="font-bold">{field.label}</span>
                      {field.render ? (
                        field.render(item)
                      ) : (
                        <span>
                          {item[field.value as keyof FundOrder]}{" "}
                          {field.symbol
                            ? item[field.symbol as keyof FundOrder]
                            : ""}
                        </span>
                      )}
                    </div>
                  ))}
                  <h3>{t("最大收益进度")}</h3>
                  <progress
                    className="progress progress-gradient1 w-full"
                    value={item.totalProfit || 0}
                    max={item.maxProfit}
                  ></progress>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="font-bold">{t("自动复投")}</span>
                <input
                  type="checkbox"
                  defaultChecked={Boolean(item.isReinvestment)}
                  className="toggle toggle-primary checked:border-primary checked:bg-primary checked:text-white"
                />
              </div>
            </div>
          ))
        ) : (
          <ListNoData />
        )}
      </div>
    </>
  );
};
export default FundRecordView;
