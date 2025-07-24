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

type AssetsList = Partial<{
  address?: string;
  balance: number;
  coin: string;
  exchangeRateUSDT: string | number;
  frozenBalance: number;
  id: number;
  memberId: number;
  releaseBalance: number;
  trans: string | number;
  usdtPrice: string | number;
  usdtValue: number;
  version: number;
  yesterdayIncome: string | number;
  zyFrozenBalance: string | number;
}>;

type CryptoAsset = Partial<{
  id: number;
  protocolType: string;
  currencyCode: string;
  depositDescription: string;
  qrCode: string;
  rechargeAddress: string;
  decimalPlaces: number;
  isEnabled: boolean;
  canDeposit: boolean;
  canWithdraw: boolean;
  minWithdrawal: number;
  maxWithdrawal: number;
  withdrawalFeeType: "fixed" | "percentage";
  withdrawalFeeConfig: number;
  usdtExchangeMarket: number;
  logo: string;
}>;

type ChainList = Partial<{
  id: number;
  protocolType: string;
  currencyCode: string;
  depositDescription: string;
  qrCode: string;
  rechargeAddress: string;
  decimalPlaces: number;
  isEnabled: boolean;
  canDeposit: boolean;
  canWithdraw: boolean;
  minWithdrawal: number;
  maxWithdrawal: number;
  withdrawalFeeType: string;
  withdrawalFeeConfig: number;
  usdtExchangeMarket: number | null;
  logo: string;
}>;

type AddressList = Partial<{
  id: number;
  memberId: number;
  type: string;
  addr: string;
  coin: string;
  protocol: string;
  systemType: number;
}>;
