'use client';

import BaseImage from "@/components/base-image";
import FundHeaderBox from "./header";
import ListBox from "./list";

const FundView = () => {
  return (
    <div className="p-content pt-12">
      <FundHeaderBox />
      <BaseImage src="/images/fund/banner.png" className="w-full h-25" />
      <ListBox />
    </div>
  );
};

export default FundView;
