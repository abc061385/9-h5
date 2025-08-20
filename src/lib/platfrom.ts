const Platform = {
  getUA() {
    if (typeof window == "undefined") return "";
    return window.navigator?.userAgent?.toLowerCase() || "";
  },
  isDesktop() {
    if (this.isServer()) return false;
    const ua = this.getUA();
    const mobileRegex =
      /mobi|android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    const isMobileUA = mobileRegex.test(ua);
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    return !isMobileUA && !hasTouch;
  },
  isIOS() {
    return /(iPhone|iPad|iPod|iOS)/i.test(Platform.getUA());
  },
  isAndroid() {
    return (
      Platform.getUA().indexOf("Android") > -1 ||
      Platform.getUA().indexOf("Linux") > -1
    );
  },
  isInApp() {
    if (Platform.getUA().includes("9mc.org.app")) {
      return true;
    } else {
      return false;
    }
  },
  isServer() {
    return typeof window == "undefined";
  },
  isWeiXin() {
    const ua = Platform.getUA();
    if (!ua.match(/MicroMessenger/i)) return false;
    return ua.match(/MicroMessenger/i)?.toString() === "micromessenger";
  },
};
export default Platform;
