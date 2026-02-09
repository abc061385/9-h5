"use client";
import { useTrans } from "@/hooks/useTrans";
import { routerMap, usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Icon } from "../icon";
import { IconName } from "@/types/icons";
import toast from "react-hot-toast";

const itemClass = (currentPathname: string, pathname: string) => {
  return cn(
    [currentPathname === pathname ? ["dock-active text-primary"] : []],
    "flex justify-center items-center flex-col",
  );
};

export const LayoutDock = () => {
  const currentPathname = usePathname();
  const t = useTrans();
  const { push } = useRouter();
  const pathList = [
    { href: routerMap.home, name: t("tabbar.home"), icon: "home" },
    { href: routerMap.fund, name: t("基金"), icon: "fund" },
    { href: "", name: t("spot"), icon: "spot" },
    { href: routerMap.teams, name: t("团队"), icon: "team" },
    { href: routerMap.assets, name: t("tabbar.assets"), icon: "assets" },
  ];

  const handleClick = (link: string) => {
    if (link) {
      push(link);
    } else {
      toast.error(t("spot_click_tip"));
    }
  };

  return (
    <div className="dock md-pc:absolute m-0 p-0 z-50 bg-bg border-none shadow-[0_0_2px_rgba(0,0,0,0.16)] backdrop-blur-[20px]">
      {/* <Link href={i.href} key={index} className="h-full"> */}
      {/* </Link> */}
      {pathList.map((i, index) => {
        return (
          <button
            key={index}
            onClick={() => handleClick(i.href)}
            className={cn([
              itemClass(currentPathname, i.href),
              "flex flex-col items-center",
            ])}
          >
            <Icon
              className="block w-6 h-6"
              name={
                `${i.icon}-${
                  currentPathname === i.href ? "l" : "d"
                }` as IconName
              }
            />
            <span className={cn("text-xs", ["dock-label"])}>{i.name}</span>
          </button>
        );
      })}
    </div>
  );
};
