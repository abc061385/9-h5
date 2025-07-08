import { PropsWithChildren } from "react";
import { Launch } from "./launch";
import { cn } from "@/lib/utils";

export const LayoutWarp = ({ children }: PropsWithChildren) => {
  return (
    <div className={cn(["relative layout-warp h-full max-w-[767PX] mx-auto"])}>
      <div
        className={cn([
          "size-full",
          "md:mockup-phone md:border-gray-500  md:bg-white md:p-0",
        ])}
      >
        <Launch>{children}</Launch>
      </div>
    </div>
  );
};
