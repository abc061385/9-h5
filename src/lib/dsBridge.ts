let dsBridge: typeof import("dsbridge").default;

// 动态导入，避免 SSR 报错
if (typeof window !== "undefined") {
  import("dsbridge").then((mod) => {
    dsBridge = mod.default;
  });
}

const Bridge = {
  jumpTo(router: string): void {
    if (typeof window === "undefined") return;
    if (!router) return;
    try {
      if (dsBridge.hasNativeMethod("jumpTo")) {
        dsBridge.call("jumpTo", router);
      }
    } catch (e) {
      console.error("【logErr】jumpTo：%o", e);
    }
  },
  setFull(isFull: boolean): void {
    if (typeof window === "undefined") return;
    try {
      if (dsBridge.hasNativeMethod("setFull")) {
        dsBridge.call("setFull", isFull);
      }
    } catch (e) {
      console.error("【logErr】jumpTo：%o", e);
    }
  },
  goBack(): string {
    if (typeof window === "undefined") return "";
    try {
      if (dsBridge.hasNativeMethod("goBack")) {
        return dsBridge.call("goBack");
      }
    } catch (e) {
      console.error("【logErr】goBack：%o", e);
    }
    return "";
  },

  getToken(): string {
    if (typeof window === "undefined") return "";
    try {
      if (dsBridge.hasNativeMethod("getToken")) {
        return dsBridge.call("getToken");
      }
    } catch (e) {
      console.error("【logErr】getToken：%o", e);
    }
    return "";
  },

  getLanguage(): string {
    if (typeof window === "undefined") return "en";
    try {
      if (dsBridge.hasNativeMethod("getLanguage")) {
        return dsBridge.call("getLanguage");
      }
    } catch (e) {
      console.error("【logErr】getLanguage：%o", e);
    }
    return "en";
  },
  getTheme() {
    if (typeof window == "undefined") return;
    try {
      if (dsBridge.hasNativeMethod("getTheme")) {
        return dsBridge.call("getTheme");
      }
    } catch (e) {
      console.error("【logErr】getTheme：%o", e);
    }
    return "light";
  },
  getPlatform() {
    if (typeof window == "undefined") return;
    try {
      if (dsBridge.hasNativeMethod("getPlatform")) {
        return dsBridge.call("getPlatform");
      }
    } catch (e) {
      console.error("【logErr】getPlatform：%o", e);
    }
    return "";
  },
  call(
    action: string,
    data: { [key in string]: unknown },
    callback: () => void,
  ) {
    if (typeof window == "undefined") return;
    try {
      if (dsBridge.hasNativeMethod(action)) {
        return dsBridge.call(action, data, callback);
      }
    } catch (e) {
      console.error("【logErr】bridge.call：%o", e);
    }
    return "";
  },
};
export default Bridge;
