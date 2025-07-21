"use client";
import { PropsWithChildren, ReactNode } from "react";
import { LayoutDock } from "./dock";
import { cn } from "@/lib/utils";
import { ShowIf } from "../show-if";

type IProps = PropsWithChildren<{
  dock?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  heightFull?: boolean;
  className?: string;
}>;
export default function ViewLayout({
  children,
  dock = false,
  header,
  footer,
  heightFull = false,
  className,
}: IProps) {
  return (
    <div data-name="layout" className="size-full relative">
      <ShowIf condition={!!header}>
        <div
          className={cn([
            "fixed top-0 left-0 z-50 w-full min-h-11 bg-white",
            "md-pc:absolute",
          ])}
        >
          {header}
        </div>
      </ShowIf>
      <div
        className={cn([
          "bg-white min-h-full w-full",
          "md-pc:flex-1 md-pc:overflow-y-scroll md-pc:no-scrollbar",
          {
            "pt-11": header,
            "pb-16": dock,
            "h-full": heightFull,
          },
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
