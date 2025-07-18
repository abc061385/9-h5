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
  login: "/login",
  register: "/register",
  verification: "/verification",
  fund: "/fund/",
  "helper-ai": "helper-ai/",
  news: "/news/",
  teams: "/teams/",
  user: "/user/",
  vip: "/vip/",
};
