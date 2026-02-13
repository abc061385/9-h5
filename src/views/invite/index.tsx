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
import QRCode from "qrcode";
import { useMemo } from "react";
import { utils } from "@/lib/utils";

const InviteView = () => {
  const t = useTrans();
  const { userInfo } = useUserStore();
  const locale = useLocale();

  const copyLink = useMemo(() => {
    if (typeof window !== "undefined") {
      return `${window.origin}/${locale}${routerMap.register}?inviteCode=${userInfo.invitationCode}`;
    }
    return "";
  }, [locale, userInfo]);

  return (
    <ViewLayout
      header={
        <HeaderWithBack title={t("邀请好友")} algin="center" theme="dark" />
      }
      className="bg-black flex flex-col h-max md-pc:h-full"
      heightFull
    >
      <div className="pt-14">
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
                />
              </span>
            </div>
            <div className="flex flex-col mt-6 gap-1">
              <span className="text-text5 text-sm  leading-4">
                {t("invite.inviteLink")}
              </span>
              <span className="font-bold flex items-center gap-1 flex-1  leading-4">
                <span className="truncate max-w-40">{copyLink}</span>
                <CopyText className="mt-0.5" text={copyLink}/>
              </span>
            </div>
          </div>
          <div className="w-26 h-26">
            <Qrcode value={copyLink} size={104} />
          </div>
        </div>
        <div className="mt-9 grid grid-cols-1 gap-2">
          <button
            className="btn bg-white"
            onClick={async () => {
              try {
                const dataUrl = await QRCode.toDataURL(copyLink, {
                  width: 300,
                });
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = "invite.png";
                link.click();
              } catch (err) {
                console.error(err);
              }
            }}
          >
            Save QR Code
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              utils.copyText(copyLink).then(() => {
                toast.success(t("transactionDetail.copy"));
              });
              // navigator.clipboard.writeText(copyLink);
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
