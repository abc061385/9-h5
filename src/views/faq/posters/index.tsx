"use client";

import ViewLayout from "@/components/layout";
import { HeaderWithBack } from "@/components/header-with-back";
import BaseImage from "@/components/base-image";

const FAQPostersView = () => {
  return (
    <ViewLayout
      header={<HeaderWithBack title="Promotional Posters" algin="center" />}
    >
      <div className="grid grid-cols-2 gap-4 p-content">
        <div className="aspect-[350/496] [background:var(--color-gradient3)] relative">
          <BaseImage
            src="/images/faq/download_icon.png"
            className="size-9 absolute bottom-4 left-0 right-0 m-auto"
          />
        </div>
        <div className="aspect-[350/496] [background:var(--color-gradient3)] relative">
          <BaseImage
            src="/images/faq/download_icon.png"
            className="size-9 absolute bottom-4 left-0 right-0 m-auto"
          />
        </div>
        <div className="aspect-[350/496] [background:var(--color-gradient3)] relative">
          <BaseImage
            src="/images/faq/download_icon.png"
            className="size-9 absolute bottom-4 left-0 right-0 m-auto"
          />
        </div>
        <div className="aspect-[350/496] [background:var(--color-gradient3)] relative">
          <BaseImage
            src="/images/faq/download_icon.png"
            className="size-9 absolute bottom-4 left-0 right-0 m-auto"
          />
        </div>
      </div>
    </ViewLayout>
  );
};

export default FAQPostersView;
