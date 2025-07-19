import { cn } from "@/lib/utils";
import { IconName } from "@/types/icons";
import Image, { ImageProps } from "next/image";
import * as React from "react";
import { FC } from "react";

export interface IconProps
  extends Omit<ImageProps, "alt" | "src" | "width" | "height"> {
  name: IconName;
  size?: number;
  color?: string;
}

export const Icon: FC<IconProps> = ({
  name,
  size = 24,
  className,
  ...props
}) => {
  return (
    <Image
      alt={name}
      src={`/icons/${name}.svg`}
      width={size}
      height={size}
      className={cn(["inline-block", className])}
      {...props}
    />
  );
};
