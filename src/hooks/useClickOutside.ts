import { useEffect, useRef } from "react";

type TargetType = HTMLElement | null;
type Target =
  | (() => TargetType)
  | TargetType
  | React.MutableRefObject<TargetType>;
type EventType = keyof DocumentEventMap;

/**
 * 获取真实的 DOM 元素
 */
function getTargetElement(target: Target): HTMLElement | null {
  if (!target) return null;
  if (typeof target === "function") return target();
  if ("current" in target) return target.current;
  return target;
}

/**
 * 判断事件是否发生在目标元素外部
 */
function isOutside(targets: HTMLElement[], event: Event): boolean {
  return !targets.some((el) => el && el.contains(event.target as Node));
}

/**
 * ahooks 风格的 useClickAway 实现
 * @param onClickAway 点击外部执行的回调
 * @param target 目标元素或元素数组
 * @param eventName 事件类型，默认 'click'
 */
export function useClickAway(
  onClickAway: (event: Event) => void,
  target: Target | Target[],
  eventName: EventType = "click"
) {
  const handlerRef = useRef(onClickAway);
  handlerRef.current = onClickAway;

  useEffect(() => {
    const targets = Array.isArray(target) ? target : [target];
    const targetEls = targets
      .map(getTargetElement)
      .filter(Boolean) as HTMLElement[];

    const listener = (event: Event) => {
      if (isOutside(targetEls, event)) {
        handlerRef.current?.(event);
      }
    };

    document.addEventListener(eventName, listener);
    return () => {
      document.removeEventListener(eventName, listener);
    };
  }, [target, eventName]);
}
