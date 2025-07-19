import BaseImage from "@/components/base-image";
import { Icon } from "@/components/icon";
import { useTrans } from "@/hooks/useTrans";
import { useRouter } from "@/i18n/navigation";

interface CardType {
  icon: "vip-user" | "invite-user";
  title: string;
  desc: string;
  path: string;
}

const UserInfoBox = () => {
  const t = useTrans();
  const { push } = useRouter();
  const cards: CardType[] = [
    {
      icon: "vip-user",
      title: "VIP9",
      desc: t("user.level"),
      path: "/vip",
    },
    {
      icon: "invite-user",
      title: t("user.invite"),
      desc: t("user.inviteDesc"),
      path: "",
    },
  ];
  return (
    <div>
      <div className="flex items-center justify-between gap-2.5">
        <BaseImage src="/images/user/head.png" className="w-12 h-12" />
        <div className="flex-1">
          <div className="font-bold">Anqiu Nezi Buds</div>
          <div className="badge badge-soft badge-primary rounded-md text-xs font-bold px-2">
            @sm…le499
            <Icon name={"copy-user"} className="w-3 h-3" />
          </div>
        </div>
        <Icon name={"right-arrow-user"} />
      </div>
      <div className="bg-secondary py-6 px-4 rounded-md mt-5 flex">
        {cards.map((item, index) => (
          <div
            key={index}
            className="flex flex-1 gap-1.5 font-bold"
            onClick={() => push(item.path)}
          >
            <Icon name={item.icon} className="w-6 h-6"/>
            <div>
              <div>{item.title}</div>
              <p className="text-text2 text-xs mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default UserInfoBox;
