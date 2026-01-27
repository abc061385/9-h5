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
  CLAIM_STATIC_EARNINGS: "投资收益转入",
  CLAIM_DYNAMIC_REWARDS: "币权收益转入",
  REGIST: "报名活动", //47
  PAYDEPOSIT: "返还活动押金", // 49
  VIP_RACE_REWARD: "VIP报名赛奖金", // 48
  SMART_YIELD_INCOME: "SmartYieldWallet收益",
  CLAIM_SMART_YIELD_WALLET: "DepositintoSmartYieldWallet",
  CLAIM_SMART_YIELD_INCOME: "投资收益转入",
  CLAIM_SMART_YIELD_INCOME1: "投资收益转入", // 静态投资收益转入
  CLAIM_SMART_YIELD_INCOME2: "币权收益转入", // 动态投资收益转入
  CLAIM_STATIC_EARNINGS_SMART: "depositIntoSmartWallet", // 存入SmartYieldWallet
  CLAIM_DYNAMIC_REWARDS_SMART: "depositIntoSmartWallet",
  CLAIM_DYNAMIC_REWARDS_REDUCE: "depositIntoAssetsWallet", //存入平台钱包
  CLAIM_DYNAMIC_EARNINGS_REDUCE: "depositIntoAssetsWallet",
  CLAIM_SMART_YIELD_WALLET_REDUCE: "withdrawFromSmartWallet",
  TRANSFER: "transaction_TRANSFER",
  NP_ASSETS_RELEASE: "NP_ASSETS_RELEASE",
  GP_EXCHANGE: "GP_EXCHANGE", //60
  GP_BUY_IN: "GP_BUY_IN", //61
  GP_BUY_OUT: "GP_BUY_OUT", //62
  GP_SPOT_BUY: "GP_SPOT_BUY", //63
  GP_TRANSFER: "GP_TRANSFER", // 64
};

export type GAPreviousPageType = "withdraw" | "";
export type AddressPreviousPageType = "withdraw" | "";

export const WalletOrderType = [
  "INVESTMENT_INCOME", //27("投资收益")
  "VIP_REWARD", //28("VIP奖励")
  "EQUAL_LEVEL_REWARD", //29("平级奖励")
  "CURRENCY_RIGHTS_REWARD", //30("币权奖励")
  "DIRECT_PUSH_REWARD", //31("基金购买直推奖励")
  "INDIRECT_PUSH_REWARD", //32("基金购买间推奖励")
  "RETURN_OF_PRINCIPAL", //33("本金返回")

  "INVESTMENT_FUND", //34("购买基金")

  "CREATION_REWARD", //35("创世返回")
  "NODE_REWARD", //36("信仰节点收益")
  "NODE_RETURN", //37("信仰节点本金返回")
  "UBX_RETURN", //38("UBX解冻")
  "UBX_ADD", //39("UBX账号导入赠送")
  "FLASH_REDEMPTION_DEDUCTION", //40("闪兑扣款")
]; //一些特殊的类型

export const PLATFORMTOKEN = "9MT";
export const USD1 = "USD1";
