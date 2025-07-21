import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
// @ts-expect-error - 忽略三方警告
import CryptoJS from "crypto-js";
import { AESsecretKey } from "./const";
import lodash from "./lodash";

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

export const utils = {
  ...lodash,
};
