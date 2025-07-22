import { useTrans } from "@/hooks/useTrans";

const FeesDescBox = () => {
  const t = useTrans();
  const feesList = [
    { title: "管理费", value: "1" },
    { title: "平台分红", value: "2" },
    { title: "用户投资收益", value: "3" },
  ];
  return (
    <div>
      <h3 className="font-bold mt-4 mb-2">{t("运作费用说明")}</h3>
      <p className="font-[510] text-text2 leading-[120%] text-xs">
        {t("运作费用说明p")}
      </p>
      <div className="bg-bg-color2 rounded-md px-3.5 py-4 font-bold mt-4">
        <h3 className="flex justify-between items-start gap-1 leading-[120%]">
          <span className="text-left flex-1/3">{t("费用名称")}</span>
          <span className="text-text2 text-right flex-2/3">
            {t("基金收益分配占比")}
          </span>
        </h3>
        <div className="bg-white rounded-md py-4 px-2.5 mt-4">
          {feesList.map((item, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-between mb-4 last:mb-0"
              >
                <span className="text-left">{t(item.title)}</span>
                <span className="text-right">{item.value}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeesDescBox;
