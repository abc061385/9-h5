"use client";

import { useState } from "react";
import { Icon } from "@/components/icon";
import { useTrans } from "@/hooks/useTrans";
import CoinIcon from "./coin-icon";
import { cn } from "@/lib/utils";

const ListBox = () => {
  const t = useTrans();
  const [tabsValue, setTabsValue] = useState("2");

  const tabs = [
    {
      label: t("策略基金"),
      value: "2",
    },
    {
      label: t("稳健基金"),
      value: "1",
    },
  ];

  const tokenList = [
    {
      id: 364,
      productId: 5,
      productType: 2,
      pledgeToken1: "USDT",
      pledgeToken1Logo:
        "https://861276122348apse1.s3.ap-southeast-1.amazonaws.com/20250428/22.png",
      pledgeToken2: "USDT",
      pledgeToken2Logo:
        "https://861276122348apse1.s3.ap-southeast-1.amazonaws.com/20250428/22.png",
      pledgeDays: 90,
      dailyYield: 1.6,
    },
    {
      id: 354,
      productId: 18,
      productType: 2,
      pledgeToken1: "USDT",
      pledgeToken1Logo:
        "https://861276122348apse1.s3.ap-southeast-1.amazonaws.com/20250428/22.png",
      pledgeToken2: "SHIB",
      pledgeToken2Logo:
        "https://861276122348apse1.s3.ap-southeast-1.amazonaws.com/20250522/WechatIMG2142.jpg",
      pledgeDays: 90,
      dailyYield: 1.6,
    },
    {
      id: 345,
      productId: 11,
      productType: 2,
      pledgeToken1: "USDT",
      pledgeToken1Logo:
        "https://861276122348apse1.s3.ap-southeast-1.amazonaws.com/20250428/22.png",
      pledgeToken2: "DOGE",
      pledgeToken2Logo:
        "https://861276122348apse1.s3.ap-southeast-1.amazonaws.com/20250522/dogecoin-doge-logo.png",
      pledgeDays: 90,
      dailyYield: 1.6,
    },
    {
      id: 340,
      productId: 8,
      productType: 2,
      pledgeToken1: "USDT",
      pledgeToken1Logo:
        "https://861276122348apse1.s3.ap-southeast-1.amazonaws.com/20250428/22.png",
      pledgeToken2: "ETH",
      pledgeToken2Logo:
        "https://861276122348apse1.s3.ap-southeast-1.amazonaws.com/20250522/WechatIMG2089.jpg",
      pledgeDays: 90,
      dailyYield: 1.6,
    },
    {
      id: 309,
      productId: 17,
      productType: 2,
      pledgeToken1: "USDT",
      pledgeToken1Logo:
        "https://861276122348apse1.s3.ap-southeast-1.amazonaws.com/20250428/22.png",
      pledgeToken2: "XRP",
      pledgeToken2Logo:
        "https://861276122348apse1.s3.ap-southeast-1.amazonaws.com/20250522/WechatIMG2130.jpg",
      pledgeDays: 90,
      dailyYield: 1.6,
    },
    {
      id: 304,
      productId: 16,
      productType: 2,
      pledgeToken1: "USDT",
      pledgeToken1Logo:
        "https://861276122348apse1.s3.ap-southeast-1.amazonaws.com/20250428/22.png",
      pledgeToken2: "WLD",
      pledgeToken2Logo:
        "https://861276122348apse1.s3.ap-southeast-1.amazonaws.com/20250522/WechatIMG2146.jpg",
      pledgeDays: 90,
      dailyYield: 1.6,
    },
    {
      id: 299,
      productId: 15,
      productType: 2,
      pledgeToken1: "USDT",
      pledgeToken1Logo:
        "https://861276122348apse1.s3.ap-southeast-1.amazonaws.com/20250428/22.png",
      pledgeToken2: "USDC",
      pledgeToken2Logo:
        "https://861276122348apse1.s3.ap-southeast-1.amazonaws.com/20250522/WechatIMG2147.jpg",
      pledgeDays: 90,
      dailyYield: 1.6,
    },
    {
      id: 294,
      productId: 14,
      productType: 2,
      pledgeToken1: "USDT",
      pledgeToken1Logo:
        "https://861276122348apse1.s3.ap-southeast-1.amazonaws.com/20250428/22.png",
      pledgeToken2: "FIL",
      pledgeToken2Logo:
        "https://861276122348apse1.s3.ap-southeast-1.amazonaws.com/20250522/WechatIMG2145.jpg",
      pledgeDays: 90,
      dailyYield: 1.6,
    },
    {
      id: 289,
      productId: 13,
      productType: 2,
      pledgeToken1: "USDT",
      pledgeToken1Logo:
        "https://861276122348apse1.s3.ap-southeast-1.amazonaws.com/20250428/22.png",
      pledgeToken2: "ADA",
      pledgeToken2Logo:
        "https://861276122348apse1.s3.ap-southeast-1.amazonaws.com/20250522/WechatIMG2134.jpg",
      pledgeDays: 90,
      dailyYield: 1.6,
    },
    {
      id: 284,
      productId: 12,
      productType: 2,
      pledgeToken1: "USDT",
      pledgeToken1Logo:
        "https://861276122348apse1.s3.ap-southeast-1.amazonaws.com/20250428/22.png",
      pledgeToken2: "SUI",
      pledgeToken2Logo:
        "https://861276122348apse1.s3.ap-southeast-1.amazonaws.com/20250522/WechatIMG2141.jpg",
      pledgeDays: 90,
      dailyYield: 1.6,
    },
    {
      id: 269,
      productId: 10,
      productType: 2,
      pledgeToken1: "USDT",
      pledgeToken1Logo:
        "https://861276122348apse1.s3.ap-southeast-1.amazonaws.com/20250428/22.png",
      pledgeToken2: "TRX",
      pledgeToken2Logo:
        "https://861276122348apse1.s3.ap-southeast-1.amazonaws.com/20250522/WechatIMG2135.jpg",
      pledgeDays: 90,
      dailyYield: 1.6,
    },
    {
      id: 264,
      productId: 9,
      productType: 2,
      pledgeToken1: "USDT",
      pledgeToken1Logo:
        "https://861276122348apse1.s3.ap-southeast-1.amazonaws.com/20250428/22.png",
      pledgeToken2: "SOL",
      pledgeToken2Logo:
        "https://861276122348apse1.s3.ap-southeast-1.amazonaws.com/20250522/solana-sol-logo.png",
      pledgeDays: 90,
      dailyYield: 1.6,
    },
    {
      id: 259,
      productId: 7,
      productType: 2,
      pledgeToken1: "USDT",
      pledgeToken1Logo:
        "https://861276122348apse1.s3.ap-southeast-1.amazonaws.com/20250428/22.png",
      pledgeToken2: "BTC",
      pledgeToken2Logo:
        "https://861276122348apse1.s3.ap-southeast-1.amazonaws.com/20250522/WechatIMG2088.jpg",
      pledgeDays: 90,
      dailyYield: 1.6,
    },
    {
      id: 254,
      productId: 6,
      productType: 2,
      pledgeToken1: "USDT",
      pledgeToken1Logo:
        "https://861276122348apse1.s3.ap-southeast-1.amazonaws.com/20250428/22.png",
      pledgeToken2: "BNB",
      pledgeToken2Logo:
        "https://861276122348apse1.s3.ap-southeast-1.amazonaws.com/20250522/WechatIMG2131 1.jpg",
      pledgeDays: 90,
      dailyYield: 1.6,
    },
  ];
  return (
    <div className="mt-4">
      <div role="tablist" className="tabs tabs-box">
        {tabs.map((tab) => (
          <a
            role="tab"
            className={cn("tab", tab.value === tabsValue && "tab-active")}
            key={tab.value}
            onClick={() => setTabsValue(tab.value)}
          >
            {tab.label}
          </a>
        ))}
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center">
          <span className="font-bold text-xs">{t("质押周期")}：</span>
          <div className="py-1.5 px-2 rounded-md bg-secondary font-bold text-xs flex items-center gap-1">
            360 days <Icon name="left-arrow" size={12} className="rotate-270" />
          </div>
        </div>
        <span className="flex items-center text-[#8F00FF] text-xs font-510">
          {t("基金规则")} <Icon name="right-arrow" size={12} />
        </span>
      </div>
      {tokenList.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between p-2 mt-2 font-bold"
        >
          <div className="flex items-center">
            <CoinIcon
              coins={[
                { src: item.pledgeToken1Logo },
                { src: item.pledgeToken2Logo },
              ]}
              size={28}
              overlap={16}
              className="mr-5"
            />

            <div className="flex-1 font-bold text-sm">
              {item.pledgeToken1}/{item.pledgeToken2}
            </div>
          </div>
          <div className="text-text2 text-sm font-[510]">
            {t("日收益率")}：{item.dailyYield}%
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListBox;
