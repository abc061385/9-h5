import React, { useEffect, useState, useRef } from "react";

interface CountdownProps {
  seconds: number; // 初始秒数
  onFinish?: () => void; // 倒计时完成的回调
  render?: (count: number) => React.ReactNode; // 自定义渲染方式
}

const Countdown: React.FC<CountdownProps> = ({ seconds, onFinish, render }) => {
  const [count, setCount] = useState(seconds);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          onFinish?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerRef.current!);
    };
  }, [count, onFinish]);

  return (
    <>
      {render ? (
        render(count)
      ) : (
        <span className="text-primary text-xs font-bold">{count}s</span>
      )}
    </>
  );
};

export default Countdown;
