"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
import RuleHeaderBox from "./header";
import ProcessBox from "./process";
import FeesDescBox from "./fees";
import RuleDescBox from "./desc";

const FundRuleView = () => {
  const t = useTrans();
  return (
    <ViewLayout
      heightFull
      header={<HeaderWithBack title={t("基金规则")} algin="center" />}
    >
      <div className="p-content">
        <RuleHeaderBox />
        <ProcessBox />
        <FeesDescBox />
        <RuleDescBox />
      </div>
    </ViewLayout>
  );
};
export default FundRuleView;
