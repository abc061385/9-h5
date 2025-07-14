import React from "react";
import { cn } from "@/lib/utils";

export type TagType =
  | "outlined-solid" //有实线边框、透明背景
  | "outlined-dashed" //有虚线边框、透明背景
  | "filled" //有背景、无边框
  | "filled-bordered" //有背景、有边框
  | "plain"; //没有边框和背景，仅文本颜色

export interface TagProps {
  children: React.ReactNode;
  type?: TagType;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
  radius?: string;
  padding?: string;
  fontSize?: string;
  className?: string;
}

const BaseTag: React.FC<TagProps> = ({
  children,
  type = "filled",
  bgColor = "transparent",
  borderColor = "transparent",
  textColor = "",
  radius = "4px",
  padding = "2px 4px",
  fontSize = "12px",
  className = "",
}) => {
  const baseStyle: React.CSSProperties = {
    backgroundColor: type.includes("filled") ? bgColor : "transparent",
    border:
      type === "outlined-dashed"
        ? `1px dashed ${borderColor}`
        : type === "outlined-solid" || type === "filled-bordered"
        ? `1px solid ${borderColor}`
        : "none",
    color: textColor,
    borderRadius: radius,
    padding,
    fontSize,
    display: "inline-block",
  };

  return (
    <span className={cn(className)} style={baseStyle}>
      {children}
    </span>
  );
};

export default BaseTag;
