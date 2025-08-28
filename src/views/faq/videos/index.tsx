"use client";

import ViewLayout from "@/components/layout";
import { HeaderWithBack } from "@/components/header-with-back";
import BaseImage from "@/components/base-image";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { api } from "@/api";
import { useLocale } from "next-intl";
import { useCallback } from "react";
import Platform from "@/lib/platfrom";
import { InfiniteList } from "@/components/infinite-list";

type Item = {
  thumbnailUrl: string;
  originalUrl: string;
  fileName: string;
  content: string;
};
const FAQVideosView = () => {
  const { data } = useRequestQuery(
    api.publicizeDocVideo.getVideoListUsingGet,
    {},
  );
  const locale = useLocale();
  const list = (data?.data || []) as unknown as Item[];
  const getTitle = useCallback(
    (item: Item) => {
      const _content = JSON.parse(item.content || "{}");
      const _title = _content[locale] || _content["en"];
      if (_title) {
        return _title;
      }
      return "-";
    },
    [locale],
  );
  return (
    <ViewLayout
      heightFull
      header={<HeaderWithBack title="Promotional Video" algin="center" />}
    >
      <div className="min-h-full bg-bg3 relative">
        <div className="absolute top-0 bottom-0 size-full ">
          <InfiniteList<Item, unknown>
            data={list}
            fetchMore={() => Promise.resolve([])}
            itemContent={(index, item) => (
              <div className="p-content relative">
                <div
                  className="aspect-[358/185] relative mb-4"
                  key={index + "_posters"}
                >
                  <div className="size-full flex items-center [background:var(--color-gradient3)]">
                    {item?.originalUrl ? (
                      <video
                        controls
                        muted
                        autoPlay={!Platform.isDesktop()}
                        className="w-full h-full"
                      >
                        <source src={item.originalUrl} type="video/mp4" />
                        您的浏览器不支援该影片播放。
                      </video>
                    ) : (
                      <BaseImage
                        src="/images/common/logo.svg"
                        className="w-full aspect-[100/20]"
                      />
                    )}
                  </div>
                  <div className="flex items-center w-full bg-white h-11 p-4">
                    <p className="truncate w-[100%]">{getTitle(item)}</p>
                  </div>
                </div>
              </div>
            )}
          />
        </div>
        {/* {list.map((item, index) => { */}
        {/*   return ( */}
        {/*     <div */}
        {/*       className="aspect-[358/185] relative mb-4" */}
        {/*       key={index + "_posters"} */}
        {/*     > */}
        {/*       <div className="size-full flex items-center [background:var(--color-gradient3)]"> */}
        {/*         {item?.originalUrl ? ( */}
        {/*           <video */}
        {/*             controls */}
        {/*             muted */}
        {/*             autoPlay={!Platform.isDesktop()} */}
        {/*             className="w-full h-full" */}
        {/*           > */}
        {/*             <source src={item.originalUrl} type="video/mp4" /> */}
        {/*             您的浏览器不支援该影片播放。 */}
        {/*           </video> */}
        {/*         ) : ( */}
        {/*           <BaseImage */}
        {/*             src="/images/common/logo.svg" */}
        {/*             className="w-full aspect-[100/20]" */}
        {/*           /> */}
        {/*         )} */}
        {/*       </div> */}
        {/*       <div className="flex items-center w-full bg-white h-11 p-4"> */}
        {/*         <p className="truncate w-[100%]">{getTitle(item)}</p> */}
        {/*       </div> */}
        {/*     </div> */}
        {/*   ); */}
        {/* })} */}
      </div>
    </ViewLayout>
  );
};

export default FAQVideosView;
