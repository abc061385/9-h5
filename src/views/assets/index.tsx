"use client";

import ViewLayout from "@/components/layout";
import Header from "./header";
import AssetsListBox from "./list";

const AssetsView = () => {
  return (
    <ViewLayout dock>
      <div className="p-content pb-0 h-full flex flex-col">
        <Header />
        <AssetsListBox />
      </div>
    </ViewLayout>
  );
};
export default AssetsView;
