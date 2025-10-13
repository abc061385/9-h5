import { useEffect, useRef } from "react";

export function useKeepCursorEnd(value: string) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = ref.current;
    if (input && document.activeElement === input) {
      const len = input.value.length;
      input.setSelectionRange(len, len);
    }
  }, [value]);

  return ref;
}
