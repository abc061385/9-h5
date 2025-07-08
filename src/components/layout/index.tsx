"use client";
import { PropsWithChildren } from "react";
import { Navbar } from "./navbar";
import { LayoutWarp } from "./layout-warp";

export default function ViewLayout({ children }: PropsWithChildren) {
  return (
    <LayoutWarp>
      <div className="layout size-full">
        <Navbar />
        {children}
      </div>
    </LayoutWarp>
  );
}
