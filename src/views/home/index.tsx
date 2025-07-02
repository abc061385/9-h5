import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function HomeView() {
  const t = useTranslations();
  return (
    <div className="flex">
      <div
        className={cn([
          "w-[1217px] bg-blue-800 text-white mx-auto mt-4",
          "h5:w-[200px]",
        ])}
      >
        123
      </div>
      Home
      <h1>{t("test")}</h1>
      <button className="text-[20px]">点击我</button>
    </div>
  );
}
