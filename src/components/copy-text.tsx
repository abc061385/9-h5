import React, { PropsWithChildren } from "react";
import toast from "react-hot-toast";
import { Icon } from "./icon";
import { utils } from "@/lib/utils";
import { useTrans } from "@/hooks/useTrans";

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
  const t = useTrans();
  const handleCopy = async () => {
    try {
      utils.copyText(text).then(() => {
        toast.success(copySuccessTip || t("transactionDetail.copy"));
      });
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
