"use client";
import { PropsWithChildren, useEffect } from "react";
import { Launch } from "./launch";
import { cn } from "@/lib/utils";
import { useStore } from "@/store";
import { initRouterPush, useRouter } from "@/i18n/navigation";
import { ToastWrapper } from "../toast-wrapper";
import { useLocale } from "next-intl";

export const LayoutRoot = ({ children }: PropsWithChildren) => {
  const initRoot = useStore((s) => s.initRoot);
  const setLang = useStore((s) => s.setLang);
  const locale = useLocale();
  const { push } = useRouter();
  useEffect(() => {
    initRouterPush(push);
  }, [push]);

  useEffect(() => {
    initRoot();
  }, [initRoot]);

  useEffect(() => {
    if (locale) {
      setLang(locale);
    }
  }, [locale, setLang]);
  return (
    <div
      className={cn([
        "relative layout-warp h-full  mx-auto",
        "md-pc:border md-pc:border-gray-500 md-pc:rounded-2xl md-pc:overflow-hidden md-pc:aspect-[9/16] md-pc:max-h-[800PX]",
      ])}
    >
      <Launch>{children}</Launch>
      <ToastWrapper />
    </div>
  );
};
