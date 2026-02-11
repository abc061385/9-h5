"use client";
import { PropsWithChildren, ReactNode } from "react";
import { LayoutDock } from "./dock";
import { cn } from "@/lib/utils";
import { ShowIf } from "../show-if";
import { useSettingChat } from "@/hooks/useSettingChat";
import { useInitToken } from "@/hooks/useInitToken";

type IProps = PropsWithChildren<{
  dock?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  heightFull?: boolean;
  className?: string;
  theme?: "light" | "dark";
}>;
export default function ViewLayout({
  children,
  dock = false,
  header,
  footer,
  heightFull = false,
  className,
  theme = "dark",
}: IProps) {
  useInitToken();
  useSettingChat();
  return (
    <div
      data-name="layout"
      className={cn("size-full md-pc:relative", theme === "dark" && "dark")}
    >
      <ShowIf condition={!!header}>
        <div
          className={cn([
            "fixed top-0 left-0 z-50 w-full min-h-11",
            "md-pc:absolute",
          ])}
        >
          {header}
        </div>
      </ShowIf>
      <div
        className={cn([
          "bg-bg min-h-full w-full",
          "md-pc:flex-1 md-pc:overflow-y-scroll md-pc:no-scrollbar",
          {
            "pt-11": header,
            "pb-16": dock,
            "h-full": heightFull,
          },
          // theme === "dark" && "bg-black",
          className,
        ])}
      >
        {children}
      </div>
      <ShowIf condition={dock}>
        <LayoutDock />
      </ShowIf>
      <ShowIf condition={!dock && !!footer}>
        <div
          className={cn([
            "fixed bottom-0 left-0 right-0  flex justify-center min-h-16",
            "md-pc:absolute",
          ])}
        >
          {footer}
        </div>
      </ShowIf>
    </div>
  );
}
