import { cn } from "@/lib/utils";
import { ReactNode, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "./icon";

type IProps = {
  title?: ReactNode;
  algin?: "center" | "right";
  className?: string;
  onChange?: () => void;
};
export const HeaderWithBack = ({
  title,
  algin = "right",
  className = "",
  onChange,
}: IProps) => {
  const warpClass = cn([
    "flex items-center w-full h-[44px] p-content",
    className,
  ]);
  const router = useRouter();

  const handleBack = () => {
    onChange && onChange();
    router.back();
  };

  const notHistory = useMemo(() => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      return false;
    } else {
      return true;
    }
  }, []);
  return (
    <div className={cn(warpClass, "pb-2")}>
      <i
        className={cn(["cursor-pointer", notHistory && "text-red-400"])}
        onClick={handleBack}
      >
        <Icon name="left-arrow" />
      </i>
      <span className="flex-1 flex justify-center pr-3 font-bold">
        {algin === "center" ? title : null}
      </span>
      <span>{algin === "right" ? title : null}</span>
    </div>
  );
};
