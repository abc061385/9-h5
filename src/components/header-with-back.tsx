import { cn } from "@/lib/utils";
import { ReactNode, useMemo } from "react";
import { Icon } from "./icon";
import { useRouter as useI18nRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import Bridge from "@/lib/dsBridge";
import Platform from "@/lib/platfrom";

type IProps = {
  title?: ReactNode;
  algin?: "center" | "right";
  className?: string;
  onChange?: () => void;
  path?: string;
  onClick?: () => void;
  theme?: "light" | "dark";
};
export const HeaderWithBack = ({
  title,
  algin = "right",
  className = "",
  onChange,
  path,
  onClick,
  theme = "dark",
}: IProps) => {
  const warpClass = cn([
    "flex items-center w-full h-[44px] p-content pl-2 bg-white",
    theme === "light" ? "bg-white" : "bg-bg text-white",
    className,
  ]);
  const { push, back } = useI18nRouter();

  const params = useSearchParams();
  const handleBack = () => {
    onChange?.();
    if (onClick) return onClick();
    if (path) return push(path);

    const refApp = params.get("r") || "";
    if (Platform.isInApp() && refApp === "app" && Bridge.goBack) {
      Bridge.goBack();
    } else {
      back();
    }
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
        className={cn(["cursor-pointer flex", notHistory && "text-red-400"])}
        onClick={handleBack}
      >
        <Icon
          name={theme === "light" ? "back_icon" : "back_icon_l"}
          className="w-11 h-11"
        />
      </i>
      <span className="flex-1 flex justify-center pr-5.5 font-bold">
        {algin === "center" ? title : null}
      </span>
      <span className="text-lg font-bold">
        {algin === "right" ? title : null}
      </span>
    </div>
  );
};
