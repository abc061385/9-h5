import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Lightweight wrappers around Next.js' navigation
// APIs that consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

export const routerMap = {
  index: "/",
  home: "/home",
  login: "/login",
  register: "/register",
  verification: "/verification",
  fund: "/fund",
  "helper-ai": "helper-ai",
  news: "/news",
  teams: "/teams",
  user: "/user",
  vip: "/vip",
};
