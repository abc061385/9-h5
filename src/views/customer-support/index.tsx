"use client";

import ViewLayout from "@/components/layout";

export default function CustomerSupportView() {
  return (
    <ViewLayout>
      <div className="absolute top-0 left-0"></div>
      <div className="absolute top-0 left-0 hjfull w-full">
        <div id="chat-container" className="size-full"></div>
      </div>
    </ViewLayout>
  );
}
