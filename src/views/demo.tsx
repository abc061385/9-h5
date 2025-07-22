"use client";
import { Drawer } from "@/components/drawer";
import ViewLayout from "@/components/layout";
// import Roulette from "@/components/roulette";
import { Verification } from "@/components/verification";
import { useEffect, useState } from "react";
import { api } from "@/api";
import { InfiniteList } from "@/components/infinite-list";
// import { useRequestQuery } from "@/hooks/useRequestQuery";
import { useRequestMutation } from "@/hooks/useRequestMutation";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
const asyncA = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log("异步等待");
      resolve([]);
    }, 5000);
  });

type User = {
  name: string;
  size: number;
  description: string;
};
const DemoView = () => {
  const [params, setParams] = useState({ pageNo: 1, pageSize: 20 });
  const [open, setOpen] = useState(false);
  // const { data: typeData, isLoading } = useRequestQuery(
  //   api.kline.latestPriceUsingGet,
  //   {},
  // );
  // console.log("typeData", typeData, isLoading);
  const {
    trigger,
    data: log,
    isMutating: isLogLoading,
  } = useRequestMutation(api.cms.pageAnnouncementUsingGet);

  const [infiniteData, setInfiniteData] = useState<User[]>([]);

  const debouncedTrigger = useDebouncedCallback(trigger, 100);
  useEffect(() => {
    debouncedTrigger({ pageNo: 1, pageSize: 100 });
    const list = Array.from({ length: 100 }, (_, index) => ({
      name: `User ${index}`,
      size: Math.floor(Math.random() * 40) + 70,
      description: `Description for user ${index}`,
    }));
    setInfiniteData(list);
  }, []);
  return (
    <ViewLayout dock={true} heightFull>
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
          <InfiniteList<User, { context: number }>
            data={infiniteData}
            context={{ context: 123999999 }}
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
            itemContent={(_, user, context) => (
              <div>
                <p className="text-red-400">context: {context.context}</p>
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
