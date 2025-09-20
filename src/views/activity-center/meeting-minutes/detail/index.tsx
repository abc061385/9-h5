"use client";

import BaseImage from "@/components/base-image";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";

const MeetingMinutesDetailView = () => {
  return (
    <ViewLayout
      theme="dark"
      header={
        <HeaderWithBack
          title="Meeting Minutes - Hong Kong"
          algin="center"
          theme="dark"
        />
      }
    >
      <div className="p-content text-white">
        <BaseImage
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGG_z1ki7A9dGDxY6QOtuStF9jNuLy9Vz1gHt330-Wpx_Qrc1hmM4_jTDRhA&s"
          className="w-full h-[148px] rounded-lg overflow-hidden"
        />
        <p className="text-sm leading-5 mt-6">
          The Hong Kong Activity Center provides offline support for Chinese and
          English users. It was an important site for the brand&apos;s initial
          launch and is now regularly used for small meetups, course launches,
          and user Q&A activities.
        </p>
        <div className="h-[1px] bg-text3 my-6"></div>

        <h2 className="text-lg font-medium leading-6">Live video</h2>

        <video
          src="https://9m-test-public.s3.ap-southeast-1.amazonaws.com/h5_upload/20250920_074016_1b48857b.mp4"
          controls
          className="w-full h-45 rounded-lg mb-6"
        ></video>

        <video
          src="https://9m-test-public.s3.ap-southeast-1.amazonaws.com/h5_upload/20250920_074016_1b48857b.mp4"
          controls
          className="w-full h-45 rounded-lg mb-6"
        ></video>

        <h2 className="text-lg font-medium leading-6 mb-6">Live video</h2>

        <div className="grid grid-cols-2 gap-2">
          {[...new Array(6)].map((_, i) => {
            return (
              <BaseImage
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGG_z1ki7A9dGDxY6QOtuStF9jNuLy9Vz1gHt330-Wpx_Qrc1hmM4_jTDRhA&s"
                }
                key={i}
                className="h-22 w-full rounded-md overflow-hidden"
              />
            );
          })}
        </div>
      </div>
    </ViewLayout>
  );
};
export default MeetingMinutesDetailView;
