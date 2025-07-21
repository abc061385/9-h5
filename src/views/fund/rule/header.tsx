import { useTrans } from "@/hooks/useTrans";

const RuleHeaderBox = () => {
  const t = useTrans();
  return (
    <div className="bg-[#F6F7FD] rounded-md py-4 px-3.5">
      <div className="bg-white rounded-md py-4 text-center font-bold">
        <h2 className="text-base text-primary mb-2">{t("年/季度/月/周")}</h2>
        <p className="text-[#61616E] text-xs">{t("基金周期")}</p>
      </div>
      <div className="flex items-center justify-between font-bold mb-3 mt-4">
        <span className="text-left">{t("起投金额")}</span>
        <span className="text-right">{t("等值") + " 100usdt"}</span>
      </div>
      <div className="flex items-center justify-between font-bold">
        <span className="text-left">{t("收益周期")}</span>
        <span className="text-right">24h</span>
      </div>
    </div>
  );
};
export default RuleHeaderBox;
