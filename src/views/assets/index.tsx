"use client";

import ViewLayout from "@/components/layout";
import Header from "./header";
import AssetsListBox from "./list";

const AssetsView = () => {
  return (
    <ViewLayout dock className="size-full">
      <div className="p-content pb-0 flex flex-col bg-bg">
        <Header />
        <AssetsListBox />
      </div>
    </ViewLayout>
  );
};
export default AssetsView;
