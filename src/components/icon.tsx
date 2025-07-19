import { cn } from "@/lib/utils";
import { IconName } from "@/types/icons";
import Image, { ImageProps } from "next/image";
import * as React from "react";
import { FC } from "react";
import BaseImage from "./base-image";

export interface IconProps extends Pick<ImageProps, "className"> {
  name: IconName;
}

export const Icon: FC<IconProps> = ({ name, className }) => {
  return (
    <BaseImage
      alt={name}
      src={`/icons/${name}.svg`}
      className={cn(["inline-block", "size-4", className])}
    />
  );
};
