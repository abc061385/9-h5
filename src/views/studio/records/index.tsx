"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { createAxiosInstance, ApiResponse } from "@/lib/axios";
import { useCallback, useEffect, useState } from "react";
import { StudioRecordsListType } from "../type";
import { ShowIf } from "@/components/show-if";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { ListNoData } from "@/components/nodata/list-nodata";

dayjs.extend(utc);

const StudioRecordsView = () => {
  const api = createAxiosInstance("/app/");

  const [list, setList] = useState<StudioRecordsListType[]>();
  const [loading, setLoading] = useState(true);

  const getList = useCallback(async () => {
    setLoading(true);
    try {
      const res: ApiResponse<{ list: StudioRecordsListType[] }> = await api.get(
        "/workroom/page-list"
      );
      if (res.code === 200) {
        setList(res?.data?.list || []);
        setLoading(false);
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

  const statusText = ["审核中", "已通过", "未通过"];
  const statusTextColor = ["text-text1", "text-rise", "text-fall"];

  return (
    <ViewLayout
      header={<HeaderWithBack title="Submit Records" algin="center" />}
    >
      <div className="p-content">
        {
          <ShowIf
            condition={!loading}
            elseEl={<span className="loading flex mx-auto mt-10"></span>}
          >
            {list?.length ? (
              list?.map((v) => {
                return (
                  <div key={v.id} className="bg-bg2 rounded-lg p-4 mt-4">
                    <div className="flex items-center justify-between leading-6">
                      <b>Application Type:</b>
                      <span className={cn(statusTextColor[v.status])}>
                        {statusText[v.status] || "--"}
                      </span>
                    </div>
                    <div className="font-bold mb-4">
                      {v.siteType === 1 ? "Training Hub" : "Training Center"}
                    </div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-text3">Date:</span>
                      <span>
                        {dayjs(v.createTime)
                          .utc()
                          .local()
                          .format("YYYY-MM-DD HH:mm:ss")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text3">Number of participants</span>
                      <span>{v.participantNumber}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <ListNoData />
            )}
          </ShowIf>
        }
      </div>
    </ViewLayout>
  );
};

export default StudioRecordsView;
