import { ReactNode, useState } from "react";
import { Icon } from "@/components/icon";
import { useTrans } from "@/hooks/useTrans";
import { routerMap, useRouter } from "@/i18n/navigation";
import { useUserStore } from "@/store/useUserStore";
import StarIcon from "../vip/star-icon";
import CopyText from "@/components/copy-text";
import BaseImage from "@/components/base-image";
import { Drawer } from "@/components/drawer";

interface CardType {
  icon: "vip-user" | "invite-user";
  title: string | ReactNode;
  desc: string;
  path: string;
}

const UserInfoBox = () => {
  const t = useTrans();
  const userInfo = useUserStore((s) => s.userInfo);
  const { push } = useRouter();

  const [editUserHead, setEditUserHead] = useState(false);

  const cards: CardType[] = [
    {
      icon: "vip-user",
      title: (
        <div className="flex items-center gap-1">
          {"VIP" + userInfo.vipLevel}{" "}
          <StarIcon level={userInfo.vipLevel || 0} star={userInfo.star} />
        </div>
      ),
      desc: t("user.level"),
      path: routerMap.vip,
    },
    {
      icon: "invite-user",
      title: t("user.invite"),
      desc: t("user.inviteDesc"),
      path: routerMap.invite,
    },
  ];
  return (
    <div>
      <div className="flex flex-col items-center">
        <BaseImage
          src="/icons/user-head.svg"
          className="size-16"
          // onClick={() => setEditUserHead(true)}
        />
        <div className="font-bold text-xl mt-4 mb-2">
          {userInfo?.emailAccount ||
            userInfo?.bindEmail ||
            userInfo?.tel ||
            "--"}
        </div>
        <div className="flex justify-center text-sm gap-2 text-center">
          {t("invite.inviteCode")}：{userInfo.invitationCode || "-–"}
          <CopyText
            text={userInfo.invitationCode || ""}
            className="mt-0.5 size-3.5"
          />
        </div>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-2">
        {cards.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-bg2 p-4 pr-2 rounded-lg"
            onClick={() => push(item.path)}
          >
            <Icon name={item.icon} className="size-7.5" />
            <div>
              <div className="font-medium text-sm leading-6">{item.title}</div>
              <p className="text-text4 text-xs mt-1 leading-3">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <Drawer
        open={editUserHead}
        onChange={() => setEditUserHead(false)}
        className="h-auto text-center"
      >
        <div className="py-4 border-b border-border2">
          {t("user.takePhoto")}
        </div>
        <div className="py-3.5 border-b border-border2">
          {t("user.chooseFromAlbum")}
        </div>
        <button
          className="btn btn-outline w-full mt-6"
          onClick={() => {
            setEditUserHead(false);
          }}
        >
          {t("common.cancel")}
        </button>
      </Drawer>
    </div>
  );
};
export default UserInfoBox;
