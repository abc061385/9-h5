"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useCallback, useEffect } from "react";
import { createAxiosInstance, ApiResponse } from "@/lib/axios";

const VIPLevelUpChallengeRecordsView = () => {
  const api = createAxiosInstance("/app/");

  const getList = useCallback(async () => {
    const res: ApiResponse<unknown> = await api.get(
      "/level-race/registration-record"
    );
    console.log(res);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getList();
  }, [getList]);
  return (
    <ViewLayout
      header={<HeaderWithBack title="Challenge Records" algin="center" />}
    >
      <div className="p-content">
        <div className="bg-bg2 p-4 rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <b>Target level: VIP9</b>
            <span className="text-rise">Successful</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text3">Date:</span>
            <span>205-3-23 16:09 ~ 2025-5-23 16</span>
          </div>
        </div>
      </div>
    </ViewLayout>
  );
};

export default VIPLevelUpChallengeRecordsView;
