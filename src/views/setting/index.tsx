"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import { Icon } from "@/components/icon";
import ViewLayout from "@/components/layout";
import { Modal } from "@/components/modal";
import { useTrans } from "@/hooks/useTrans";
import { routerMap, useRouter } from "@/i18n/navigation";
import { useUserStore } from "@/store/useUserStore";
import { useEffect, useState } from "react";

const SettingView = () => {
  const t = useTrans();
  const { push } = useRouter();
  const { userInfo } = useUserStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [googleModalOpen, setGoogleModalOpen] = useState(false);
  const list = [
    { label: "修改登录密码", path: routerMap.settingPassword },
    { label: "谷歌身份验证", path: routerMap.settingGoogleVerify },
    { label: "绑定邮箱", path: routerMap.settingBindEmail },
  ];

  useEffect(() => {
    if (!userInfo.googleVerify) return setGoogleModalOpen(true);
    if (!userInfo?.bindEmail) return setModalOpen(true);
  }, [userInfo]);
  return (
    <ViewLayout
      header={
        <HeaderWithBack title={t("user.securitySettings")} algin="center" />
      }
    >
      <div className="p-content">
        <div className="bg-bg1 rounded-md p-4">
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
              <button
                className="btn btn-primary"
                onClick={() => push(routerMap.settingBindEmail)}
              >
                {t("googleVerify.continueBtn")}
              </button>
            </div>
          </div>
        </Modal>
        <Modal
          close={false}
          open={googleModalOpen}
          onClose={() => setGoogleModalOpen(false)}
        >
          <div className="pt-2 text-center">
            <Icon name="google-verify" className="w-13 h-12" />
            <h2 className="text-lg mt-8 mb-4 font-bold">{t("安全提示")}</h2>
            <p className="text-text4 text-sm">
              {t("login.loginSuccessContent")}
            </p>
            <button
              className="btn btn-primary w-full mt-8 mb-2"
              onClick={() => push(routerMap.settingGoogleVerify)}
            >
              {t("login.bind")}
            </button>
            <button
              className="btn btn-outline w-full"
              onClick={() => setGoogleModalOpen(false)}
            >
              {t("common.cancel")}
            </button>
          </div>
        </Modal>
      </div>
    </ViewLayout>
  );
};
export default SettingView;
