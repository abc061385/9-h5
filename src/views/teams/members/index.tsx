"use client";

import { useState } from "react";
import ViewLayout from "@/components/layout";
import { HeaderWithBack } from "@/components/header-with-back";
import { Icon } from "@/components/icon";
import SubCardBox from "../sub-card";

const TeamsMembersView = () => {
  const [, setSearchValue] = useState("");

  return (
    <ViewLayout
      header={<HeaderWithBack title="Total Team Members" algin="center" />}
      heightFull
    >
      <div className="p-content">
        <label className="input w-full !bg-bg3 border-none placeholder:text-text5 mb-4">
          <Icon name="search" className="w-4 h-4" />
          <input
            type="search"
            className="grow"
            placeholder="Search for team member accounts"
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                setSearchValue((e.target as HTMLInputElement).value);
              }
            }}
          />
        </label>
        <SubCardBox />
      </div>
    </ViewLayout>
  );
};

export default TeamsMembersView;
