"use client";
import { useTrans } from "@/hooks/useTrans";
import { Link, routerMap, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Icon } from "../icon";
import { IconName } from "@/types/icons";

const itemClass = (currentPathname: string, pathname: string) => {
  return cn([currentPathname === pathname ? ["dock-active text-primary"] : []]);
};

export const LayoutDock = () => {
  const currentPathname = usePathname();
  const t = useTrans();
  const pathList = [
    { href: routerMap.home, name: t("tabbar.home"), icon: "home" },
    { href: routerMap.fund, name: t("基金"), icon: "fund" },
    { href: "/demo/", name: t("tabbar.assets"), icon: "assets" },
  ];

  return (
    <div className="dock md:absolute m-0 p-0 z-50 bg-white border-none">
      {pathList.map((i, index) => {
        return (
          <Link href={i.href} key={index}>
            <button className={itemClass(currentPathname, i.href)}>
              <Icon
                name={
                  `${i.icon}-${
                    currentPathname === i.href ? "l" : "d"
                  }` as IconName
                }
              />
              <span className={cn(["dock-label"])}>{i.name}</span>
            </button>
          </Link>
        );
      })}
    </div>
  );
};
