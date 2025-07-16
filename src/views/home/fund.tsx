"use client";
import { useTrans } from "@/hooks/useTrans";
import Image from "next/image";

const FundBox = () => {
  const t = useTrans();

  const fundList = [
    {
      label: "起投金额",
      value: t("等值") + " 100usdt",
    },
    {
      label: "收益周期",
      value: "24h",
    },
    {
      label: "预估日收益率",
      value: "2.0%～1.0%",
    },
  ];

  return (
    <div>
      <h2 className="mb-4 font-[860] text-base">
        {t("9M基金推荐")}
      </h2>
      <div className="bg-white rounded-lg p-2 relative">
        <div className="bg-[#F6F7FD] rounded-lg p-3.5 text-center">
          <h3 className="text-primary font-[860] text-base">
            {t("年/季度/月/周")}
          </h3>
          <p className="text-[#61616E] font-[510] text-xs my-2">
            {t("基金周期")}
          </p>
          {fundList.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-start mb-4 text-sm font-medium last:mb-1"
            >
              <span className="text-left">{t(item.label)}</span>
              <span className="text-right">{item.value}</span>
            </div>
          ))}
        </div>
        <button className="btn btn-primary w-full mt-5 mb-4">
          {t("立即买入")}
        </button>
        <div className="text-xs text-text2 font-[510]">
          {t("基金推荐描述")}
        </div>
        <div className="w-14 h-14 absolute right-2 top-[-26px]">
          <Image src="/images/home/fund_mark.png" alt={""} fill />
        </div>
      </div>
    </div>
  );
};

export default FundBox;
