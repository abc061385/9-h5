import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CoinIconProps {
  coins: { src: string; alt?: string }[]; // 最多两个
  size?: number; // 图标大小 px
  overlap?: number; // 重叠偏移 px（仅双币时）
  className?: string;
  border?: boolean;
  rounded?: boolean;
}

const CoinIcon: React.FC<CoinIconProps> = ({
  coins,
  size = 28,
  overlap = 12,
  className = "",
  border = true,
  rounded = true,
}) => {
  const showDouble = coins.length === 2;

  return (
    <div className={cn("relative flex items-center", className)}>
      {coins.slice(0, 2).map((coin, index) => {
        const isSecond = index === 1;
        return (
          <div
            key={index}
            className={cn(
              "overflow-hidden bg-white",
              rounded && "rounded-full",
              border && "border border-white",
              "shrink-0",
              isSecond && showDouble ? "absolute left-0" : ""
            )}
            style={{
              width: size,
              height: size,
              left: isSecond && showDouble ? overlap : undefined,
              zIndex: isSecond ? 0 : 10,
            }}
          >
            <Image
              src={coin.src}
              alt={coin.alt || "coin"}
              fill
              className="object-contain"
            />
          </div>
        );
      })}
    </div>
  );
};

export default CoinIcon;
