"use client";
import { PropsWithChildren, useEffect } from "react";
import { Launch } from "./launch";
import { cn } from "@/lib/utils";
import { useStore } from "@/store";
import { initRouterPush, useRouter } from "@/i18n/navigation";
import { ToastWrapper } from "../toast-wrapper";

export const LayoutRoot = ({ children }: PropsWithChildren) => {
  const initRoot = useStore((s) => s.initRoot);
  const { push } = useRouter();
  useEffect(() => {
    initRouterPush(push);
  }, [push]);

  useEffect(() => {
    initRoot();
  }, [initRoot]);
  return (
    <div
      className={cn([
        "relative layout-warp h-full max-w-[767PX] mx-auto",
        "md:border md:border-gray-500 md:rounded-2xl md:overflow-hidden",
      ])}
    >
      <Launch>{children}</Launch>
      <ToastWrapper />
    </div>
  );
};
