import { useTrans } from "@/hooks/useTrans";

const RuleHeaderBox = () => {
  const t = useTrans();
  return (
    <div className="border-b border-border2 pb-6 mb-8">
      <div className="flex items-center justify-between font-medium text-base mb-6">
        <p>{t("基金周期")}</p>
        <h2>{t("年/季度/月/周")}</h2>
      </div>
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="text-text2 text-left">{t("起投金额")}</span>
        <span className="text-right">{t("等值") + " 100usdt"}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-text2 text-left">{t("收益周期")}</span>
        <span className="text-right">24h</span>
      </div>
    </div>
  );
};
export default RuleHeaderBox;
