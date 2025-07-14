"use client";
import { PropsWithChildren } from "react";
import { LayoutDock } from "./dock";
import { cn } from "@/lib/utils";

type IProps = PropsWithChildren<{ dock?: boolean }>;
export default function ViewLayout({ children, dock = false }: IProps) {
  return (
    <div className="layout size-full flex flex-col">
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
  );
}
