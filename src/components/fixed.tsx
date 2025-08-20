import { cn } from "@/lib/utils";

export const FixedComponent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(["md-pc:absolute fixed", className])}>{children}</div>
  );
};
