import { Virtuoso, VirtuosoProps } from "react-virtuoso";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";

type IProps<T> = Pick<VirtuosoProps<T, any>, "itemContent" | "className"> & {
  data: T[];
  fetchMore: (index: number) => Promise<T[]>;
};

export const InfiniteList = <T,>({
  className,
  itemContent,
  data,
  fetchMore,
}: IProps<T>) => {
  const [items, setItems] = useState(data);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setItems(data);
    setHasMore(true);
  }, [data]);
  const loadMore = useCallback(
    async (index: number) => {
      if (loading || !hasMore) return;
      setLoading(true);
      const next = await fetchMore(index);
      if (next.length === 0) setHasMore(false);
      else setItems((prev) => [...prev, ...next]);
      setLoading(false);
    },
    [loading, hasMore, fetchMore],
  );
  return (
    <Virtuoso
      className={cn(["size-full", className])}
      data={items}
      itemContent={itemContent}
      endReached={(i) => loadMore(i)}
      increaseViewportBy={200}
      components={{
        EmptyPlaceholder: () => (
          <div
            style={{ padding: 16, textAlign: "center", gridColumn: "1 / -1" }}
          >
            <em>表格暂无数据</em>
          </div>
        ),
        Footer: () => {
          return (
            <div>
              {loading
                ? "加载中…"
                : hasMore
                  ? "下滑加载更多"
                  : "没有更多数据了"}
            </div>
          );
        },
      }}
    />
  );
};
