"use client";

import ViewLayout from "@/components/layout";
import { HeaderWithBack } from "@/components/header-with-back";
import BaseImage from "@/components/base-image";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { api } from "@/api";
import { utils } from "@/lib/utils";

const FAQPostersView = () => {
  const { data } = useRequestQuery(api.publicizePoster.getListUsingGet, {});
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
      <div className="grid grid-cols-2 gap-4 p-content">
        {list.map((item, index) => {
          return (
            <div
              style={
                { "--img": `url(${item.thumbnailUrl})` } as React.CSSProperties
              }
              className="aspect-[350/496] bg-[image:var(--img)] bg-cover bg-center relative"
              key={index + "_posters"}
            >
              <BaseImage
                onClick={() =>
                  utils.downloadFile(item.originalUrl, item.fileName)
                }
                src="/images/faq/download_icon.png"
                className="size-9 absolute bottom-4 left-0 right-0 m-auto"
              />
            </div>
          );
        })}
      </div>
    </ViewLayout>
  );
};

export default FAQPostersView;
