import BaseImage from "@/components/base-image";
import { Icon } from "@/components/icon";
import Tabs from "@/components/tabs/tabs";
import { useTrans } from "@/hooks/useTrans";
import { routerMap, useRouter } from "@/i18n/navigation";
import { useState } from "react";

const SmartChatBox = () => {
  const t = useTrans();
  const [tabsValue, setTabsValue] = useState(0);
  const { push } = useRouter();
  const tabsList = [
    { label: t("投资"), value: 0 },
    { label: t("生活实用"), value: 1 },
    { label: t("工作"), value: 2 },
  ];
  const list = [
    [
      { label: t("基金顾问"), desc: t("基金顾问p"), icon: "smart-icon-1-1" },
      { label: t("市场趋势"), desc: t("市场趋势p"), icon: "smart-icon-1-2" },
    ],
    [
      { label: t("旅行攻略"), desc: t("旅行攻略p"), icon: "smart-icon-1-1" },
      { label: t("营养顾问"), desc: t("营养顾问p"), icon: "smart-icon-1-2" },
    ],
    [
      { label: t("活动策划"), desc: t("活动策划p"), icon: "smart-icon-1-1" },
      { label: t("创意写作"), desc: t("创意写作p"), icon: "smart-icon-1-2" },
    ],
  ];
  return (
    <div>
      <h2 className="mt-6 mb-4 font-medium">{t("AI智能聊天")}</h2>
      <Tabs
        tabs={tabsList}
        value={tabsValue}
        onChange={(value) => setTabsValue(Number(value))}
        className="text-base justify-start mb-6"
        between={false}
      />
      {list?.[tabsValue].map((item, index) => (
        <div
          key={item.label + index}
          className="flex items-center justify-between mb-6"
          onClick={() => push(routerMap["helper-ai"])}
        >
          <BaseImage
            src={`/images/home/${item.icon}.png`}
            className="size-12 mr-4"
          />
          <div className="flex-1">
            <h4>{item.label}</h4>
            <p className="text-text2 text-xs mt-2">{item.desc}</p>
          </div>
          <Icon name="right-enter" className="w-1.5 h-2.5" color="var(--color-text1)"/>
        </div>
      ))}
    </div>
  );
};
export default SmartChatBox;
