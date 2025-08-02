import React, { useEffect, useRef, useState } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  onDone?: () => void;
  className?: string;
}

const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 50,
  onDone,
  className,
}) => {
  const [elements, setElements] = useState<React.ReactNode[]>([]);
  const indexRef = useRef(0);
  const cancelledRef = useRef(false);

  useEffect(() => {
    if (typeof text !== 'string' || !text.length) return;

    indexRef.current = 0;
    setElements([]);
    cancelledRef.current = false;

    const type = () => {
      if (cancelledRef.current) return;

      const i = indexRef.current;
      if (i >= text.length) {
        onDone?.();
        return;
      }

      const char = text.charAt(i);
      setElements((prev) => [
        ...prev,
        char === '\n' ? <br key={i} /> : char,
      ]);

      indexRef.current += 1;
      setTimeout(type, speed);
    };

    type(); // 首次调用

    return () => {
      cancelledRef.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 👈 空依赖数组，确保只执行一次

  return <div className={className}>{elements}</div>;
};

export default Typewriter;
