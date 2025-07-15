"use client";
import { PropsWithChildren, ReactNode } from "react";
import { LayoutDock } from "./dock";
import { cn } from "@/lib/utils";

type IProps = PropsWithChildren<{ dock?: boolean; header?: ReactNode }>;
export default function ViewLayout({ children, dock = false, header }: IProps) {
  return (
    <>
      {header ? header : null}
      <div
        className={cn([
          "layout size-full flex flex-col",
          header ? "pt-[52px]" : "",
        ])}
      >
        <div
          className={cn([
            "flex-1",
            {
              "mb-[64px]": dock,
            },
          ])}
        >
          {children}
        </div>
        {dock ? <LayoutDock /> : null}
      </div>
    </>
  );
}
