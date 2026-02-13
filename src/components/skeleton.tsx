import { cn } from "@/lib/utils";
import { FC, HTMLAttributes } from "react";

type IProps = HTMLAttributes<HTMLDivElement> & { isLoading: boolean };
export const Skeleton: FC<IProps> = ({ className, isLoading, children }) => {
  return (
    <div className={cn([isLoading ? "skeleton rounded-md bg-bg1" : "bg-transparent", className])}>
      <div className={cn(isLoading ? "invisible" : "")}>{children}</div>
    </div>
  );
};
