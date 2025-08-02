"use client";

import FundHeaderBox from "./header";
import ListBox from "./list";
import ViewLayout from "@/components/layout";

const FundView = () => {
  return (
    <ViewLayout
      className="h-max md-pc:h-full overflow-hidden"
      heightFull
      dock={true}
      header={<FundHeaderBox />}
    >
      <div className="p-content">
        <ListBox />
      </div>
    </ViewLayout>
  );
};

export default FundView;
