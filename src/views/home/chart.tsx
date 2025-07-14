"use client";

import { useState } from "react";
import useSWR from "swr";
import BaseImage from "@/components/base-image";
import BaseTag from "@/components/base-tag";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";
import { api } from "@/api";
import { useRouter } from "@/i18n/navigation";

const ChartBox = () => {
  const [params] = useState({ type: "DAY" });
  const { push } = useRouter();

  //  const getKlineData(type) = {
  //   api.
  // 				request.get('/kline/marketSituation',{type:type}).then(res => {
  // 					this.priceChange24h=res.data?.priceChange24h||0.00;
  // 					const KlineData =res.data?.situationVOS||[];
  // 					this.KlineData = KlineData
  // 					this.upDataChart();
  // 					const lastItem = KlineData.slice(-1)[0] || {}
  // 					this.lastPrice = lastItem?.price || '0'
  // 				}).catch(err => {
  // 				});
  // 			}
  const { data: user, isLoading } = useSWR(
    ["marketSituationUsingGet", params],
    ([, p]) => api.kline.marketSituationUsingGet(p)
  );

  console.log(user, isLoading);

  const option = {
    tooltip: {
      triggerOn: "none", // 不触发 tooltip
    },
    title: {
      left: "center",
      text: " ",
    },
    xAxis: {
      show: false,
      type: "category",
      boundaryGap: false,
      data: [
        "2023-10-01",
        "2023-10-02",
        "2023-10-03",
        "2023-10-04",
        "2023-10-05",
      ],
      axisPointer: {
        show: true,
        type: "line",
        snap: true,
      },
    },
    yAxis: {
      show: false,
      position: "right",
      type: "value",
      boundaryGap: false,
      axisLine: {
        show: false,
      },
      axisLabel: {
        inside: false,
        formatter: "{value}",
      },
      splitLine: {
        show: false,
      },
      axisPointer: {
        show: true,
        type: "line",
        snap: false,
      },
    },
    grid: {
      top: "8px",
      bottom: "5px",
      left: "0px",
      right: "0",
    },
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 100,
      },
    ],
    series: [
      {
        name: "Fake Data",
        type: "line",
        symbol: "none",
        sampling: "lttb",
        itemStyle: {
          color: "rgba(40, 199, 111, 1)",
        },
        lineStyle: {
          width: 2,
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(20, 192, 11, 0.5)",
            },
            {
              offset: 1,
              color: "rgba(40, 199, 111, 0.1)",
            },
          ]),
        },
        data: [
          ["2023-10-01", 100],
          ["2023-10-02", 120],
          ["2023-10-03", 90],
          ["2023-10-04", 150],
          ["2023-10-05", 130],
        ],
      },
    ],
  };
  return (
    <div
      className="bg-white rounded-md py-1.5 px-2 mt-4"
      onClick={() => push("/home/charts")}
    >
      <div className="flex items-center">
        <div className="w-5 h-5 rounded-full bg-[#E1C9FF] p-1 mr-1">
          <BaseImage
            className="w-full h-full"
            src="/images/common/1024x1024.png"
          />
        </div>
        <span className="font-bold text-xs flex-1">9M /USDT</span>
        <BaseTag bgColor="rgba(177, 255, 212, 0.17)" textColor="#43B067">
          +23.1%
        </BaseTag>
      </div>
      <div className="font-bold text-sm text-[#43B067] mt-2">$84,056.00</div>
      <ReactECharts
        option={option}
        style={{ height: "54px", width: "100%" }}
        notMerge={true}
        lazyUpdate={true}
      />
    </div>
  );
};
export default ChartBox;
