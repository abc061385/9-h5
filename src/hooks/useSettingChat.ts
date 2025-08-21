"use client";
import { useEffect } from "react";
import { useRouter, usePathname, routerMap } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import Platform from "@/lib/platfrom";
export const useSettingChat = () => {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (Platform.isDesktop() && window?.__ssc) {
      window.__ssc.setting = {
        hideIcon: false,
      };
    }
    window?.ssq?.push("onCloseChat", () => {
      if (!Platform.isDesktop() && pathname === routerMap["customer-support"]) {
        push(routerMap.home);
      }
    });
  }, [push, pathname]);
  useEffect(() => {
    if (Platform.isDesktop()) {
      if (pathname !== routerMap["home"]) window?.ssq?.push("chatClose");
    } else {
      const type =
        pathname !== routerMap["customer-support"] ? "chatClose" : "chatOpen";
      window?.ssq?.push(type);
    }
  }, [pathname, searchParams]);
};
