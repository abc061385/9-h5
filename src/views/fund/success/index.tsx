"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import { Icon } from "@/components/icon";
import ViewLayout from "@/components/layout";
import { useFormatBalance } from "@/hooks/useFormatBalance";
import { useTrans } from "@/hooks/useTrans";
import { routerMap, useRouter } from "@/i18n/navigation";
import { useFundStore } from "@/store/useFundStore";

const FundSuccessView = () => {
  const t = useTrans();
  const { buyData, setField } = useFundStore();
  const { formatBalance } = useFormatBalance();
  const { push } = useRouter();

  return (
    <ViewLayout header={<HeaderWithBack title={t("results")} algin="center" />}>
      <div className="p-content flex flex-col items-center">
        <Icon name="right-result" className="w-16 h-16 mt-16" />
        <p className="text-text4 mt-6 mb-2">{t("购买总额")}</p>
        <b className="text-2xl">
          {formatBalance(buyData?.totalAmount || "", "USDT")} USDT
        </b>
        <button
          className="btn btn-neutral w-50 mt-12 mb-2"
          onClick={() => {
            setField("buyData", undefined);
            push(routerMap.fundRecord);
          }}
        >
          {t("viewFundDetails")}
        </button>
        <button
          className="btn btn-outline w-50"
          onClick={() => {
            push(routerMap.fund);
            setField("buyData", undefined);
          }}
        >
          {t("return")}
        </button>
      </div>
    </ViewLayout>
  );
};
export default FundSuccessView;
