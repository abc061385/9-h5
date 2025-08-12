"use client";

import CopyText from "@/components/copy-text";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { Qrcode } from "@/components/qrcode";
import { useTrans } from "@/hooks/useTrans";
import { routerMap } from "@/i18n/navigation";
import { useUserStore } from "@/store/useUserStore";
import { useLocale } from "next-intl";
import Image from "next/image";
import toast from "react-hot-toast";

const InviteView = () => {
  const t = useTrans();
  const { userInfo } = useUserStore();
  const locale = useLocale();

  return (
    <ViewLayout
      header={
        <HeaderWithBack title={t("邀请好友")} algin="center" theme="dark" />
      }
      className="bg-black flex flex-col h-max md-pc:h-full"
      heightFull
    >
      <div>
        <Image
          src="/images/invite/invite-bg.png"
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          className="relative top-[-80px] mb-[-64px]"
        />
      </div>
      <div className="relative p-content flex-1 flex flex-col pb-6">
        <div className="relative z-1 flex text-white justify-between grow">
          <div className="flex-1">
            <div className="flex flex-col gap-1">
              <span className="text-text5 text-sm leading-4">
                {t("invite.inviteCode")}
              </span>
              <span className="font-bold flex items-center gap-1 leading-4">
                {userInfo.invitationCode || "-"}
                <CopyText
                  text={userInfo.invitationCode || ""}
                  className="mt-0.5"
                  theme="light"
                />
              </span>
            </div>
            <div className="flex flex-col mt-6 gap-1">
              <span className="text-text5 text-sm  leading-4">
                {t("invite.inviteLink")}
              </span>
              <span className="font-bold flex items-center gap-1 flex-1  leading-4">
                <span className="truncate max-w-40">{`${window.origin}/${locale}${routerMap.register}`}</span>
                <CopyText
                  className="mt-0.5"
                  text={`${window.origin}/${locale}${routerMap.register}`}
                  theme="light"
                />
              </span>
            </div>
          </div>
          <div className="w-26 h-26 p-2 bg-white">
            <Qrcode value={`${window.origin}/${locale}${routerMap.register}`} />
          </div>
        </div>
        <div className="mt-9 grid grid-cols-1 gap-2">
          {/* <button className="btn bg-white">Save QR Code</button> */}
          <button
            className="btn btn-primary"
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.origin}/${locale}${routerMap.register}`
              );
              toast.success("复制成功");
            }}
          >
            Copy Address
          </button>
        </div>
      </div>
    </ViewLayout>
  );
};
export default InviteView;
