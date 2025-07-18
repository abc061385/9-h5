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
