import { cn } from "@/lib/utils";
import { FC, HTMLAttributes } from "react";

type IProps = HTMLAttributes<HTMLDivElement> & { isLoading: boolean };
export const Skeleton: FC<IProps> = ({ className, isLoading, children }) => {
  return isLoading ? (
    <div className={cn(["skeleton", className])}></div>
  ) : (
    children
  );
};
