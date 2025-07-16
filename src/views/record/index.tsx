"use client";

import { useState } from "react";
import BaseImage from "@/components/base-image";
import { HeaderWithBack } from "@/components/header-with-back";
import { useTrans } from "@/hooks/useTrans";

const FundRecordView = () => {
  const t = useTrans();
  const [tabsValue, setTabsValue] = useState("");
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

  const list = [
    {
      id: 31,
      pledgeId: null,
      fundId: null,
      fundType: 2,
      investmentAmount: 1000,
      pledgeToken1: "USDT",
      pledgeToken1Logo:
        "https://861276122348apse1.s3.ap-southeast-1.amazonaws.com/20250428/22.png",
      pledgeToken1Amount: 700,
      pledgeToken2: "USDT",
      pledgeToken2Logo:
        "https://861276122348apse1.s3.ap-southeast-1.amazonaws.com/20250428/22.png",
      pledgeToken2Amount: 300,
      fundCycleDays: null,
      purchaseTime: "2025-05-24 20:13:52",
      status: 1,
      maturityTime: "2026-05-19 20:13:52",
      maxProfit: 12240,
      totalProfit: 117,
      dailyYield: 2,
      isReinvestment: true,
      userId: 55001,
      orderType: "FUND",
      isPayRefund: true,
    },
  ];

  const fieldMap = [
    {
      label: t("质押代币"),
      value: "pledgeToken1Amount",
      symbol: "pledgeToken1",
    },
    { label: t("购买总额"), value: "investmentAmount", symbol: "pledgeToken1" },
    { label: t("购买时间"), value: "purchaseTime" },
    { label: t("到期时间"), value: "maturityTime" },
  ];
  return (
    <>
      <HeaderWithBack title={t("购买记录")} algin="center" />
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
            <div key={item.id}>
              <div className="bg-[#F6F7FD] rounded-md pt-2 px-3.5 pb-5 font-bold text-sm">
                <h3 className="mb-5 flex items-center justify-between">
                  {t("策略基金")}
                  <div className="flex items-center gap-1">
                    <div className="rounded-sm px-1.5 py-1 bg-text-rise text-white text-xs">
                      investing
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
                      {/* {item[field.value]} {item[field.symbol]} */}
                    </div>
                  ))}
                  <h3>{t("最大收益进度")}</h3>
                  <progress
                    className="progress progress-gradient1 w-full"
                    value="10"
                    max="100"
                  ></progress>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="font-bold">{t("自动复投")}</span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="toggle toggle-primary checked:border-primary checked:bg-primary checked:text-white"
                />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-10">
            <BaseImage
              src="/images/common/no_data.png"
              className="w-[304px] h-[197px] mx-auto"
            />
            <span className="font-bold text-text2 text-sm">
              {t("暂无更多数据")}
            </span>
          </div>
        )}
      </div>
    </>
  );
};
export default FundRecordView;
