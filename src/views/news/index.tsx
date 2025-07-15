"use client";

import BaseImage from "@/components/base-image";
import { HeaderWithBack } from "@/components/header-with-back";
import { useTrans } from "@/hooks/useTrans";
import { useRouter } from "@/i18n/navigation";

const NewsView = () => {
  const { push } = useRouter();
  const t = useTrans();
  return (
    <>
      <HeaderWithBack title={t("消息中心")} algin="center" />
      <div className="p-content">
        <button className="btn btn-primary flex justify-between mb-4">
          {t("公告")}
          <BaseImage
            src="/images/news/news_icon.png"
            className="w-8 h-8 ml-1.5"
          />
        </button>
        {[...new Array(10)].map((_, index) => (
          <div
            key={index}
            className="bg-[#F3F1FF] rounded-lg p-2 mt-2 font-bold"
            onClick={() => {
              push("/news/detail");
            }}
          >
            <div className="flex items-center">
              <BaseImage
                src="/images/news/list_logo.png"
                className="w-5.5 h-5.5 mr-1"
              />
              <div className="flex-1 font-bold text-xs">
                Announcement on the Completion of System Upgrade and Resumption
                of the Charge & Withdrawal Function
              </div>
            </div>
            <div className="text-[#9D95B5] my-2 text-xs">
              Announcement Code：9M2506080...
            </div>
            <div className="text-[#9D95B5] text-xs">
              Times：2025-06-08 05:50:29
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NewsView;
