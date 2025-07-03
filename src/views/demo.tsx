"use client";
import Roulette from "@/components/roulette";
import useSWR from "swr";
import { useState } from "react";
import { api } from "@/api";
const DemoView = () => {
  const [params, setParams] = useState({ pageNo: 1, pageSize: 20 });
  const { data: user, isLoading } = useSWR(
    params?.pageNo && params.pageSize
      ? ["pageAnnouncementUsingGet", params]
      : null,
    ([, p]) => api.cms.pageAnnouncementUsingGet(p),
  );
  // api.auth.infoUsingGet().then(console.log);
  return (
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
          {isLoading ? (
            <span className="inline-block animate-spin">x</span>
          ) : (
            user?.data.size
          )}{" "}
          {user?.message}
        </span>
      </div>
      <Roulette />
    </div>
  );
};

export default DemoView;
