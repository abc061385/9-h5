"use client";

import ViewLayout from "@/components/layout";
import BannerBox from "./banner";
import CardsBox from "./cards";
import ChartBox from "./chart";
import FundBox from "./fund";
import HomeHeaderBox from "./header";

export default function HomeView() {
  return (
    <ViewLayout dock={true} header={<HomeHeaderBox />} className="pt-16.5">
      <div className="px-content">
        <BannerBox />
        <ChartBox />
        <FundBox />
        <CardsBox />
      </div>
    </ViewLayout>
  );
}
