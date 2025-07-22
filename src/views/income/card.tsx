import { useTrans } from "@/hooks/useTrans";

const CardBox = () => {
  const t = useTrans();
  const field = [
    { label: "基金类型", value: t("策略基金") },
    { label: "发放金额", value: "9 USDM" },
    { label: "发放时间", value: "2025/03/27 17:42:25" },
  ];
  return (
    <div className="rounded-md px-3.5 pt-2 pb-5 bg-bg-color2 mt-4">
      <h3 className="flex items-center justify-between font-bold">
        <span>{t("投资收益")}</span>
        <div className="badge badge-success rounded-md px-1.5 text-xs">
          {t("已发放")}
        </div>
      </h3>
      <div className="rounded-md bg-white py-4 px-2.5 mt-4 font-bold">
        {field.map((item, index) => {
          return (
            <div key={index} className="flex justify-between items-center mb-4 last:mb-0">
              <span>{item.label}</span>
              <span>{item.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardBox;
