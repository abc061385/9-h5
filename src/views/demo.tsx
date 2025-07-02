"use client";
import Roulette from "@/components/roulette";
import useSWR from "swr";
import { getDemo } from "@/api/demo";
import { useState } from "react";
const DemoView = () => {
  const [params, setParams] = useState({ id: "" });
  const { data: user, isLoading } = useSWR(
    params?.id ? ["getDemo", params] : null,
    ([, p]) => getDemo(p),
  );
  return (
    <div>
      <div>
        <button
          className="text-4xl"
          onClick={() => {
            setParams({ id: Math.random().toString() });
          }}
        >
          Re-request
        </button>
        <span>
          {isLoading ? (
            <span className="inline-block animate-spin">x</span>
          ) : (
            user?.id || "---"
          )}
        </span>
      </div>
      <Roulette />
    </div>
  );
};

export default DemoView;
