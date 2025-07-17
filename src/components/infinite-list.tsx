import { Virtuoso, VirtuosoProps } from "react-virtuoso";
import { FC } from "react";
import { cn } from "@/lib/utils";

type IProps = Pick<
  VirtuosoProps<any, any>,
  "itemContent" | "data" | "className"
> & {};

export const InfiniteList: FC<IProps> = ({ className, itemContent, data }) => {
  return (
    <Virtuoso
      className={cn(["size-full", className])}
      data={data}
      itemContent={itemContent}
    />
  );
};
