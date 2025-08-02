"use client";
import ViewLayout from "@/components/layout";
import { routerMap, useRouter } from "@/i18n/navigation";
import { useUserStore } from "@/store/useUserStore";
import { useTranslations } from "next-intl";

export default function IndexView() {
  const t = useTranslations();
  const { token } = useUserStore();
  const { push } = useRouter();

  return (
    <ViewLayout heightFull>
      <div
        className="p-content h-full flex flex-col pb-15"
        style={{
          background: "url(/images/star-bg.png)",
          backgroundSize: "100% 100%",
        }}
      >
        <div className="flex-1"></div>
        <h2 className="text-[28px] font-bold text-white text-center leading-[32px]">
          {t("home.welcome")}
        </h2>
        <p className="font-medium leading-[20px] text-lg text-white mt-6 mb-14 text-center">
          {t("home.subtitle")}
        </p>
        <button
          className="btn btn-primary border-none shadow-none w-full"
          onClick={() => {
            if (!token) return push(routerMap.login);
            push(routerMap.home);
          }}
        >
          {t("home.startNow")}
        </button>
      </div>
    </ViewLayout>
  );
}
