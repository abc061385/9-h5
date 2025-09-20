"use client";

import BaseImage from "@/components/base-image";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import HorizontalTabs from "@/components/tabs/horizontal-tabs";
import { useState } from "react";

const MeetingMinutesView = () => {
  const [tabsValue, setTabsValue] = useState("China");
  const tabsList = [
    { label: "China", value: "China" },
    { label: "Korea", value: "Korea" },
    { label: "Japan", value: "Japan" },
    { label: "Thailand", value: "Thailand" },
    { label: "China", value: "China1" },
    { label: "Korea", value: "Korea1" },
    { label: "Japan", value: "Japan1" },
    { label: "Thailand", value: "Thailand1" },
    { label: "China", value: "China2" },
    { label: "Korea", value: "Korea2" },
    { label: "Japan", value: "Japan2" },
    { label: "Thailand", value: "Thailand2" },
  ];

  const meetingList = [
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGG_z1ki7A9dGDxY6QOtuStF9jNuLy9Vz1gHt330-Wpx_Qrc1hmM4_jTDRhA&s",
      date: "2025-08-10",
      city: "Hong Kong",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGG_z1ki7A9dGDxY6QOtuStF9jNuLy9Vz1gHt330-Wpx_Qrc1hmM4_jTDRhA&s",
      date: "2025-08-12",
      city: "被精",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGG_z1ki7A9dGDxY6QOtuStF9jNuLy9Vz1gHt330-Wpx_Qrc1hmM4_jTDRhA&s",
      date: "2025-08-14",
      city: "牛曰",
    },
  ];
  return (
    <ViewLayout
      theme="dark"
      header={
        <HeaderWithBack title="Meeting minutes" algin="center" theme="dark" />
      }
    >
      <div className="p-content text-white overflow-hidden">
        <HorizontalTabs
          tabs={tabsList}
          value={tabsValue}
          type="border"
          borderClassName="bg-white"
          activeClassName="!text-white"
          className="!text-text5"
          wrapClassName="gap-6"
          onChange={(e) => setTabsValue(e as string)}
        />
        <div className="flex justify-between items-center gap-4 my-6">
          <BaseImage
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGG_z1ki7A9dGDxY6QOtuStF9jNuLy9Vz1gHt330-Wpx_Qrc1hmM4_jTDRhA&s"
            className="size-10 rounded-full overflow-hidden"
          />
          <div className="flex-1 flex flex-col font-medium">
            <span className="text-lg leading-6">China</span>
            <span className="text-sm leading-4">Activity Center</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-text5">Establishment Time</span>
            <span className="text-sm">2025-04-10</span>
          </div>
        </div>
        <p className="text-sm leading-5">
          The Hong Kong Activity Center provides offline support for Chinese and
          English users. It was an important site for the brand&apos;s initial
          launch and is now regularly used for small meetups, course launches,
          and user Q&A activities.
        </p>
        <div className="h-[1px] bg-text3 my-6"></div>
        <h3 className="font-medium text-lg leading-6">Meeting</h3>
        {meetingList.map((v, i) => {
          return (
            <div key={i} className="mt-6">
              <BaseImage
                src={v.src}
                className="w-full h-[148px] rounded-lg overflow-hidden"
              />
              <div className="text-sm leading-4 mt-4 flex justify-between items-center">
                <span>{v.date}</span>
                <span>{v.city}</span>
              </div>
            </div>
          );
        })}
      </div>
    </ViewLayout>
  );
};
export default MeetingMinutesView;
