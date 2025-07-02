"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
const Wheel = dynamic(
  () => import("react-custom-roulette").then((mod) => mod.Wheel),
  { ssr: false },
);
const data = [
  {
    option: "🍎 苹果",
    image: { uri: "/window.svg" },
    // style: { backgroundColor: "#e6194b", textColor: "white" },
  },
  {
    option: "🍌 香蕉",
    // style: { backgroundColor: "#ffe119", textColor: "black" },
  },
  {
    option: "🍇 葡萄",
    // style: { backgroundColor: "#4363d8", textColor: "white" },
  },
  {
    option: "🍉 西瓜",
    // style: { backgroundColor: "#3cb44b", textColor: "white" },
  },
  {
    option: "🥑 牛油果",
    // style: { backgroundColor: "#911eb4", textColor: "white" },
  },
];

export default function Roulette() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      setResult(null);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        fontSize={30}
        outerBorderColor="#00f"
        outerBorderWidth={1}
        innerRadius={20}
        innerBorderColor="#f00"
        innerBorderWidth={10}
        radiusLineColor="#0f0"
        radiusLineWidth={4}
        onStopSpinning={() => {
          setMustSpin(false);
          setResult(data[prizeNumber].option);
        }}
      />
      <button
        style={{ marginTop: 20, padding: "10px 20px", fontSize: 16 }}
        onClick={handleSpinClick}
      >
        🎲 开始转！
      </button>
      {result && <h2 style={{ marginTop: 20 }}>你获得了：{result}</h2>}
    </div>
  );
}
