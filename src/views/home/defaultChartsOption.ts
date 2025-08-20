import * as echarts from "echarts/core";
export const defaultChartOption = {
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
    axisPointer: {
      show: true,
      type: "line",
      snap: true,
    },
  },
  yAxis: {
    show: true,
    position: "left",
    type: "value",
    boundaryGap: [0, 0],
    strictMinMax: true,
    min: function (value: { min: number }) {
      return value.min;
    },
    max: function (value: { max: number }) {
      return value.max;
    },
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
      snap: true,
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
      name: "Price",
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
      data: [],
    },
  ],
};
