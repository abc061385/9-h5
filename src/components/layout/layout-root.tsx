"use client";
import { PropsWithChildren, useEffect } from "react";
import { Launch } from "./launch";
import { cn } from "@/lib/utils";
import { useStore } from "@/store";
import {
  initRouterPush,
  usePathname,
  useRouter,
  WhiteListPath,
} from "@/i18n/navigation";
import { ToastWrapper } from "../toast-wrapper";
import { useLocale } from "next-intl";
import { useUserStore } from "@/store/useUserStore";

export const LayoutRoot = ({ children }: PropsWithChildren) => {
  const initRoot = useStore((s) => s.initRoot);
  const setLang = useStore((s) => s.setLang);
  const locale = useLocale();
  const pathname = usePathname();
  const { push } = useRouter();
  const setUserField = useUserStore((s) => s.setField);

  useEffect(() => {
    initRouterPush(push);
  }, [push]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserField("token", window.localStorage.getItem("token") || "");
    }
  }, [setUserField]);

  useEffect(() => {
    if (WhiteListPath.indexOf(pathname) === -1) {
      initRoot();
    }
  }, [initRoot, pathname]);

  useEffect(() => {
    if (locale) {
      setLang(locale);
    }
  }, [locale, setLang]);

  // useEffect(() => {
  //   if (typeof window === "undefined") return;
  //
  //   if (window?.__ssc) {
  //     window.__ssc.setting = {
  //       hideIcon: true,
  //     };
  //   }
  //   window?.ssq?.push("onCloseChat", () => {
  //     push(routerMap.home);
  //   });
  // }, [push]);
  // useEffect(() => {
  //   if (pathname !== routerMap["customer-support"]) {
  //     window?.ssq?.push("chatClose");
  //   } else {
  //     window?.ssq?.push("chatOpen");
  //   }
  // }, [pathname, searchParams]);
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
