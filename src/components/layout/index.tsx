"use client";
import { PropsWithChildren } from "react";
// import { Navbar } from "./navbar";
import { LayoutWarp } from "./layout-warp";
import { LayoutDock } from "./dock";
import { cn } from "@/lib/utils";
import { useStore } from "@/store";

type IProps = PropsWithChildren;
export default function ViewLayout({ children }: IProps) {
  const dock = useStore((s) => s.showLayoutDock);
  return (
    <div className="size-full md:bg-gray-100">
      <LayoutWarp>
        <div className="layout size-full flex flex-col">
          {/* <Navbar /> */}
          <div
            className={cn([
              "bg-red-50 flex-1",
              {
                "mb-[64px]": dock,
              },
            ])}
          >
            {children}
          </div>
          {dock ? <LayoutDock /> : null}
        </div>
      </LayoutWarp>
    </div>
  );
}
