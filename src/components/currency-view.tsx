import { cn } from "@/lib/utils";
import { FC, HTMLAttributes } from "react";

type IProps = {
  value: string;
  currency: string;
  className?: HTMLAttributes<HTMLDivElement>["className"];
};
export const CurrencyView: FC<IProps> = ({ value, currency, className }) => {
  return (
    <span className={cn(["inline-block text-sm font-bold", className])}>
      {value}
      {currency}
    </span>
  );
};
