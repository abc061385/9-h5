import { utils } from "@/lib/utils";
import { useRef, useMemo, useEffect } from "react";

/**
 * 返回一个防抖后的函数，参数与输入一致。
 * 组件卸载时自动清理延迟。
 */
export function useDebouncedCallback<Args extends any[]>(
  callback: (...args: Args) => void,
  delay: number,
) {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedFn = useMemo(() => {
    const fn = utils.debounce((...args: Args) => {
      callbackRef.current(...args);
    }, delay);
    return fn;
  }, [delay]);

  useEffect(() => {
    return () => debouncedFn.cancel();
  }, [debouncedFn]);

  return debouncedFn;
}
