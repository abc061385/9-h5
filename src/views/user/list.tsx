import { Icon } from "@/components/icon";
import { useTrans } from "@/hooks/useTrans";
import { routerMap, useRouter } from "@/i18n/navigation";

interface MenuType {
  icon: "team-user" | "language" | "books" | "save" | "about-us";
  title: string;
  path: string;
}

const ListBox = () => {
  const t = useTrans();
  const { push } = useRouter();
  const menuList: MenuType[] = [
    { icon: "team-user", title: "我的团队", path: routerMap.teams },
    { icon: "language", title: "user.language", path: routerMap.lang },
    { icon: "books", title: "user.addressBook", path: "/team" },
    { icon: "save", title: "user.securitySettings", path: "/team" },
    { icon: "about-us", title: "关于我们", path: "/team" },
  ];
  return (
    <div className="pt-5">
      {menuList.map((item, index) => {
        return (
          <div
            key={index}
            className="flex items-center justify-between gap-2.5 py-2 mb-4 border-dashed border-b border-[#ECECEF] last:border-none"
            onClick={() => push(item.path)}
          >
            <Icon name={item.icon} />
            <span className="flex-1 font-bold">{t(item.title)}</span>
            <Icon name="right-arrow-user" />
          </div>
        );
      })}
    </div>
  );
};
export default ListBox;
