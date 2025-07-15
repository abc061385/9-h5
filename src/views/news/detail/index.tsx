"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import { useTrans } from "@/hooks/useTrans";

const NewsDetailView = () => {
  const t = useTrans();
  return (
    <>
      <HeaderWithBack title={t("详情")} algin="center" />
      <div className="p-content">
        <h2 className="font-bold">9M AI关于新一轮节点政策的公告</h2>
        <div>2025-05-27 13:20:28</div>
        <div className="border-b border-dashed h-2 border-[#9D95B5]"></div>
      </div>
    </>
  );
};
export default NewsDetailView;
