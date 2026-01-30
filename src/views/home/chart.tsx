"use client";

import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import BaseImage from "@/components/base-image";
import BaseTag from "@/components/base-tag";
import ReactECharts from "echarts-for-react";
import { api } from "@/api";
import { useRouter } from "@/i18n/navigation";
import { defaultChartOption } from "./defaultChartsOption";

type Item = {
  priceTime: string;
  price: number;
};
const ChartBox = () => {
  const [params] = useState({ type: "DAY" });
  const { push } = useRouter();

  const { data } = useSWR(["marketSituationUsingGet", params], ([, p]) =>
    api.kline.marketSituationUsingGet(p),
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
    <div
      className="bg-white rounded-md py-1.5 px-2 mt-4"
      onClick={() => push("/home/charts")}
    >
      <div className="flex items-center">
        <div className="w-5 h-5 rounded-full bg-[#E1C9FF] p-[1PX] mr-1">
          <BaseImage
            className="w-full h-full"
            src="/images/common/1024x1024.svg"
          />
        </div>
        <span className="font-bold text-xs flex-1">9M /USDT</span>
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
      <div className="font-bold text-sm text-[#43B067] mt-2">${lastPrice}</div>
      <ReactECharts
        option={chartOption}
        style={{ height: "54px", width: "100%" }}
        notMerge={true}
        lazyUpdate={true}
      />
    </div>
  );
};
export default ChartBox;
