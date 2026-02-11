"use client";

import ViewLayout from "@/components/layout";
import { HeaderWithBack } from "@/components/header-with-back";
import BaseImage from "@/components/base-image";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { api } from "@/api";
import { utils } from "@/lib/utils";
import { useState } from "react";
import { Modal } from "@/components/modal";
import { useTrans } from "@/hooks/useTrans";

const FAQPostersView = () => {
  const [open, setOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const { data } = useRequestQuery(api.publicizePoster.getListUsingGet, {});
  const t = useTrans();
  const list = (data?.data || []) as unknown as {
    thumbnailUrl: string;
    originalUrl: string;
    fileName: string;
  }[];
  return (
    <ViewLayout
      heightFull
      header={<HeaderWithBack title={t("faq_posters")} algin="center" />}
    >
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setCurrentUrl("");
        }}
      >
        <div className="pt-6 flex items-center justify-center">
          <img src={currentUrl} alt="" />
        </div>
      </Modal>
      <div className="grid grid-cols-2 gap-4 p-content bg-bg">
        {list.map((item, index) => {
          return (
            <div
              onClick={() => {
                setCurrentUrl(item.originalUrl);
                setOpen(true);
              }}
              style={
                { "--img": `url(${item.thumbnailUrl})` } as React.CSSProperties
              }
              className="aspect-[350/496] bg-[image:var(--img)] bg-cover bg-center relative"
              key={index + "_posters"}
            >
              <BaseImage
                onClick={(e) => {
                  e.stopPropagation();
                  utils.downloadFile(item.originalUrl, item.fileName);
                }}
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
