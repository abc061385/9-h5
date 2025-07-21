export interface DataType {
  generation: number;
  totalInvestmentYesterday: number;
  totalInvestment: number;
  yesterdayReturn: number;
  totalFundReturn: number;
  yesterdayNewUsersCount: number;
  totalUsersCount: number;
  totalInvestmentTeam: number;
  id: number;
  parentId: number;
  nodeInvestment: number;
  tel: string;
  nickname: string;
  createTime: string;
  vipLevel: number;
  frozen_ubx: number;
  emailAccount: string;
  isInvest: number;
  areaType: number;
  accountType: number;
  area: string;
}

export interface ICardProps {
  data: DataType;
  onClick?: () => void;
}

export interface IndividualType {
  label: string;
  value:
    | "generation"
    | "totalInvestmentYesterday"
    | "totalInvestment"
    | "yesterdayReturn"
    | "totalFundReturn";
}

export interface TeamType {
  label: string;
  value: "yesterdayNewUsersCount" | "totalUsersCount" | "totalInvestmentTeam";
}
