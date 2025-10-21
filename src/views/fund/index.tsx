"use client";

import { useMemo } from "react";
import FundHeaderBox from "./header";
import ListBox from "./list";
import ViewLayout from "@/components/layout";
import Platform from "@/lib/platfrom";

const FundView = () => {
  const isDock = useMemo(() => {
    return !Platform.isInApp();
  }, []);
  return (
    <ViewLayout
      className="h-max md-pc:h-full overflow-hidden flex flex-col"
      heightFull
      dock={isDock}
      header={<FundHeaderBox />}
    >
      <div className="p-content pb-0 flex-1 flex flex-col">
        <ListBox />
      </div>
    </ViewLayout>
  );
};

export default FundView;
