import { api } from "@/api";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { useTrans } from "@/hooks/useTrans";
import ReactECharts from "echarts-for-react";

const FeesDescBox = () => {
  const t = useTrans();

  const { data } = useRequestQuery(api.platformConfig.infoUsingGet1, {});

  const feesData = data?.data;

  const feesList = [
    { title: "平台分红", value: feesData?.platformDividend, color: "#F2B84B" },
    {
      title: "用户投资收益",
      value: feesData?.investmentReturn,
      color: "#F9D976",
    },
    { title: "管理费", value: feesData?.managementFee, color: "#000000" },
  ];

  const option = {
    tooltip: null,
    series: [
      {
        name: "",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: feesData?.platformDividend, name: t("平台分红") },
          { value: feesData?.investmentReturn, name: t("用户投资收益") },
          { value: feesData?.managementFee, name: t("管理费") },
        ],
      },
    ],
    color: ["#F2B84B", "#F9D976", "#000000"],
  };
  return (
    <div className="border-y border-border2 py-6">
      <h3 className="font-medium leading-6 mb-2">{t("运作费用说明")}</h3>
      <p className="text-text2 leading-4 text-sm mb-6">{t("运作费用说明p")}</p>
      <div className="flex justify-between gap-2">
        {feesList.map((v, i) => {
          return (
            <div key={i} className="flex gap-2">
              <div
                className="w-2 h-2 mt-1.5"
                style={{ backgroundColor: v.color }}
              ></div>
              <div className="flex-1">
                <h5 className="text-sm">{t(v.title)}</h5>
                <span style={{ color: v.color }}>{v.value}%</span>
              </div>
            </div>
          );
        })}
      </div>
      <ReactECharts
        option={option}
        style={{ height: "135px", width: "135px", margin: "0 auto" }}
        notMerge={true}
        lazyUpdate={true}
      />
    </div>
  );
};

export default FeesDescBox;
