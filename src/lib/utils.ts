import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
