"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
import CoinIcon from "../coin-icon";
import BuyingBox from "./buying";

const FundBuyView = () => {
  const t = useTrans();
  const rateList = [
    { label: 360, value: "+2%" },
    { label: 180, value: "+1.8%" },
    { label: 90, value: "+1.6%" },
    { label: 30, value: "+1.2%" },
    { label: 7, value: "+1%" },
  ];
  return (
    <ViewLayout header={<HeaderWithBack title={t("买入")} algin="center" />}>
      <div className="p-content font-bold">
        <div className="bg-bg-color2 rounded-md py-4 px-3.5">
          <div className="bg-white rounded-md py-7 px-9 flex justify-between text-xs">
            <div>
              <h3>{t("质押代币")}</h3>
              <p className="my-1.5 font-[510]">USDT / USDT</p>
              <CoinIcon
                coins={[
                  {
                    src: "https://861276122348apse1.s3.ap-southeast-1.amazonaws.com/20250428/22.png",
                  },
                  {
                    src: "https://861276122348apse1.s3.ap-southeast-1.amazonaws.com/20250428/22.png",
                  },
                ]}
                overlap={16}
                className="justify-center"
              />
            </div>
            <div className="text-center">
              <h3>{t("产出代币")}</h3>
              <p className="my-1.5 font-[510]">USDM</p>
              <CoinIcon
                coins={[
                  {
                    src: "https://861276122348apse1.s3.ap-southeast-1.amazonaws.com/20250428/22.png",
                  },
                ]}
                className="justify-center"
              />
            </div>
          </div>
          <div className="bg-white rounded-md py-4 px-2.5 mt-5">
            <h3 className="text-center">{t("日收益率")}</h3>
            {rateList.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between items-center mt-4"
                >
                  <span>
                    {item.label} {t("天")}
                  </span>
                  <span>{item.value}</span>
                </div>
              );
            })}
          </div>
        </div>
        <BuyingBox />
      </div>
    </ViewLayout>
  );
};

export default FundBuyView;
