"use client";

import { api } from "@/api";
import ViewLayout from "@/components/layout";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import BaseImage from "@/components/base-image";
import { routerMap, useRouter } from "@/i18n/navigation";
import { HeaderWithBack } from "@/components/header-with-back";
import { useTrans } from "@/hooks/useTrans";

const FAQIntroductionView = () => {
  const t = useTrans();
  const { push } = useRouter();

  const { data } = useRequestQuery(
    api.nineIndex.privacyPolicy.getPrivacyPolicy,
    { type: 5 },
  );
  const detail = data?.data || {};

  return (
    <ViewLayout
      className="relative"
      header={<HeaderWithBack title={t("平台介绍")} algin="center" />}
    >
      <div className="absolute top-11 left-0 size-full overscroll-y-auto">
        <div className="flex justify-center mt-[40px] mb-[20px] bg-bg">
          <BaseImage
            src="/images/common/logo-start.svg"
            className="h-[170px] w-[100px] cursor-pointer"
            onClick={() => push(routerMap.home)}
          />
        </div>
        <div
          className="p-content text-sm"
          dangerouslySetInnerHTML={{
            __html: detail?.["content"] || "",
          }}
        ></div>
      </div>
    </ViewLayout>
  );
};

export default FAQIntroductionView;
