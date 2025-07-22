import BaseImage from "@/components/base-image";
import { useTrans } from "@/hooks/useTrans";
import { useState } from "react";

const ProcessBox = () => {
  const t = useTrans();
  const [processValue] = useState(1);
  const ProcessList = [
    { title: "购买提交", desc: "随时买入" },
    { title: "AI策略启动", desc: "" },
    { title: "首笔收益到账", desc: "买入后24小时到账" },
  ];
  return (
    <div className="bg-bg-color2 rounded-md py-4 px-3.5">
      <div className="bg-white rounded-md py-4 font-bold">
        <h3 className="text-center">{t("交易流程")}</h3>
        <div className="pl-10">
          {ProcessList.map((item, index) => {
            return (
              <div key={index} className="mt-4 flex items-center gap-2.5">
                <BaseImage
                  src={
                    processValue >= index
                      ? "/images/fund/process-check.png"
                      : "/images/fund/process-dark.png"
                  }
                  className="w-5 h-5"
                />
                <div className="flex flex-col flex-1">
                  <span>{t(item.title)}</span>
                  <span className="text-text2 leading-[120%]">
                    {t(item.desc)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProcessBox;
