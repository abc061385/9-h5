import { cn } from "@/lib/utils";
import { FC } from "react";

interface IChallengeProgressProps {
  value: number;
  max: number;
}

const ChallengeProgress: FC<IChallengeProgressProps> = ({ value, max }) => {
  return (
    <div className="relative">
      <progress
        className="progress progress-gradient1 w-full h-5 rounded-[14px] bg-border2"
        value={value}
        max={max}
      ></progress>
      <span
        className={cn(
          "absolute translate-x-[-120%] font-medium text-xs leading-4 text-white top-0.5"
        )}
        style={{ left: `${((value / max) * 100).toFixed(0)}%` }}
      >
        {((value / max) * 100).toFixed(2)}%
      </span>
    </div>
  );
};

export default ChallengeProgress;
