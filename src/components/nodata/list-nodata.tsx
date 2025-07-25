import { useTrans } from "@/hooks/useTrans";
import BaseImage from "../base-image";

export const ListNoData = () => {
  const t = useTrans();
  return (
    <div className="text-center mt-10 flex flex-col">
      <BaseImage
        src="/images/common/no_data.png"
        className="w-[304px] h-[197px] mx-auto"
      />
      <span className="font-bold text-text2 text-sm">{t("暂无数据")}</span>
    </div>
  );
};
