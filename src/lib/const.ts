export enum AccountType {
  "phone" = "0",
  "email" = "1",
}
export enum FaBizType {
  "login" = "0",
  "register" = "1",
}
export const AESsecretKey = "wcjl_ecology_a9m";

//订单类型
export const typeMap: { [key: string]: string } = {
  ADMIN_EDIT: "walletDetail.ADMIN_EDIT",
  RECHARGE: "walletDetail.RECHARGE",
  WITHDRAW: "walletDetail.WITHDRAW",
  PURCHASE_NODE: "walletDetail.PURCHASE_NODE",
  PURCHASE_NODE_DIRT: "walletDetail.PURCHASE_NODE_DIRT",
  PURCHASE_NODE_INDIRECT: "walletDetail.PURCHASE_NODE_INDIRECT",

  INVESTMENT_INCOME: "投资收益",
  VIP_REWARD: "VIP奖励",
  EQUAL_LEVEL_REWARD: "平级奖励",
  CURRENCY_RIGHTS_REWARD: "币权奖励",
  DIRECT_PUSH_REWARD: "基金购买直推奖励",
  INDIRECT_PUSH_REWARD: "基金购买间推奖励",
  RETURN_OF_PRINCIPAL: "本金返回",
  INVESTMENT_FUND: "购买基金",

  CREATION_REWARD: "创世节点返回",
  NODE_REWARD: "信仰节点收益",
  NODE_RETURN: "信仰节点返回",
  UBX_ADD: "解冻",
  UBX_RETURN: "账号导入赠送",
  FLASH_REDEMPTION_DEDUCTION: "闪兑扣款",
  FLASH_REDEMPTION_IS_CREDITED: "闪兑入账",
  USDM_USDT_FLASH_EXCHANGE_TRANSACTION_FEE: "闪兑手续费扣除",
  CLAIM_STATIC_EARNINGS: "领取静态收益",
  CLAIM_DYNAMIC_REWARDS: "领取动态收益",
};
