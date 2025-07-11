"use client";
import { useTrans } from "@/hooks/useTrans";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const itemClass = (currentPathname: string, pathname: string) => {
  return cn([currentPathname === pathname ? ["dock-active text-primary"] : []]);
};

export const LayoutDock = () => {
  const currentPathname = usePathname();
  const t = useTrans();
  const pathList = [
    { href: "/", name: t("tabbar.home") },
    { href: "/demo/", name: t("基金") },
    { href: "/demo/", name: t("tabbar.assets") },
  ];

  return (
    <div className="dock md:absolute m-0 p-0">
      {pathList.map((i, index) => {
        return (
          <Link href={i.href} key={index}>
            <button className={itemClass(currentPathname, i.href)}>
              <span className={cn(["dock-label"])}>{i.name}</span>
            </button>
          </Link>
        );
      })}
    </div>
  );
};
