"use client";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const itemClass = (currentPathname: string, pathname: string) => {
  return cn([currentPathname === pathname ? ["dock-active text-primary"] : []]);
};

const pathList = [
  { href: "/", name: "Home" },
  { href: "/demo/", name: "Demo" },
];
export const LayoutDock = () => {
  const currentPathname = usePathname();
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
