import { PropsWithChildren } from "react";

export const LayoutWarp = ({ children }: PropsWithChildren) => {
  return (
    <div className="layout-warp h-full max-w-[767PX] mx-auto">{children}</div>
  );
};
