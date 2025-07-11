"use client";
import { cn } from "@/lib/utils";
import { useStore } from "@/store";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function IndexView() {
  const t = useTranslations();
  const setShowLayoutDock = useStore((s) => s.setShowLayoutDock);
  useEffect(() => {
    setShowLayoutDock(true);
  }, []);

  return (
    <div>
      <div
        className={cn([
          "w-[1217px] bg-primary text-primary-content mx-auto mt-4 rounded-box",
          "h5:w-[200px]",
        ])}
      >
        123
      </div>
      Index
      <h1>{t("common.more")}</h1>
      <button className="btn btn-primary text-[20px] w-full">点击我</button>
    </div>
  );
}
