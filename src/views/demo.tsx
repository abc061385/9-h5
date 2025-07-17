"use client";
import { Drawer } from "@/components/drawer";
import ViewLayout from "@/components/layout";
// import Roulette from "@/components/roulette";
import { Verification } from "@/components/verification";
import useSWR from "swr";
import { useState } from "react";
import { api } from "@/api";
import { useStore } from "@/store";
import { cn } from "@/lib/utils";
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

  return (
    <ViewLayout dock={true}>
      <div>
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
        <div>{initLoading ? "loading " : userInfo.tel}</div>
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
      </div>
    </ViewLayout>
  );
};

export default DemoView;
