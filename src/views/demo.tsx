"use client";
import { Drawer } from "@/components/drawer";
import ViewLayout from "@/components/layout";
// import Roulette from "@/components/roulette";
import { Verification } from "@/components/verification";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { api } from "@/api";
import { useStore } from "@/store";
import { InfiniteList } from "@/components/infinite-list";
const asyncA = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log("异步等待");
      resolve([]);
    }, 5000);
  });

const DemoView = () => {
  const [params, setParams] = useState({ pageNo: 1, pageSize: 20 });
  const [open, setOpen] = useState(false);
  const userInfo = useStore((s) => s.userInfo);
  const initLoading = useStore((s) => s.initLoading);
  const { data: log, isLoading: isLogLoading } = useSWR(
    params?.pageNo && params.pageSize
      ? ["pageAnnouncementUsingGet", params]
      : null,
    ([, p]) => api.cms.pageAnnouncementUsingGet(p),
  );
  const [infiniteData, setInfiniteData] = useState<any[]>([]);

  useEffect(() => {
    const list = Array.from({ length: 100 }, (_, index) => ({
      name: `User ${index}`,
      size: Math.floor(Math.random() * 40) + 70,
      description: `Description for user ${index}`,
    }));
    setInfiniteData(list);
  }, []);
  return (
    <ViewLayout dock={true}>
      <div className="flex flex-col size-full">
        <div>
          <button
            className="text-4xl"
            onClick={() => {
              setParams({ ...params, pageNo: 2 });
            }}
          >
            Re-request
          </button>
          <span>
            {isLogLoading ? (
              <span className="inline-block animate-spin">x</span>
            ) : (
              log?.data.size
            )}{" "}
            {log?.message}
          </span>
        </div>
        <div>{initLoading ? "loading " : userInfo?.tel}</div>
        <div className="tabs tabs-box">
          <a role="tab" className="tab flex-1">
            Tab 1
          </a>
          <a role="tab" className="tab tab-active flex-1">
            Tab 2
          </a>
        </div>
        <hr className="h-3" />
        <Verification />
        {/* <Roulette /> */}
        <button className="btn btn-primary" onClick={() => setOpen(true)}>
          弹出
        </button>
        <Drawer open={open} onChange={setOpen} className="h-[40vh]">
          <div>123</div>
        </Drawer>
        <div className="grow">
          <InfiniteList<{ name: string; size: number; description: string }>
            data={infiniteData}
            fetchMore={async (_index) => {
              if (_index > 150) {
                return [];
              }
              console.log("模拟请求api");
              await asyncA();
              console.log("拿到数据了");
              const list = Array.from({ length: 100 }, (_, index) => ({
                name: `User ${_index + index}`,
                size: Math.floor(Math.random() * 40) + 70,
                description: `Description for user ${_index + index}`,
              }));
              return list;
            }}
            itemContent={(_, user) => (
              <div>
                <p className="text-pink-600">
                  <strong>{user.name}</strong>
                </p>
                <div className="text-blue-400">{user.description}</div>
                <div className="divider"></div>
              </div>
            )}
          />
        </div>
      </div>
    </ViewLayout>
  );
};

export default DemoView;
