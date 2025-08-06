import { cn } from "@/lib/utils";
import { FC, HTMLAttributes } from "react";

type IProps = {
  value: string | number;
  unit: string;
  className?: HTMLAttributes<HTMLDivElement>["className"];
};
export const NumberWithUnit: FC<IProps> = ({ value, unit, className }) => {
  return (
    <span className={cn(["inline-block text-sm", className])}>
      {value} {unit}
    </span>
  );
};
