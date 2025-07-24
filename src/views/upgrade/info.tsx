import { Icon } from "@/components/icon";
import { useTrans } from "@/hooks/useTrans";

const InfoBox = () => {
  const t = useTrans();
  return (
    <div className="bg-bg1 rounded-lg p-3 pb-4 mt-4 font-bold">
      <div className="rounded-lg py-2.5 text-center bg-white p-3">
        <h2>{t("币权累计")}</h2>
        <div className="text-[26px] text-primary my-2">299.99 USDM</div>
        <h3 className="text-xs">{t("昨日币权奖励")}</h3>
        <div className="mt-2 flex items-center justify-center gap-1">
          <Icon name="up-arrow-vip" className="w-4.5 h-4.5" />
          991,560.60 USDM
        </div>
        <div className="border-t border-[#F4F1FD] mt-2.5 pt-2.5 flex justify-between">
          <div className="flex flex-col items-start border-r border-[#F4F1FD] flex-1 text-left pr-2 gap-3">
            <span className="leading-[120%]">{t("已提取收益")}</span>
            <span>0.00USDM</span>
          </div>
          <div className="flex flex-col items-end flex-1 text-right pl-2 gap-3">
            <span className="leading-[120%]">{t("未提取收益")}</span>
            <span>0.00USDM</span>
          </div>
        </div>
      </div>
      <button className="btn btn-primary w-full mt-2.5">{t("领取奖励")}</button>
    </div>
  );
};

export default InfoBox;
