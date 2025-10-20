import { cn } from "@/lib/utils";
import { FC } from "react";

interface IChallengeProgressProps {
  value: number;
  max: number;
}

const ChallengeProgress: FC<IChallengeProgressProps> = ({
  value = 0,
  max = 1,
}) => {
  return (
    <div className="relative">
      <progress
        className="progress progress-gradient1 w-full h-5 rounded-[14px] bg-border2"
        value={value > max ? max : value}
        max={max}
      ></progress>
      <span
        className={cn(
          "absolute font-medium text-xs leading-4 text-white top-0.5",
          (value / max) * 100 > 16
            ? "translate-x-[-120%]"
            : "translate-x-2 text-text1"
        )}
        style={{
          left: `${(((value > max ? max : value) / max) * 100).toFixed(0)}%`,
        }}
      >
        {(((value > max ? max : value) / max) * 100).toFixed(2)}%
      </span>
    </div>
  );
};

export default ChallengeProgress;
