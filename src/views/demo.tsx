"use client";
import ViewLayout from "@/components/layout";
import Roulette from "@/components/roulette";
// import useSWR from "swr";
import { useState } from "react";
// import { api } from "@/api";
const DemoView = () => {
  const [params, setParams] = useState({ pageNo: 1, pageSize: 20 });
  // const { data: user, isLoading } = useSWR(
  //   params?.pageNo && params.pageSize
  //     ? ["pageAnnouncementUsingGet", params]
  //     : null,
  //   ([, p]) => api.cms.pageAnnouncementUsingGet(p),
  // );
  // api.auth.infoUsingGet().then(console.log);
  return (
    <ViewLayout dock={true}>
      <div className="h-[2000px]">
        <div>
          <button
            className="text-4xl"
            onClick={() => {
              setParams({ ...params, pageNo: 2 });
            }}
          >
            Re-request
          </button>
          {/* <span> */}
          {/*   {isLoading ? ( */}
          {/*     <span className="inline-block animate-spin">x</span> */}
          {/*   ) : ( */}
          {/*     user?.data.size */}
          {/*   )}{" "} */}
          {/*   {user?.message} */}
          {/* </span> */}
        </div>
        <div className="tabs tabs-box">
          <a role="tab" className="tab flex-1">
            Tab 1
          </a>
          <a role="tab" className="tab tab-active flex-1">
            Tab 2
          </a>
        </div>
        <Roulette />
      </div>
    </ViewLayout>
  );
};

export default DemoView;
