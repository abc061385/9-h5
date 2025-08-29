"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import { Icon } from "@/components/icon";
import ViewLayout from "@/components/layout";
import { Modal } from "@/components/modal";
import { useTrans } from "@/hooks/useTrans";
import { routerMap, useRouter } from "@/i18n/navigation";
import { maskString } from "@/lib/utils";
import { useUserStore } from "@/store/useUserStore";
import { useEffect, useState } from "react";

const SettingView = () => {
  const t = useTrans();
  const { push } = useRouter();
  const { userInfo } = useUserStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [googleModalOpen, setGoogleModalOpen] = useState(false);
  const list = [
    { label: t("security.changePassword"), path: routerMap.settingPassword },
    { label: t("security.googleAuth"), path: routerMap.settingGoogleVerify },
    {
      label: t("绑定邮箱"),
      path: routerMap.settingBindEmail,
      value: userInfo?.bindEmail
        ? maskString(userInfo?.bindEmail, 3, 2)
        : t("enhanceSecurity"),
    },
  ];

  useEffect(() => {
    if (!userInfo.googleVerify) return setGoogleModalOpen(true);
    if (!userInfo?.bindEmail && userInfo.accountType !== 2)
      //accountType = 2 为子账号，子账号没有邮箱。所以不弹这个提示
      return setModalOpen(true);
  }, [userInfo]);
  return (
    <ViewLayout
      header={
        <HeaderWithBack title={t("user.securitySettings")} algin="center" />
      }
    >
      <div className="p-content">
        <div className="leading-5">
          {list.map((v, i) => {
            return (
              <div
                key={i}
                className="flex items-center justify-between py-6 border-b border-border2 last:border-0"
                onClick={() => v.path && push(v.path)}
              >
                <span className="flex-1">{v.label}</span>

                <span className="text-text4 text-xs mr-2">{v.value}</span>
                <Icon name="right-enter" className="w-1.5 h-2.5" />
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
