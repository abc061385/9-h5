"use client";
import { PropsWithChildren, ReactNode } from "react";
import { LayoutDock } from "./dock";
import { cn } from "@/lib/utils";

type IProps = PropsWithChildren<{ dock?: boolean; header?: ReactNode }>;
export default function ViewLayout({ children, dock = false, header }: IProps) {
  return (
    <div className="size-full relative">
      {header ? (
        <div className="absolute top-0 left-0 z-50 w-full">{header}</div>
      ) : null}
      <div
        className={cn([
          "layout size-full flex flex-col md:overflow-y-scroll no-scrollbar",
          header ? "pt-[44px]" : "",
        ])}
      >
        <div
          className={cn([
            "flex-1",
            {
              "pb-[64px]": dock,
            },
          ])}
        >
          {children}
        </div>
        {dock ? <LayoutDock /> : null}
      </div>
    </div>
  );
}
