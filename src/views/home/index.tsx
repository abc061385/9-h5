"use client";

import ViewLayout from "@/components/layout";
import BannerBox from "./banner";
import CardsBox from "./cards";
import ChartBox from "./chart";
import FundBox from "./fund";

export default function HomeView() {
  return (
    <ViewLayout dock={true} header={<div>1</div>}>
      <div className="p-content">
        <BannerBox />
        <ChartBox />
        <FundBox />
        <CardsBox />
      </div>
    </ViewLayout>
  );
}
