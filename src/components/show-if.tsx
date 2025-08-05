import { PropsWithChildren, ReactNode } from "react";

interface ShowIfProps {
  condition: boolean;
  elseEl?: string | ReactNode;
}

export const ShowIf: React.FC<PropsWithChildren<ShowIfProps>> = ({
  condition,
  children,
  elseEl,
}) => (condition ? children : elseEl || null);
