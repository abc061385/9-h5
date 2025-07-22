"use client";

import BaseImage from "@/components/base-image";
import { HeaderWithBack } from "@/components/header-with-back";
import { Icon } from "@/components/icon";
import ViewLayout from "@/components/layout";
import { Qrcode } from "@/components/qrcode";
import { useTrans } from "@/hooks/useTrans";

const InviteView = () => {
  const t = useTrans();
  return (
    <ViewLayout
      header={<HeaderWithBack title={t("邀请好友")} algin="center" />}
    >
      <div className="p-content relative">
        <BaseImage
          src="/images/invite/invite-bg.png"
          className="w-[340px] h-[430px] absolute"
        />
        <div className="relative z-1">
          <div className="w-[184px] h-[184px] mx-auto mt-19 p-2 bg-white">
            <Qrcode value={"1"} />
          </div>
          <div className="w-50 mx-auto text-center font-bold text-white mt-25">
            {t("invite.scanQRCodeTip")}
          </div>
        </div>
        <div className="flex items-center justify-between mt-20 h-10 bg-bg-color2 rounded-md px-2">
          <span className="font-medium">{t("invite.inviteCode")}</span>
          <span className="font-bold flex items-center gap-1">
            5QX62004
            <Icon name="copy-user" />
          </span>
        </div>

        <div className="flex items-center justify-between mt-4 h-10 bg-bg-color2 rounded-md px-2">
          <span className="font-medium">{t("invite.inviteLink")}</span>
          <span className="font-bold flex items-center gap-1 text-primary">
            https：//www.9mc.org
            <Icon name="copy-user" />
          </span>
        </div>
      </div>
    </ViewLayout>
  );
};
export default InviteView;
