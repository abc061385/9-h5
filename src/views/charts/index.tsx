"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import { useTrans } from "@/hooks/useTrans";
import ReactECharts from "echarts-for-react";
import Tabs from "@/components/tabs/tabs";
import { useEffect, useMemo, useState } from "react";
import { api } from "@/api";
import useSWR from "swr";
import { defaultChartOption } from "./defaultChartsOption";
import BaseTag from "@/components/base-tag";
import { utils } from "@/lib/utils";

type Item = {
  priceTime: string;
  price: number;
};

const ChartsView = () => {
  const [tabsValue, setTabsValue] = useState<string>("DAY");
  const t = useTrans();

  const tabsList = [
    { label: t("日"), value: "DAY" },
    { label: t("周"), value: "WEEK" },
    { label: t("月"), value: "MONTH" },
    { label: t("年"), value: "YEAR" },
    { label: t("walletDetail.all"), value: "" },
  ];
  const { data } = useSWR(
    ["marketSituationUsingGet", { type: tabsValue }],
    ([, p]) => api.kline.marketSituationUsingGet(p),
  );

  const priceChange24h = useMemo(() => {
    return data?.data?.priceChange24h || 0;
  }, [data]);
  const klineData = useMemo(() => {
    return data?.data?.situationVOS || [];
  }, [data]);

  const lastPrice = useMemo(() => {
    return klineData.slice(-1)[0]?.price || 0;
  }, [klineData]);

  const [chartOption, setChartOption] = useState(defaultChartOption);

  useEffect(() => {
    if (!klineData.length) return;

    const x_data = klineData.map((item: Item) => item.priceTime);
    const y_data = klineData.map((item: Item) => item.price);

    setChartOption((prev) => ({
      ...prev,
      xAxis: {
        ...prev.xAxis,
        data: x_data,
      },
      series: [
        {
          ...prev.series[0],
          data: y_data,
        },
      ],
    }));
  }, [klineData]);

  return (
    <>
      <HeaderWithBack />
      <div className="p-content">
        <div className="h-5"></div>
        <h2 className="font-bold text-xl">9MC/USDT</h2>
        <div className="text-rise font-bold text-sm my-2 flex items-center">
          <span className="mr-2">${lastPrice}</span>
          {priceChange24h > 0 ? (
            <BaseTag bgColor="rgba(177, 255, 212, 0.17)" textColor="#43B067">
              +{priceChange24h}%
            </BaseTag>
          ) : (
            <BaseTag bgColor="rgba(255, 177, 177, 0.17)" textColor="#FF4D4F">
              -{priceChange24h}%
            </BaseTag>
          )}
        </div>
        <p className="font-bold text-xs text-[#61616E]">
          {t("近24小时涨幅")} ({utils.dayjs().format("YYYY-MM-DD")})
        </p>
        {/* <div className="font-bold mt-10.5 mb-3.5 text-center"> */}
        {/*   9M AI Search & Price */}
        {/* </div> */}
        {/* <div className="font-bold text-[10px] flex justify-center items-center"> */}
        {/*   <p className="w-4 h-2 bg-rise mr-1"></p> */}
        {/*   9M AI price trends */}
        {/* </div> */}
        <Tabs
          tabs={tabsList}
          value={tabsValue}
          onChange={(v) => setTabsValue(v as string)}
          type="segment"
          className="my-4"
        />
        <ReactECharts
          option={chartOption}
          style={{ height: "28rem", width: "100%" }}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>
    </>
  );
};
export default ChartsView;
