"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import { Icon } from "@/components/icon";
import ViewLayout from "@/components/layout";
import { Modal } from "@/components/modal";
import { useTrans } from "@/hooks/useTrans";
import { routerMap, useRouter } from "@/i18n/navigation";
import { useState } from "react";

const SettingView = () => {
  const t = useTrans();
  const { push } = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const list = [
    { label: "修改登录密码", path: routerMap.settingPassword },
    { label: "谷歌身份验证", path: routerMap.settingGoogleVerify },
    { label: "绑定邮箱", path: routerMap.settingBindEmail },
  ];
  return (
    <ViewLayout
      header={
        <HeaderWithBack title={t("user.securitySettings")} algin="center" />
      }
    >
      <div className="p-content">
        <div className="bg-bg-color2 rounded-md p-4">
          {list.map((v, i) => {
            return (
              <div
                key={i}
                className="flex items-center justify-between font-bold mb-8 last:mb-0"
                onClick={() => v.path && push(v.path)}
              >
                <span>{v.label}</span>
                <Icon name="right-arrow-user" className="w-2 h-3" />
              </div>
            );
          })}
        </div>
        <button className="btn" onClick={() => setModalOpen(true)}>
          test 触发Modal
        </button>
        <Modal
          open={modalOpen}
          title={t("安全提示")}
          onClose={() => setModalOpen(false)}
          onChange={(e) => setModalOpen(e)}
        >
          <div className="font-bold pt-2">
            <p className="text-text2 text-xs text-center">{t("安全提示p")}</p>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <button
                className="btn btn-outline btn-primary"
                onClick={() => setModalOpen(false)}
              >
                {t("稍后绑定")}
              </button>
              <button className="btn btn-primary">
                {t("googleVerify.continueBtn")}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </ViewLayout>
  );
};
export default SettingView;
