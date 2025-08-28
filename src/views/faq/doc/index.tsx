"use client";

import ViewLayout from "@/components/layout";
import { HeaderWithBack } from "@/components/header-with-back";
import BaseImage from "@/components/base-image";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { api } from "@/api";
import { utils } from "@/lib/utils";
import { Icon } from "@/components/icon";
import { useLocale } from "next-intl";
import { useCallback } from "react";
import { InfiniteList } from "@/components/infinite-list";

type Item = {
  thumbnailUrl: string;
  originalUrl: string;
  fileName: string;
  content: string;
};
const FAQDocView = () => {
  const { data } = useRequestQuery(
    api.publicizeDocVideo.getDocListUsingGet,
    {},
  );
  const list = (data?.data || []) as unknown as Item[];
  const locale = useLocale();
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
      header={<HeaderWithBack title="9M AI Documentation" algin="center" />}
    >
      <div className="min-h-full  bg-bg3 relative">
        <div className="absolute top-0 bottom-0 size-full ">
          <InfiniteList<Item, unknown>
            data={list}
            fetchMore={() => Promise.resolve([])}
            itemContent={(index, item) => (
              <div className="p-content relative">
                <div className="aspect-[358/185]" key={index + "_posters"}>
                  <div className="size-full flex items-center [background:var(--color-gradient3)]">
                    {/* {item?.originalUrl ? ( */}
                    {/*   <iframe */}
                    {/*     src={item.originalUrl} */}
                    {/*     width="100%" */}
                    {/*     height="100%" */}
                    {/*     frameBorder="0" */}
                    {/*     scrolling="no" */}
                    {/*     style={{ */}
                    {/*       border: "none", // CSS 方式移除边框 */}
                    {/*       overflow: "hidden", // 隐藏内容溢出的滚动条 */}
                    {/*     }} */}
                    {/*   /> */}
                    {/* ) : ( */}
                    <BaseImage
                      src="/images/common/logo.svg"
                      className="w-full aspect-[100/20]"
                    />
                    {/* )} */}
                  </div>
                  <div className="flex items-center justify-around w-full bg-white h-11">
                    <p className="truncate w-[60%]">{getTitle(item)}</p>
                    &nbsp;
                    <Icon
                      name="download"
                      className="size-5"
                      onClick={() =>
                        utils.downloadFile(item.originalUrl, item.fileName)
                      }
                    />
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
        {/*           <iframe */}
        {/*             src={item.originalUrl} */}
        {/*             width="100%" */}
        {/*             height="100%" */}
        {/*             frameBorder="0" */}
        {/*             scrolling="no" */}
        {/*             style={{ */}
        {/*               border: "none", // CSS 方式移除边框 */}
        {/*               overflow: "hidden", // 隐藏内容溢出的滚动条 */}
        {/*             }} */}
        {/*           /> */}
        {/*         ) : ( */}
        {/*           <BaseImage */}
        {/*             src="/images/common/logo.svg" */}
        {/*             className="w-full aspect-[100/20]" */}
        {/*           /> */}
        {/*         )} */}
        {/*       </div> */}
        {/*       <div className="flex items-center justify-around w-full bg-white h-11"> */}
        {/*         <p className="truncate w-[60%]">{getTitle(item)}</p> */}
        {/*         &nbsp; */}
        {/*         <Icon */}
        {/*           name="download" */}
        {/*           className="size-5" */}
        {/*           onClick={() => */}
        {/*             utils.downloadFile(item.originalUrl, item.fileName) */}
        {/*           } */}
        {/*         /> */}
        {/*       </div> */}
        {/*     </div> */}
        {/*   ); */}
        {/* })} */}
      </div>
    </ViewLayout>
  );
};

export default FAQDocView;
