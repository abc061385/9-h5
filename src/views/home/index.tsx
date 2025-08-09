"use client";

import ViewLayout from "@/components/layout";
import BannerBox from "./banner";
// import CardsBox from "./cards";
import FundBox from "./fund";
import HomeHeaderBox from "./header";

export default function HomeView() {
  return (
    <ViewLayout
      dock={true}
      header={<HomeHeaderBox />}
      className="h-max md-pc:h-full pt-15.5 pb-20"
      heightFull
    >
      <BannerBox />
      <div className="px-content">
        {/* <ChartBox /> */}
        <FundBox />
        {/* <CardsBox /> */}
      </div>
    </ViewLayout>
  );
}
