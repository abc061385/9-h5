import * as echarts from "echarts/core";
export const defaultChartOption = {
  tooltip: {
    trigger: "axis",
    position: function (
      pt: [number, number],
      params: string,
      dom: string,
      rect: string,
      size: { viewSize: [number, number]; contentSize: [number, number] },
    ) {
      const [x, y] = pt; // 鼠标位置
      const viewWidth = size.viewSize[0];
      const boxWidth = size.contentSize[0];
      const boxHeight = size.contentSize[1];

      let posX = x + 10;
      let posY = y - boxHeight - 10;

      if (posX + boxWidth > viewWidth) {
        posX = x - boxWidth - 10;
      }
      if (posY < 0) {
        posY = y + 10;
      }
      return [posX, posY];
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
    top: "20px",
    bottom: "30px",
    left: "50px",
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
