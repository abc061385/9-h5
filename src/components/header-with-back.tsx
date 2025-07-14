import { cn } from "@/lib/utils";
import { ReactNode, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "./icon";

type IProps = {
  title?: ReactNode;
  algin?: "center" | "right";
};
export const HeaderWithBack = ({ title, algin = "right" }: IProps) => {
  const warpClass = cn(["flex items-center"]);
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
    <div className={cn(warpClass, "pb-2")}>
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
