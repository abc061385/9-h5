import { usePathname, WhiteListPath } from "@/i18n/navigation";
import Bridge from "@/lib/dsBridge";
import Platform from "@/lib/platfrom";
import { useStore } from "@/store";
import { useUserStore } from "@/store/useUserStore";
import { useCallback, useEffect } from "react";

// init token
export const useInitToken = () => {
  const initRoot = useStore((s) => s.initRoot);
  const setUserField = useUserStore((s) => s.setField);
  const pathname = usePathname();

  const setToken = useCallback(async () => {
    if (Platform.isInApp()) {
      Bridge.setFull(false);
      setUserField(
        "token",
        Bridge?.getToken() || window.localStorage.getItem("token") || "",
      );
    } else {
      setUserField("token", window.localStorage.getItem("token") || "");
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
