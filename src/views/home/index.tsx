"use client";

import BannerBox from "./banner";
import CardsBox from "./cards";
import ChartBox from "./chart";
import FundBox from "./fund";

export default function HomeView() {
  return (
    <div className="px-4.5">
      <BannerBox />
      <ChartBox />
      <FundBox />
      <CardsBox />
    </div>
  );
}
