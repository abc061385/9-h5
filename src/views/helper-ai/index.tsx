"use client";

import BaseImage from "@/components/base-image";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";

const HelperAIView = () => {
  const t = useTrans();
  return (
    <ViewLayout header={<HeaderWithBack title={t("AI助手")} algin="center" />}>
      <div className="p-content">
        <BaseImage src="/images/common/logo.svg" className="w-20 h-8 mb-10" />
        <h2 className="font-bold text-lg text-primary">{t("ai嗨")}</h2>
        <p className="font-bold text-xs mt-4">{t("ai介绍")}</p>
        <label className="input h-10 w-[92%] py-1.5  pr-1 fixed bottom-8">
          <input type="text" className="grow" placeholder="hi" />
          <span className="btn btn-primary h-full text-xs font-bold">
            {t("发送")}
          </span>
        </label>
      </div>
    </ViewLayout>
  );
};
export default HelperAIView;
