"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import { Icon } from "@/components/icon";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
import { routerMap, useRouter } from "@/i18n/navigation";
import Bridge from "@/lib/dsBridge";
import Platform from "@/lib/platfrom";
import { useAssetStore } from "@/store/useAssetStore";

const AssetsIncomeResultsView = () => {
  const t = useTrans();
  const { push, back } = useRouter();
  const { incomeWithdrawAmount, resultPageType } = useAssetStore();
  return (
    <ViewLayout header={<HeaderWithBack title={t("results")} algin="center" />}>
      <div className="p-content flex flex-col items-center pt-16">
        <Icon name="right-result" className="size-16" />
        <h5 className="mt-6 mb-2 text-text4">{t("withdrawComplete")}</h5>
        <div className="text-2xl font-bold mb-6">{incomeWithdrawAmount}</div>
        <p className="text-sm text-center">
          {resultPageType === "smart"
            ? t("withdrawNoticeSmartWallet")
            : t("withdrawNotice")}
        </p>
        <button
          className="btn btn-neutral w-50 mt-12 mb-2"
          onClick={() => {
            if (Platform.isInApp()) {
              Bridge.jumpTo("/assets");
            } else {
              push(routerMap.assets);
            }
          }}
        >
          {t("viewAccount")}
        </button>
        <button className="btn btn-outline w-50" onClick={() => back()}>
          {t("return")}
        </button>
      </div>
    </ViewLayout>
  );
};
export default AssetsIncomeResultsView;
