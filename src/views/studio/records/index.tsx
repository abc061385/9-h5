"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";

const StudioRecordsView = () => {
  return (
    <ViewLayout
      header={<HeaderWithBack title="Submit Records" algin="center" />}
    >
      <div className="p-content">
        {[...new Array(3)].map((_, i) => {
          return (
            <div key={i} className="bg-bg2 rounded-lg p-4 mt-4">
              <div className="flex items-center justify-between leading-6">
                <b>Application Type:</b>
                <span className="text-rise">Passed</span>
              </div>
              <div className="font-bold mb-4">Training Center</div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-text3">Date:</span>
                <span>2025-09-03 12:21</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text3">Number of participants</span>
                <span>50</span>
              </div>
            </div>
          );
        })}
      </div>
    </ViewLayout>
  );
};

export default StudioRecordsView;
