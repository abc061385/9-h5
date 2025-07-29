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

type Account = Partial<{
  id: number;
  balance: number;
  frozenBalance: number;
  zyFrozenBalance: number | null;
  coin: string;
  memberId: number;
  releaseBalance: number;
  version: number;
  address: string | null;
  exchangeRateUSDT: number | null;
  usdtPrice: number | null;
  usdtValue: number;
  yesterdayIncome: number | null;
  trans: unknown; // 若你能明確定義結構，請改成具體 interface
}>;

type FundInfoType = {
  pledgeToken1: string;
  pledgeToken2: string;
  pledgeToken2Logo: string;
  pledgeToken1Logo: string;
  pledgePlans: PledgeType[];
  outputToken: string;
  outputTokenLogo: string;
  token1Percentage: number;
  pledgeToken1Price: number;
  token2Percentage: number;
  pledgeToken2Price: number;
  minInvestment: number;
  id: number;
  productType: number;
};

type FundBuyType = FundInfoType & {
  productId: string;
  pledgeId: string | number;
  totalAmount: string;
  pledgeToken1Amount: string;
  pledgeToken2Amount: string;
  selectCycle: string | number;
  pledge: PledgeType;
};

type PledgeType = {
  pledgeDays: number;
  dailyYield: number;
  id: number;
  maxBet: number;
};

type FundOrder = {
  id: number;
  pledgeId: number | null;
  fundId: number | null;
  fundType: number;
  investmentAmount: number;
  pledgeToken1: string;
  pledgeToken1Logo: string;
  pledgeToken1Amount: number;
  pledgeToken2: string;
  pledgeToken2Logo: string;
  pledgeToken2Amount: number;
  fundCycleDays: number | null;
  purchaseTime: string; // 格式: "YYYY-MM-DD HH:mm:ss"
  status: number;
  maturityTime: string; // 格式: "YYYY-MM-DD HH:mm:ss"
  maxProfit: number;
  totalProfit: number | null;
  dailyYield: number;
  isReinvestment: boolean | null;
  userId: number;
  orderType: string; // 如果固定为 "FUND"，可以写为 'FUND'
};
