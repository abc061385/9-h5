import { usePathname, WhiteListPath } from "@/i18n/navigation";
import Bridge from "@/lib/dsBridge";
import Platform from "@/lib/platfrom";
import { utils } from "@/lib/utils";
import { useStore } from "@/store";
import { useUserStore } from "@/store/useUserStore";
import { useCallback, useEffect } from "react";
import Vconsole from "vconsole";

// init token
export const useInitToken = () => {
  const initRoot = useStore((s) => s.initRoot);
  const setUserField = useUserStore((s) => s.setField);
  const pathname = usePathname();

  const setToken = useCallback(async () => {
    if (Platform.isInApp()) {
      new Vconsole();
      Bridge.setFull(false);
      const token =
        Bridge?.getToken() || window.localStorage.getItem("token") || "";
      utils.setJwtCookie(token);
      setUserField("token", token);
      console.log("token", token);
    } else {
      const token = window.localStorage.getItem("token") || "";
      utils.setJwtCookie(token);
      setUserField("token", token);
    }
  }, [setUserField]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setToken();
  }, [setToken]);

  useEffect(() => {
    if (WhiteListPath.indexOf(pathname) === -1) {
      initRoot();
    }
  }, [initRoot, pathname]);
};
