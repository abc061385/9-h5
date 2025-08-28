"use client";

import ViewLayout from "@/components/layout";
import { HeaderWithBack } from "@/components/header-with-back";
import BaseImage from "@/components/base-image";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { api } from "@/api";

const FAQVideosView = () => {
  const { data } = useRequestQuery(
    api.publicizeDocVideo.getVideoListUsingGet,
    {},
  );
  const list = (data?.data || []) as unknown as {
    thumbnailUrl: string;
    originalUrl: string;
    fileName: string;
  }[];
  return (
    <ViewLayout
      heightFull
      header={<HeaderWithBack title="Promotional Posters" algin="center" />}
    >
      <div className="min-h-full p-content bg-bg3">
        {list.map((item, index) => {
          return (
            <div
              className="aspect-[358/185] relative mb-4"
              key={index + "_posters"}
            >
              <div className="size-full flex items-center [background:var(--color-gradient3)]">
                <video controls className="w-full">
                  <source src={item.originalUrl} type="video/mp4" />
                  您的浏览器不支援该影片播放。
                </video>
                <BaseImage
                  src="/images/common/logo.svg"
                  className="w-full aspect-[100/20]"
                />
              </div>
              <div className="flex items-center w-full bg-white h-11 p-4">
                <p className="truncate w-[100%]">{item.fileName}</p>
              </div>
            </div>
          );
        })}
      </div>
    </ViewLayout>
  );
};

export default FAQVideosView;
