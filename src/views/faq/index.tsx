"use client";

import { api } from "@/api";
import ViewLayout from "@/components/layout";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { langType } from "../news";
import { useLocale } from "next-intl";
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
  const locale = useLocale();
  const t = useTrans();
  const { push } = useRouter();

  const { data, isLoading } = useRequestQuery(api.cms.getByTypeUsingGet, {
    type: 5,
  });

  const content = useMemo(() => {
    const detail = data?.data || {};
    return detail?.["content" + (langType[locale] || "En")] || "";
  }, [data?.data, locale]);
  return (
    <ViewLayout
      header={
        <div className="p-content">
          <BaseImage
            src="/images/common/logo.svg"
            className="h-[31px] w-[91px] cursor-pointer"
            onClick={() => push(routerMap.home)}
          />
        </div>
      }
    >
      <div className="p-content">
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
            MSB License
          </button>
          <button
            className="btn bg-black text-white flex-1 h-[48px]"
            onClick={() => push(routerMap.faq_sec)}
          >
            SEC License
          </button>
        </div>
        <div className="text-2xl font-bold text-center mb-8 mt-16">
          9M AI Resource Library
        </div>

        <div className="flex flex-wrap gap-2">
          <div
            className="bg-black  size-[168px] rounded-lg [background:var(--color-gradient3)] flex justify-center items-center flex-col"
            onClick={() => push(routerMap.faq_posters)}
          >
            <BaseImage
              src="/images/faq/Promotional Posters@2x.png"
              className="size-[40px]"
            />
            <p className="max-w-[80%] text-wrap text-center mt-6">
              Promotional Posters
            </p>
          </div>
          <div
            className="bg-black  size-[168px] rounded-lg [background:var(--color-gradient3)] flex justify-center items-center flex-col"
            onClick={() => push(routerMap.faq_doc)}
          >
            <BaseImage
              src="/images/faq/9M AI Documentation@2x.png"
              className="size-[40px]"
            />
            <p className="max-w-[80%] text-wrap text-center mt-6">
              9M AI Documentation
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
            <p className="mt-6">Promotional Videos</p>
          </div>
        </div>

        <div>
          <button className="btn btn-block bg-primary text-white flex-1 h-[48px] mt-8 ">
            9M AI App Download
          </button>
          <button className="btn btn-block bg-[#A93AFF] text-white flex-1 h-[48px] mt-2">
            9M AI Website
          </button>
        </div>
        <div className="text-2xl font-bold mt-12">FAQ</div>
        <div>
          <div className="collapse collapse-plus bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-3" defaultChecked />
            <div className="collapse-title font-semibold">
              How do I create an account?
            </div>
            <div className="collapse-content text-sm">
              Click the "Sign Up" button in the top right corner and follow the
              registration process.
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title font-semibold">
              I forgot my password. What should I do?
            </div>
            <div className="collapse-content text-sm">
              Click on "Forgot Password" on the login page and follow the
              instructions sent to your email.
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title font-semibold">
              How do I update my profile information?
            </div>
            <div className="collapse-content text-sm">
              Go to "My Account" settings and select "Edit Profile" to make
              changes.
            </div>
          </div>
        </div>
      </div>
    </ViewLayout>
  );
};

export default FAQView;
