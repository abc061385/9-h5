import React, { PropsWithChildren } from "react";
import toast from "react-hot-toast";
import { Icon } from "./icon";

type CopyTextProps = {
  text: string;
  copySuccessTip?: string;
  className?: string;
};

const CopyText: React.FC<PropsWithChildren<CopyTextProps>> = ({
  text,
  copySuccessTip,
  children,
  className,
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
      {children ? children : <Icon name="copy-user" />}
    </div>
  );
};

export default CopyText;
