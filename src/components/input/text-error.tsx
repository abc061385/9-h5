import { FC, PropsWithChildren } from "react";

export const TextError: FC<PropsWithChildren> = ({ children }) => {
  return children ? (
    <div className="label text-error text-xs font-medium">{children}</div>
  ) : null;
};
