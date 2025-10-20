import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Lightweight wrappers around Next.js' navigation
// APIs that consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

// 客户端推送
let globalPush!: ReturnType<typeof useRouter>["push"];
export function initRouterPush(pushFn: ReturnType<typeof useRouter>["push"]) {
  globalPush = pushFn;
}

export function navigateTo(...args: Parameters<typeof globalPush>) {
  if (!globalPush) throw new Error("Router 未初始化");
  return globalPush(...args);
}

export const routerMap = {
  index: "/",
  home: "/home/",
  walletDeposit: "/wallet/deposit/",
  walletWithdraw: "/wallet/withdraw/",
  walletWithdrawConfirm: "/wallet/withdraw/confirm/",
  walletWithdrawResults: "/wallet/withdraw/results/",
  login: "/login/",
  register: "/register/",
  verification: "/verification/",
  fund: "/fund/",
  "helper-ai": "/helper-ai/",
  news: "/news/",
  newsDetail: "/news/detail/",
  teams: "/teams/",
  teamsNext: "/teams/next/",
  user: "/user/",
  vip: "/vip/",
  assets: "/assets/",
  assetsWalletDetail: "/wallet/detail/",
  upgrade: "/assets/upgrade/",
  income: "/assets/income/",
  incomeResult: "/assets/income/results/",
  lang: "/user/lang/",
  rule: "/fund/rule/",
  fundBuy: "/fund/buy/",
  fundProtocol: "/fund/protocol/",
  invite: "/invite/",
  setting: "/setting/",
  settingPassword: "/setting/password/",
  settingGoogleVerify: "/setting/google-verify/",
  settingBindEmail: "/setting/bind-email/",
  assetsExchange: "/assets/exchange/",
  settingAddress: "/setting/address/",
  settingAddressAdd: "/setting/address/add/",
  fundSuccess: "/fund/success/",
  fundRecord: "/fund/record/",
  fundDetail: "/fund/detail/",
  walletTransDetail: "/wallet/transaction-detail/",
  teamDetail: "/teams/detail/",
  forgotPassword: "/forgot-password/",
  aboutUs: "/about-us/",
  protocol: "/protocol/",
  "customer-support": "/customer-support/",
  faq: "/faq/",
  faq_doc: "/faq/doc/",
  faq_introduction: "/faq/introduction/",
  faq_msb: "/faq/msb/",
  faq_posters: "/faq/posters/",
  faq_sec: "/faq/sec/",
  faq_video: "/faq/video/",
  accounts: "/user/accounts/",
  accountsAdd: "/user/accounts/add/",
  accountsRegister: "/user/accounts/register/",
  teamsInformation: "/teams/information/",
  certificate: "/certificate/",
  studio: "/studio/",
  studioRecords: "/studio/records",
  VIPChallengeRecord: "/vip-challenge/records",
  VIPChallenge: "/vip-challenge/",
  meetup: "/meetup/",
  meetupRecords: "/meetup/records",
  activity: "/activitys/",
  activityCenter: "/activity-center",
  meetingMinutes: "/activity-center/meeting-minutes/",
  meetingMinutesDetail: "/activity-center/meeting-minutes/detail",
  smartYield: "/assets/smart-yield/",
  businessSchool: "/business-school/",
  businessSchoolPreviousHighlights: "/business-school/previous-highlights/",
  businessSchoolPreviousHighlightsDetail:
    "/business-school/previous-highlights/detail/",
};

export const WhiteListPath = [
  routerMap.home,
  routerMap.index,
  routerMap.register,
  routerMap.login,
  routerMap.forgotPassword,
  routerMap.protocol,
  routerMap.news,
  routerMap.newsDetail,
  routerMap.verification,
  routerMap["customer-support"],
  routerMap.faq,
  routerMap.faq_doc,
  routerMap.faq_video,
  routerMap.faq_posters,
  routerMap.faq_msb,
  routerMap.faq_sec,
  routerMap.faq_introduction,
];
