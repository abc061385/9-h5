"use client";
import BaseImage from "@/components/base-image";
import { Icon } from "@/components/icon";
import ViewLayout from "@/components/layout";

const DownloadView = () => {
  return (
    <ViewLayout className="bg-[url('/images/download/download-bg.png')] bg-cover">
      <div className="p-content pb-10 text-center">
        <BaseImage
          src="/images/common/logo.svg"
          className="w-[186px] h-[72px] mt-14"
        />
        <BaseImage
          src="/images/download/download-demo.png"
          className="w-[322px] h-[369px] mt-14"
        />
        <h3 className="font-bold text-xl leading-[24px] mt-4 mb-10">
          Let&apos;s experience AI that can make money on its own
        </h3>
        <button className="btn btn-gradient w-full mb-2">
          <Icon name="App-store" className="mr-2" />
          IOS Download
        </button>
        <button className="btn btn-gradient w-full">
          <Icon name="Android" className="mr-2" />
          Android Download
        </button>
      </div>
    </ViewLayout>
  );
};
export default DownloadView;
