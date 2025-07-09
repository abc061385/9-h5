"use client";
import { PropsWithChildren } from "react";
import { Launch } from "./launch";
import { cn } from "@/lib/utils";

export const LayoutWarp = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={cn([
        "relative layout-warp h-full max-w-[767PX] mx-auto",
        "md:border md:border-gray-500 md:rounded-2xl md:overflow-hidden",
      ])}
    >
      {/* <div */}
      {/*   className={cn([ */}
      {/*     "size-full", */}
      {/*     "md:mockup-phone md:border-gray-500  md:bg-white md:p-0", */}
      {/*   ])} */}
      {/* > */}
      <Launch>{children}</Launch>
      {/* </div> */}
    </div>
  );
};
