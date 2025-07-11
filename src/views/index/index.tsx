"use client";
import ViewLayout from "@/components/layout";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function IndexView() {
  const t = useTranslations();

  return (
    <ViewLayout dock={true}>
      <div>
        Index
        <h1>{t("common.more")}</h1>
        <button className={cn(["btn btn-primary text-[20px] w-full"])}>
          点击我
        </button>
      </div>
    </ViewLayout>
  );
}
