type LocaleParams = Promise<{ locale: string }>;
type RootProps = Readonly<{
  params: LocaleParams;
}>;

type ApiResponse<T> = T;

type GeetestConfig = Partial<{
  apiServers: string[];
  staticServers: string[];
  protocol: string;
  captchaId: string;
  challenge: string;
  riskType: string;
  userInfo: unknown;
  callType: unknown;
  language: unknown;
  product: "popup" | "float" | "bind";
}>;

interface Window {
  initGeetest4: (config: GeetestConfig, callback: () => void) => viod;
  ssq: {
    push: (...args: unknown[]) => void;
  };
  __ssc: {
    setting: {
      hideIcon: boolean;
    };
  };
}

interface BaseState<T> {
  setField: <K extends keyof Omit<T, "setField" | "reset">>(
    key: K,
    value: T[K],
  ) => void;
}

declare module "crypto-js";
declare module "qrcode";
