import { FC, PropsWithChildren } from "react";

export const TextError: FC<PropsWithChildren> = ({ children }) => {
  return children ? (
    <div className="label text-primary text-xs font-medium text-wrap">
      {children}
    </div>
  ) : null;
};
