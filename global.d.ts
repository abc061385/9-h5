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
  userInfo: any;
  callType: any;
  language: any;
  product: string; // ????
}>;

interface Window {
  initGeetest4: (config: GeetestConfig, callback: any) => viod;
}
