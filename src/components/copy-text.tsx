import React, { PropsWithChildren } from "react";
import toast from "react-hot-toast";
import { Icon } from "./icon";

type CopyTextProps = {
  text: string;
  copySuccessTip?: string;
  className?: string;
  theme?: "dark" | "light";
};

const CopyText: React.FC<PropsWithChildren<CopyTextProps>> = ({
  text,
  copySuccessTip,
  children,
  className,
  theme = "dark",
}) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setTimeout(() => {
        toast.success(copySuccessTip || "复制成功");
      }, 200);
    } catch (err) {
      console.error("复制失败：", err);
    }
  };

  return (
    <div onClick={handleCopy} className={className}>
      {children ? (
        children
      ) : (
        <Icon name={theme === "dark" ? "copy-user-dark" : "copy-user"} />
      )}
    </div>
  );
};

export default CopyText;
