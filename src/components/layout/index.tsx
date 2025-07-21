"use client";
import { PropsWithChildren, ReactNode } from "react";
import { LayoutDock } from "./dock";
import { cn } from "@/lib/utils";
import { ShowIf } from "../show-if";

type IProps = PropsWithChildren<{
  dock?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
}>;
export default function ViewLayout({
  children,
  dock = false,
  header,
  footer,
}: IProps) {
  return (
    <div data-name="layout" className="size-full relative">
      <ShowIf condition={!!header}>
        <div
          className={cn([
            "fixed top-0 left-0 z-50 w-full h-11 bg-white",
            "md-pc:absolute",
          ])}
        >
          {header}
        </div>
      </ShowIf>
      <div
        className={cn([
          "size-full max-h-full",
          "md-pc:flex-1 md-pc:overflow-y-scroll md-pc:no-scrollbar",
          {
            "pt-11": header,
            "pb-[64px]": dock,
          },
        ])}
      >
        {children}
      </div>
      <ShowIf condition={dock}>
        <LayoutDock />
      </ShowIf>
      <ShowIf condition={!dock && !!footer}>
        <div className="fixed bottom-0 left-0 right-0 md-pc:absolute flex justify-center h-16">
          {footer}
        </div>
      </ShowIf>
    </div>
  );
}
