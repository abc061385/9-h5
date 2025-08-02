"use client";

import BaseImage from "@/components/base-image";
import FundHeaderBox from "./header";
import ListBox from "./list";
import ViewLayout from "@/components/layout";

const FundView = () => {
  return (
    <ViewLayout
      className="h-max md-pc:h-full"
      heightFull
      dock={true}
      header={<FundHeaderBox />}
    >
      <div className="p-content">
        <BaseImage src="/images/fund/banner.png" className="w-full h-25" />
        <ListBox />
      </div>
    </ViewLayout>
  );
};

export default FundView;
