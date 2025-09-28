import { cn } from "@/lib/utils";
import { IconName } from "@/types/icons";
import { ImageProps } from "next/image";
import * as React from "react";
import { FC } from "react";
import BaseImage from "./base-image";

export interface IconProps extends Pick<ImageProps, "className"> {
  name: IconName;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

export const Icon: FC<IconProps> = ({ name, className, onClick }) => {
  return (
    <BaseImage
      alt={name}
      src={`/icons/${name}.svg`}
      className={cn(["inline-block", "size-4", className])}
      cover={false}
      onClick={onClick}
    />
  );
};
