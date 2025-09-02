// InfiniteVirtuosoList.tsx
import { cn } from "@/lib/utils";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { Virtuoso, Components, VirtuosoGrid } from "react-virtuoso";
import { useTrans } from "@/hooks/useTrans";

export interface FetchDataResult<T> {
  data: T[];
  hasMore: boolean;
}

export interface InfiniteVirtuosoListProps<T> {
  fetchData: (page: number) => Promise<FetchDataResult<T>>;
  renderItem: (item: T, index: number) => React.ReactNode;
  virtuosoComponents?: Components<T>;
  className?: string;
  listClassName?: string;
  columns?: number;
  onReloadReady?: (reload: () => Promise<void>) => void;
}

export function InfiniteVirtuosoList<T>({
  fetchData,
  renderItem,
  virtuosoComponents,
  className,
  listClassName,
  columns = 1,
  onReloadReady,
}: InfiniteVirtuosoListProps<T>) {
  const t = useTrans();
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // 防止重复加载
  const lockRef = useRef(false);

  // 添加参数变化监听
  const prevFetchDataRef = useRef(fetchData);

  // 修改loadMore依赖
  const loadMore = useCallback(async () => {
    if (!hasMore || lockRef.current) return;
    lockRef.current = true;
    setLoading(true);
    console.log(page, "page");

    try {
      const res = await fetchData(page);
      setItems((prev) => [...prev, ...res.data]);
      setHasMore(res.hasMore);
      setPage((prev) => prev + 1);
    } finally {
      setLoading(false);
      lockRef.current = false;
    }
  }, [fetchData, page, hasMore]);

  const reload = useCallback(async () => {
    const { data } = await fetchData(1);
    setItems(data);
    setPage(1);
    setHasMore(true);
  }, [fetchData]);

  useEffect(() => {
    if (prevFetchDataRef.current !== fetchData) {
      prevFetchDataRef.current = fetchData;
      reload();
    }
  }, [reload, fetchData]);

  useEffect(() => {
    if (page === 1 || items.length === 0) {
      loadMore();
    }
  }, [loadMore, page, items]);

  useEffect(() => {
    if (onReloadReady) {
      onReloadReady(reload);
    }
  }, [onReloadReady, reload]);

  const LoadingRow = (
    <div style={{ padding: 16, textAlign: "center", color: "#666" }}>
      {loading
        ? t("common.loading")
        : hasMore
          ? t("walletDetail.loadMore")
          : t("walletDetail.noMoreData")}
    </div>
  );

  if (columns === 1) {
    return (
      <Virtuoso<T>
        className={cn(["size-full no-scrollbar", className])}
        data={items}
        endReached={loadMore}
        itemContent={(index, item) => renderItem(item, index)}
        components={{
          ...virtuosoComponents,
          Footer: () => LoadingRow,
        }}
      />
    );
  }

  return (
    <VirtuosoGrid
      className={cn(["size-full no-scrollbar", className])}
      totalCount={items.length}
      endReached={loadMore}
      itemContent={(index) => renderItem(items[index], index)}
      listClassName={cn(`grid grid-cols-${columns} gap-4 p-2`, listClassName)}
      components={{ Footer: () => LoadingRow }}
    />
  );
}
