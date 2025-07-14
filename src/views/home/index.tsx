"use client";

import BannerBox from "./banner";
import CardsBox from "./cards";
import ChartBox from "./chart";
import FundBox from "./fund";

export default function HomeView() {
  return (
    <div className="p-content">
      <BannerBox />
      <ChartBox />
      <FundBox />
      <CardsBox />
    </div>
  );
}
