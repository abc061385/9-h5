import { Virtuoso, VirtuosoProps } from "react-virtuoso";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import BaseImage from "./base-image";
import { useTrans } from "@/hooks/useTrans";

type IProps<T, Context> = Pick<
  VirtuosoProps<T, Context>,
  "itemContent" | "className" | "context"
> & {
  data: T[];
  fetchMore?: (index: number) => Promise<T[]>;
  hiddenEmpty?: boolean;
  hiddenFooter?: boolean;
};

export const InfiniteList = <T, Context>({
  className,
  itemContent,
  data,
  context,
  fetchMore,
  hiddenEmpty = false,
  hiddenFooter = false,
}: IProps<T, Context>) => {
  const [items, setItems] = useState(data);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const t = useTrans();

  useEffect(() => {
    setItems(data);
    setHasMore(true);
  }, [data]);
  const loadMore = useCallback(
    async (index: number) => {
      if (!fetchMore) {
        return;
      }
      if (loading || !hasMore) return;
      setLoading(true);
      const next = await fetchMore(index);
      if (next.length === 0) setHasMore(false);
      else setItems((prev) => [...prev, ...next]);
      setLoading(false);
    },
    [loading, hasMore, fetchMore],
  );
  const footerNode = useCallback(() => {
    return (
      <div className="text-center">
        {loading ? t("common.loading") : hasMore ? t("common.more") : ""}
      </div>
    );
  }, [loading, hasMore, t]);
  return (
    <Virtuoso<T, Context>
      className={cn(["size-full", className])}
      data={items}
      context={context}
      itemContent={itemContent}
      endReached={(i) => loadMore(i)}
      increaseViewportBy={200}
      components={{
        EmptyPlaceholder: () =>
          hiddenEmpty ? null : (
            <div
              style={{ padding: 16, textAlign: "center", gridColumn: "1 / -1" }}
            >
              <BaseImage src="/common/no_data.png" />
            </div>
          ),
        Footer: () => {
          return hiddenFooter ? null : footerNode();
        },
      }}
    />
  );
};
