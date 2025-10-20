"use client";

import ViewLayout from "@/components/layout";
import { HeaderWithBack } from "@/components/header-with-back";
import BaseImage from "@/components/base-image";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { api } from "@/api";
import { utils } from "@/lib/utils";
import { Icon } from "@/components/icon";
import { useLocale } from "next-intl";
import { useCallback, useState } from "react";
import { InfiniteList } from "@/components/infinite-list";
import { Modal } from "@/components/modal";
import { useTrans } from "@/hooks/useTrans";
// import { Page, Document } from "react-pdf";
// import { pdfjs } from "react-pdf";
// pdfjs.GlobalWorkerOptions.workerSrc = "/js/pdf.worker.min.mjs";

type Item = {
  thumbnailUrl: string;
  originalUrl: string;
  fileName: string;
  content: string;
  coverUrl: string;
};
const FAQDocView = () => {
  const { data } = useRequestQuery(
    api.publicizeDocVideo.getDocListUsingGet,
    {}
  );
  const t = useTrans();
  // const [currentUrl, setCurrentUrl] = useState("");
  const [open, setOpen] = useState(false);
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
    [locale]
  );
  // const [numPages, setNumPages] = useState<number>();
  // function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
  //   setNumPages(numPages);
  // }
  return (
    <ViewLayout
      heightFull
      header={<HeaderWithBack title={t("faq_document")} algin="center" />}
    >
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="pt-6">
          {/* <iframe src={currentUrl} width="100%" height="100%" /> */}
          {/* <object data={currentUrl} type="application/pdf" width="100%"> */}
          {/*   <p className="text-center"> */}
          {/*     <a href={currentUrl} target="_blank" className="text-primary"> */}
          {/*       Open PDF in a new tab */}
          {/*     </a> */}
          {/*   </p> */}
          {/* </object> */}
          {/* <Document file={currentUrl} onLoadSuccess={onDocumentLoadSuccess}> */}
          {/*   <Page pageNumber={1} /> */}
          {/* </Document> */}
        </div>
      </Modal>
      <div className="min-h-full  bg-bg3 relative">
        <div className="absolute top-0 bottom-0 size-full ">
          <InfiniteList<Item, unknown>
            data={list}
            fetchMore={() => Promise.resolve([])}
            itemContent={(index, item) => (
              <div className="p-content relative">
                <div className="aspect-[358/185]" key={index + "_posters"}>
                  <div className="size-full flex items-center [background:var(--color-gradient3)]">
                    <a
                      href={item.originalUrl}
                      target="_blank"
                      className="text-primary size-full flex items-center"
                    >
                      {item.coverUrl ? (
                        <img
                          src={item.coverUrl}
                          className="size-full object-cover"
                          alt=""
                        />
                      ) : (
                        <BaseImage
                          src="/images/common/logo.svg"
                          className="w-full aspect-[100/20]"
                        />
                      )}

                      {/* <BaseImage */}
                      {/*   src={item.coverUrl} */}
                      {/*   className="size-full block" */}
                      {/*   // onClick={() => { */}
                      {/*   //   setCurrentUrl(item.originalUrl); */}
                      {/*   //   setOpen(true); */}
                      {/*   // }} */}
                      {/* /> */}
                    </a>
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
