type UserInfo = Partial<{
  id: number;
  tel: string;
  emailAccount: string;
  token: string;
  headUrl: string;
  invitationCode: string;
  vipLevel: number;
  star: number;
  jyPasswprd: boolean;
  nick: string;
  ifNewUser: number;
  accountType: number;
  inviteCount: number;
  totalTeamInvestment: number;
  maxProfitMultiplier: number;
  googleVerify: number;
  bindEmail: string;
}>;

type VipInfoType = Partial<{
  vipLevel: number;
  teamVipCount: number;
  teamInvestmentTotal: number;
  maxProfitMultiplier: number;
  teamInvestmentReward: number;
  aiQueryCount: number;
}>;

type NextStarConfig = Partial<{
  star: number;
  coefficient: number;
}>;

type CurrencyInfo = Partial<{
  id: number;
  protocolType: string; // e.g., "TRON"
  currencyCode: string; // e.g., "USDT"
  depositDescription: string;
  qrCode: string; // URL to QR image
  rechargeAddress: string;
  decimalPlaces: number;
  isEnabled: boolean;
  canDeposit: boolean;
  canWithdraw: boolean;
  minWithdrawal: number; // 使用 number 表示金额（如有高精度需求可改成 string 或 BigNumber）
  maxWithdrawal: number;
  withdrawalFeeType: "fixed" | "percentage" | string; // 可拓展为联合类型
  withdrawalFeeConfig: number;
  usdtExchangeMarket: number;
  logo: string; // URL to logo image
}>;
