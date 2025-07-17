"use client";
import { PropsWithChildren, useEffect } from "react";
import { Launch } from "./launch";
import { cn } from "@/lib/utils";
import { useStore } from "@/store";

export const LayoutRoot = ({ children }: PropsWithChildren) => {
  const initRoot = useStore((s) => s.initRoot);
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
    </div>
  );
};
