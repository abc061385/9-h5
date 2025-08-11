"use client";

import FundHeaderBox from "./header";
import ListBox from "./list";
import ViewLayout from "@/components/layout";

const FundView = () => {
  return (
    <ViewLayout
      className="h-max md-pc:h-full overflow-hidden flex flex-col"
      heightFull
      dock={true}
      header={<FundHeaderBox />}
    >
      <div className="p-content pb-0 flex-1 flex flex-col">
        <ListBox />
      </div>
    </ViewLayout>
  );
};

export default FundView;
