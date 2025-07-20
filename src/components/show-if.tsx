import { PropsWithChildren } from "react";

interface ShowIfProps {
  condition: boolean;
}

export const ShowIf: React.FC<PropsWithChildren<ShowIfProps>> = ({
  condition,
  children,
}) => (condition ? children : null);
