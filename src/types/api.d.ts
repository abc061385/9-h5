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
  highestVipLevel: number;
  highestVipStar: number;
  cardBackgroundUrl: string;
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
  teamVipCount: number;
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

type FundDetailOrder = {
  id: number;
  pledgeId: number | null;
  fundId: number | null;
  fundType: number;

  pledgeToken1: string;
  pledgeToken1Logo: string;
  pledgeToken1Amount: number;

  pledgeToken2: string;
  pledgeToken2Logo: string;
  pledgeToken2Amount: number;

  fundCycleDays: number | null;

  purchaseTime: string; // e.g., "2025-07-29 10:40:55"
  maturityTime: string; // e.g., "2026-07-24 10:40:55"

  status: number;

  investmentAmount: number;
  maxProfit: number;
  totalProfit: number | null;
  yesterdayProfit?: number | null; // 可选字段，部分数据存在
  dailyYield: number;

  isReinvestment: boolean | null;

  outputToken?: string; // 可选字段
  outputTokenLogo?: string; // 可选字段

  orderType: "FUND"; // 目前只出现了 "FUND"
};

type TransactionRecord = {
  id: number;
  status: number; // 0: 待处理，1: 成功，2: 失败（具体可根据业务枚举定义）
  amount: number;
  fee: number;
  createTime: string; // 格式：YYYY-MM-DD HH:mm:ss
  flag: string; // 可能是状态标记，例如 "0"、"1"
  remarkJson: string | null;
  memberId: number;
  symbol: string; // 例如 "USDT"
  type: "WITHDRAW" | "DEPOSIT" | string; // 示例值为 "WITHDRAW"
  txid: string | null; // 区块链交易哈希，提现时常为 null
  detail: string;
  beforeBalance: number;
  afterBalance: number;
  inOut: "ADD_BALANCE" | "REDUCE_BALANCE" | string;
  tel: string | null;
  nickname: string | null;
  nodeName: string | null;
  dowTime: string | null;
  protocol: string; // 如 "TRON"、"ERC20"、"BEP20"
  certificate: string | null; // 上传的证明图、截图等
  rechargeAddress: string; // 地址或标签
  reason: string; // 失败原因或备注
};

type AssetsIncomeType = {
  personalFundInvestment: number;
  totalFundReturn: number;
  withdrawnReturn: number;
  unWithdrawnReturn: number;
  yesterdayReturn: number;
  frozenUbx: number;
};

type infoUsingGet1Type = {
  id: number;
  managementFee: number;
  platformDividend: number;
  investmentReturn: number;
  createdTime: string;
  updatedTime: string;
};

type IncomeListType = {
  id: number;
  status: number;
  amount: number;
  createTime: string;
  fundType: number;
  type: string;
};

type AwardInfoType = {
  totalReward: number;
  totalCurrency: number;
  frozenRewards: number;
  extractedRewards: number;
  yesterdayVipReward: number;
  yesterdayCurrencyReward: number;
  chuJuAmount: number;
  coinQuotaStats: {
    coin: string;
    remainQuota: number;
    totalQuota: number;
    usedQuota: number;
  };
};

type AwardListType = {
  id: number;
  from: string;
  status: number;
  amount: number;
  createTime: string;
  fundType: number;
  type: string;
};

type TeamDetailType = {
  totalTeamMembers: number;
  newMembersToday: number;
  newCommunityInvestmentToday: number;
  newTeamInvestmentToday: number;
  totalCommunityInvestment: number;
  totalTeamInvestment: number;
  totalInvestment360Days: number;
  totalInvestment180Days: number;
  totalInvestment90Days: number;
  totalInvestment30Days: number;
  totalInvestment7Days: number;
  totalFaithNodeInvestment: number;
  totalGenesisNodeInvestment: number;
};

type TokenListType = {
  id: number;
  pledgeToken1Logo: string;
  pledgeToken2Logo: string;
  pledgeToken1: string;
  pledgeToken2: string;
  dailyYield: number;
  productId: number;
};

type ActivityList = {
  activityDate: "2025.08.05-2025.12.28";
  activityName: string;
  activityState: number;
  bannerEn: string;
  bannerZh: string;
  content: string;
  createTime: string;
  depositAmount: number;
  display: boolean;
  id: number;
  langContent: string;
  remark: string;
  updateTime: string;
};

type NewsDataType = {
  contentEn: string;
  contentZhCn: string;
  contentZhTw: string;
  createTime: string;
  id: number;
  status: number;
  titleEn: string;
  titleZhCn: string;
  titleZhTw: string;
  [key: string]: string;
};

interface ImageMetadata {
  contentType: string; // 圖片的 MIME 類型，例如 "image/png"
  fileName: string; // 圖片的檔案名稱
  fileSize: number; // 圖片的檔案大小（以位元組為單位）
  height: number; // 圖片的高度（以像素為單位）
  originalUrl: string; // 圖片的原始 URL
  thumbnailUrl: string; // 圖片的縮圖 URL，若無則為 null
  uploadTime: string; // 圖片的上傳時間，格式為 "YYYY-MM-DD HH:mm:ss"
  width: number; // 圖片的寬度（以像素為單位）
}
