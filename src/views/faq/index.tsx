"use client";

import { api } from "@/api";
import ViewLayout from "@/components/layout";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import BaseImage from "@/components/base-image";
import { routerMap, useRouter } from "@/i18n/navigation";
import { useMemo } from "react";
import { useTrans } from "@/hooks/useTrans";
import { Icon } from "@/components/icon";
import { Skeleton } from "@/components/skeleton";

const regex = /<([a-zA-Z0-9]+)[^>]*>([\s\S]*?)<\/\1>/i;

function getFirstTagText(html: string) {
  const match = regex.exec(html);
  if (match) {
    // match[2] 是第一个标签里的内容
    return match[2].replace(/<[^>]+>/g, "").trim();
  }
  return "";
}

// const regex = /<([a-zA-Z0-9]+)[^>]*>([\s\S]*?)<\/\1>/g;
//
// function getAllTexts(html: string) {
//   const texts: string[] = [];
//   let match;
//
//   while ((match = regex.exec(html)) !== null) {
//     // 去掉内部嵌套标签，只保留纯文字
//     const text = match[2].replace(/<[^>]+>/g, "").trim();
//     if (text) texts.push(text);
//   }
//
//   return texts;
// }
const FAQView = () => {
  const t = useTrans();
  const { push } = useRouter();

  const { data, isLoading } = useRequestQuery(
    api.nineIndex.privacyPolicy.getPrivacyPolicy,
    {
      type: 5,
    },
  );

  const content = useMemo(() => {
    const detail = data?.data || {};
    return detail?.["content"] || "";
  }, [data?.data]);
  return (
    <ViewLayout heightFull>
      <div className="p-content">
        <BaseImage
          src="/images/common/logo.svg"
          className="h-[31px] w-[91px] cursor-pointer"
          onClick={() => push(routerMap.home)}
        />
        <div className="text-2xl font-bold text-center mb-6">
          {t("平台介绍")}
        </div>
        <Skeleton isLoading={isLoading}>
          <p className="text-sm min-h-[40px]">{getFirstTagText(content)}</p>
        </Skeleton>
        <div className="flex justify-center items-center text-sm mt-6">
          <span
            className="inline-block"
            onClick={() => push(routerMap.faq_introduction)}
          >
            {t("common.more")}
            <Icon name="right-enter" className="size-[10px]" />
          </span>
        </div>
        <div className="flex gap-2 mt-8">
          <button
            className="btn bg-black text-white flex-1 h-[48px]"
            onClick={() => push(routerMap.faq_msb)}
          >
            {t("msb_license")}
          </button>
          <button
            className="btn bg-black text-white flex-1 h-[48px]"
            onClick={() => push(routerMap.faq_sec)}
          >
            {t("sec_license")}
          </button>
        </div>
        <div className="text-2xl font-bold text-center mb-8 mt-16">
          {t("9m_ai_resource")}
        </div>

        <div className="flex flex-wrap gap-2">
          <div
            className="bg-black  flex-1 h-[168px] rounded-lg [background:var(--color-gradient3)] flex justify-center items-center flex-col"
            onClick={() => push(routerMap.faq_posters)}
          >
            <BaseImage
              src="/images/faq/Promotional Posters@2x.png"
              className="size-[40px]"
            />
            <p className="max-w-[80%] text-wrap text-center mt-6">
              {t("faq_posters")}
            </p>
          </div>
          <div
            className="bg-black  flex-1  rounded-lg [background:var(--color-gradient3)] flex justify-center items-center flex-col"
            onClick={() => push(routerMap.faq_doc)}
          >
            <BaseImage
              src="/images/faq/9M AI Documentation@2x.png"
              className="size-[40px]"
            />
            <p className="max-w-[80%] text-wrap text-center mt-6">
              {t("faq_document")}
            </p>
          </div>
          <div
            className="w-full h-[148px] bg-black  rounded-lg [background:var(--color-gradient3)] flex justify-center items-center flex-col"
            onClick={() => push(routerMap.faq_video)}
          >
            <BaseImage
              src="/images/faq/Promotional Videos@2x.png"
              className="size-[40px]"
            />
            <p className="mt-6">{t("faq_videos")}</p>
          </div>
        </div>

        <div>
          <button
            className="btn btn-block bg-primary text-white flex-1 h-[48px] mt-8 "
            onClick={() => {
              if (window.location) {
                window.location.href = "https://app.9mc.org/sebv";
              }
            }}
          >
            {t("faq_app_download")}
          </button>
          <button
            className="btn btn-block bg-[#A93AFF] text-white flex-1 h-[48px] mt-2"
            onClick={() => {
              if (window.location) {
                window.location.href = "https://www.9mc.ai/";
              }
            }}
          >
            {t("faq_website")}
          </button>
        </div>
        <div className="text-2xl font-bold mt-12">FAQ</div>
        <div>
          <div className="collapse collapse-plus  border border-transparent border-b-border2">
            <input type="radio" name="my-accordion-3" defaultChecked />
            <div className="collapse-title font-semibold">{t("faq.faq1")}</div>
            <div className="collapse-content text-sm">
              {t("faq.faq1Content")}
            </div>
          </div>
          <div className="collapse collapse-plus  border border-transparent border-b-border2">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title font-semibold">{t("faq.faq2")}</div>
            <div className="collapse-content text-sm">
              {t("faq.faq2Content")}
            </div>
          </div>
          <div className="collapse collapse-plus  border border-transparent border-b-border2">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title font-semibold">{t("faq.faq3")}</div>
            <div className="collapse-content text-sm">
              {t("faq.faq3Content")}
            </div>
          </div>
          <div className="collapse collapse-plus  border border-transparent border-b-border2">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title font-semibold">{t("faq.faq4")}</div>
            <div className="collapse-content text-sm">
              {t("faq.faq4Content")}
            </div>
          </div>
          <div className="collapse collapse-plus  border border-transparent border-b-border2">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title font-semibold">{t("faq.faq5")}</div>
            <div className="collapse-content text-sm whitespace-pre-line">
              {t("faq.faq5Content")}
            </div>
          </div>
        </div>
      </div>
    </ViewLayout>
  );
};

export default FAQView;
