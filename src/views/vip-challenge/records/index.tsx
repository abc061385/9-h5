"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useCallback, useEffect, useState } from "react";
import { createAxiosInstance, ApiResponse } from "@/lib/axios";
import { ShowIf } from "@/components/show-if";
import dayjs from "dayjs";
import { ListNoData } from "@/components/nodata/list-nodata";
import { cn } from "@/lib/utils";

interface ListType {
  endTime: string;
  id: number;
  startTime: string;
  status: number;
  statusStr: string;
  targetVipLevel: number;
  targetVipLevelStr: string;
}

const VIPLevelUpChallengeRecordsView = () => {
  const api = createAxiosInstance("/app/");

  const [list, setList] = useState<ListType[]>([]);
  const [loading, setLoading] = useState(true);

  const getList = useCallback(async () => {
    setLoading(true);
    try {
      const res: ApiResponse<ListType[]> = await api.get(
        "/level-race/registration-record"
      );
      if (res.code === 200) {
        setLoading(false);
        setList(res.data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getList();
  }, [getList]);

  const statusText = ["In Progress", "Successful", "Failed"];
  const statusTextColor = ["text-text1", "text-rise", "text-fall"];
  return (
    <ViewLayout
      header={<HeaderWithBack title="Challenge Records" algin="center" />}
    >
      <div className="p-content">
        <ShowIf
          condition={!loading}
          elseEl={<span className="loading flex mx-auto mt-10"></span>}
        >
          {list?.length ? (
            list?.map((v) => {
              return (
                <div className="bg-bg2 p-4 rounded-2xl mb-4" key={v.id}>
                  <div className="flex justify-between items-center mb-4">
                    <b>Target level: VIP{v.targetVipLevel}</b>
                    <span className={cn(statusTextColor[v.status])}>
                      {statusText[v.status]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text3">Date:</span>
                    <span>
                      {dayjs(v.startTime).format("YYYY-MM-DD HH:mm")} ~{" "}
                      {dayjs(v.endTime).format("YYYY-MM-DD HH:mm")}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <ListNoData />
          )}
        </ShowIf>
      </div>
    </ViewLayout>
  );
};

export default VIPLevelUpChallengeRecordsView;
