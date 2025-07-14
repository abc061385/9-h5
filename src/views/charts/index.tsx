"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import { useTrans } from "@/hooks/useTrans";
import * as echarts from "echarts/core";
import ReactECharts from "echarts-for-react";
import Tabs from "@/components/tabs";
import { useState } from "react";

const ChartsView = () => {
  const [tabsValue, setTabsValue] = useState<string | number>("DAY");
  const t = useTrans();
  const option = {
    tooltip: {
      trigger: "axis",
      position: function (pt: unknown[]) {
        return [pt[0], "10%"];
      },
      axisPointer: {
        handle: {
          show: true,
        },
        type: "cross",
        snap: true,
      },
    },
    title: {
      left: "center",
      text: " ",
    },
    xAxis: {
      show: true,
      type: "category",
      boundaryGap: true,
      data: ["1/1/17", "1/1/18", "1/1/19", "1/1/20", "1/1/21"],
      axisPointer: {
        show: false,
        type: "line",
        snap: true,
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: "none",
          width: 0,
        },
      },
      axisLabel: {
        inside: true,
        margin: -20,
        color: "#61616E",
        fontSize: 12,
        formatter: function (value: string) {
          return value;
        },
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: [
      {
        show: true,
        position: "left",
        type: "value",
        boundaryGap: true,
        axisLabel: {
          align: "right",
          inside: true,
          margin: 25,
          color: "#9D95B5",
          fontSize: 12,
          formatter: function (value: number) {
            return `$${value}`;
          },
        },
        splitLine: {
          show: false,
        },
      },
      {
        show: true,
        position: "right",
        axisLabel: {
          inside: true,
          align: "left",
          margin: 25,
          color: "#9D95B5",
          fontSize: 12,
          formatter: function (value: number) {
            return `${value}`;
          },
        },
        splitLine: { show: false },
      },
    ],
    grid: {
      top: "8px",
      bottom: "25px",
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
        yAxisIndex: 1,
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
          ["1/1/17", 100],
          ["1/1/18", 120],
          ["1/1/19", 90],
          ["1/1/20", 150],
          ["1/1/21", 130],
        ],
      },
      {
        name: "dummy",
        type: "line",
        yAxisIndex: 0, // 右轴
        data: [0, 0, 0, 0, 0],
        lineStyle: { opacity: 0 },
        showSymbol: false,
        tooltip: { show: false },
      },
    ],
  };

  const tabsList = [
    { label: t("日"), value: "DAY" },
    { label: t("周"), value: "WEEK" },
    { label: t("月"), value: "MONTH" },
    { label: t("年"), value: "YEAR" },
    { label: t("walletDetail.all"), value: "" },
  ];
  return (
    <div className="p-content">
      <HeaderWithBack />
      <div className="h-5"></div>
      <h2 className="font-bold">Coin Price Trend</h2>
      <div className="text-text-rise font-bold text-[26px] my-2">
        $84,056.00
      </div>
      <p className="font-bold text-xs text-[#61616E]">
        {t("近24小时涨幅")} (22/05/2025)
      </p>
      <div className="font-bold mt-10.5 mb-3.5 text-center">
        9M AI Search & Price
      </div>
      <div className="font-bold text-[10px] flex justify-center items-center">
        <p className="w-4 h-2 bg-text-rise mr-1"></p>
        9M AI price trends
      </div>
      <Tabs
        tabs={tabsList}
        value={tabsValue}
        onChange={(e) => setTabsValue(e)}
        type="segment"
        className="my-4"
      />
      <ReactECharts
        option={option}
        style={{ height: "160px", width: "100%" }}
        notMerge={true}
        lazyUpdate={true}
      />
    </div>
  );
};
export default ChartsView;
