import { Icon } from "@/components/icon";
import { ShowIf } from "@/components/show-if";
import { useTrans } from "@/hooks/useTrans";
import { cn } from "@/lib/utils";
import { useState } from "react";

const ProcessBox = () => {
  const t = useTrans();
  const [processValue] = useState(2);
  const ProcessList = [
    { title: "购买提交", desc: "随时买入" },
    { title: "AI策略启动", desc: "" },
    { title: "首笔收益到账", desc: "买入后24小时到账" },
  ];
  return (
    <div>
      <h3 className="font-medium mb-4">{t("交易流程")}</h3>
      <div>
        <ul className="steps steps-vertical">
          {ProcessList.map((v, i) => {
            return (
              <li
                key={i}
                className={cn("step", i < processValue && "step-primary")}
              >
                <ShowIf
                  condition={i < processValue}
                  elseEl={
                    <span className="step-icon !bg-white !border-2"></span>
                  }
                >
                  <span className="step-icon">
                    <Icon name="duigou" />
                  </span>
                </ShowIf>
                <div className="flex flex-col items-start flex-1">
                  <span>{t(v.title)}</span>
                  <span className="text-text2 leading-[120%]">
                    {v.desc && t(v.desc)}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ProcessBox;
