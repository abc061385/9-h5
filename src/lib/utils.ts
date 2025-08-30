import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import CryptoJS from "crypto-js";
import { AESsecretKey } from "./const";
import lodash from "./lodash";
import toBigNumber from "./bignumber";
import dayjs from "dayjs";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isString(value: string): boolean {
  return Object.prototype.toString.call(value) === "[object String]";
}

/**
 * 通用脱敏函数
 * @param str 原始字符串
 * @param front 保留前几位
 * @param back 保留后几位
 * @returns 脱敏后的字符串
 */
export function maskString(str: string, front = 2, back = 2): string {
  if (!str) return "";
  return maskCore(str, front, back);
}

function maskCore(str: string, front: number, back: number): string {
  const len = str.length;

  const visibleFront = str.slice(0, Math.min(front, len));
  const visibleBack = str.slice(len - Math.min(back, len));
  return visibleFront + "***" + visibleBack;
}

/**
 * 千分位格式化数字
 * @param input 数字或字符串（可以是整数、小数、负数）
 * @param options 可选配置项
 * @returns 格式化后的字符串
 */
export function formatThousand(
  input: number | string,
  options?: {
    separator?: string; // 默认使用 ","
    decimalSeparator?: string; // 默认使用 "."
  },
): string {
  const separator = options?.separator ?? ",";
  const decimalSeparator = options?.decimalSeparator ?? ".";

  if (input === null || input === undefined || input === "") return "";

  const numStr = String(input);
  const isNegative = numStr.startsWith("-");
  const [intPart, decPart] = numStr.replace("-", "").split(".");

  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  return (
    (isNegative ? "-" : "") +
    formattedInt +
    (decPart !== undefined ? decimalSeparator + decPart : "")
  );
}

export const getIsDev = (): boolean => process.env.NODE_ENV === "development";

export const encryptPassword = (password: string) => {
  const key = CryptoJS.enc.Utf8.parse(AESsecretKey);
  const cipherTxt = CryptoJS.AES.encrypt(password, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
  return cipherTxt;
};

/**
 * 格式化币种余额
 * @param value
 * @param precision
 * @returns
 */
export function formatBalance(
  value: string | number,
  precision: number,
): string {
  if (value == null || isNaN(Number(value))) return "--";

  const [intPart, decimalPart = ""] = String(value).split(".");
  const trimmedDecimal = decimalPart.slice(0, precision).padEnd(precision, "0");

  // 添加千分位
  const formattedInt = Number(intPart).toLocaleString("en-US");

  return precision > 0 ? `${formattedInt}.${trimmedDecimal}` : formattedInt;
}

function copyText(text: string) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed"; // 避免滚动影响
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("复制失败", err);
    }
    document.body.removeChild(textarea);
    return Promise.resolve();
  }
}

/**
 * 解析 JWT，设置 cookie 到 *.abc.com
 * @param token JWT 字符串
 * @param cookieName Cookie 名称，默认 "token"
 */
function setJwtCookie(token: string, cookieName = "token") {
  if (!token) return;
  try {
    // 拆分 JWT
    const payloadBase64 = token.split(".")[1];
    if (!payloadBase64) throw new Error("无效的 JWT");

    // Base64 解码
    const payloadJson = atob(
      payloadBase64.replace(/-/g, "+").replace(/_/g, "/"),
    );
    const payload = JSON.parse(payloadJson);

    // 获取过期时间（exp 单位是秒）
    const exp = payload.date;
    if (!exp) throw new Error("JWT 中没有 exp 字段");

    // 转换成 GMT 时间字符串
    const expires = new Date(exp * 1000).toUTCString();

    const domain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN || ".9mc.one";
    // 设置 cookie，domain 为 9mc.one，支持子域名
    document.cookie = `${cookieName}=${token}; expires=${expires}; path=/; domain=${domain}; secure; SameSite=Lax`;

    console.log("✅ Token 已设置，过期时间:", expires);
  } catch (err) {
    console.error("❌ 解析或设置 JWT 出错:", err);
  }
}

const downloadFile = (url: string, fileName: string) => {
  axios({
    url,
    method: "GET",
    responseType: "blob", // 重要：指定响应类型为 Blob
    headers: { "Cache-Control": "no-cache" },
  })
    .then((response) => {
      if (response.status === 200) {
        const blob = response.data;
        const link = document.createElement("a");
        const href = window.URL.createObjectURL(blob);

        link.href = href;
        link.download = fileName;
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();

        // 清理资源
        document.body.removeChild(link);
        window.URL.revokeObjectURL(href);
      }
    })
    .catch(() => {});
};

export const utils = {
  ...lodash,
  toBigNumber,
  dayjs,
  copyText,
  setJwtCookie,
  downloadFile,
};
