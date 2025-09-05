"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";

const VIPLevelUpChallengeRecordsView = () => {
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
