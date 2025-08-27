"use client";

import ViewLayout from "@/components/layout";
import { HeaderWithBack } from "@/components/header-with-back";
import BaseImage from "@/components/base-image";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { api } from "@/api";
import { utils } from "@/lib/utils";
import { Icon } from "@/components/icon";

const FAQDocView = () => {
  const { data } = useRequestQuery(
    api.publicizeDocVideo.getDocListUsingGet,
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
      <div className="grid grid-cols-1 gap-4 p-content bg-bg3">
        {list.map((item, index) => {
          return (
            <div
              className="aspect-[358/185] relative "
              key={index + "_posters"}
            >
              <div className="size-full flex items-center [background:var(--color-gradient3)]">
                {/* <embed */}
                {/*   src={item.originalUrl} */}
                {/*   type="application/pdf" */}
                {/*   width="200px" */}
                {/*   height="100px" */}
                {/* /> */}
                <BaseImage
                  src="/images/common/logo.svg"
                  className="w-full aspect-[100/20]"
                />
              </div>
              <div className="flex items-center justify-around w-full bg-white h-11">
                <p className="truncate w-[60%]">{item.fileName}</p>
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
          );
        })}
      </div>
    </ViewLayout>
  );
};

export default FAQDocView;
