import { cn } from "@/lib/utils";
import { ReactNode, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "./icon";

type IProps = {
  title?: ReactNode;
  algin?: "center" | "right";
  className?: string;
  fixed?: boolean;
};
export const HeaderWithBack = ({
  title,
  algin = "right",
  className = "",
  fixed = true,
}: IProps) => {
  const warpClass = cn([
    "flex items-center w-full",
    fixed ? "fixed top-0 left-0 z-50 p-content bg-white" : "",
    className,
  ]);
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const notHistory = useMemo(() => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      return false;
    } else {
      return true;
    }
  }, [router]);
  return (
    <div className={warpClass}>
      <i
        className={cn(["cursor-pointer", notHistory && "text-red-400"])}
        onClick={handleBack}
      >
        <Icon name="left-arrow" />
      </i>
      <span className="flex-1 flex justify-center">
        {algin === "center" ? title : null}
      </span>
      <span>{algin === "right" ? title : null}</span>
    </div>
  );
};
