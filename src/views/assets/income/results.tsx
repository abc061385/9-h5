"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import { Icon } from "@/components/icon";
import ViewLayout from "@/components/layout";
import { routerMap, useRouter } from "@/i18n/navigation";
import { useAssetStore } from "@/store/useAssetStore";

const AssetsIncomeResultsView = () => {
  const { push, back } = useRouter();
  const { incomeWithdrawAmount } = useAssetStore();
  return (
    <ViewLayout header={<HeaderWithBack title="Results" algin="center" />}>
      <div className="p-content flex flex-col items-center pt-16">
        <Icon name="right-result" className="size-16" />
        <h5 className="mt-6 mb-2 text-text4">Withdraw Complete</h5>
        <div className="text-2xl font-bold mb-6">{incomeWithdrawAmount}</div>
        <p className="text-sm text-center">
          The profits you withdraw will be deposited into your account.
        </p>
        <button
          className="btn btn-neutral w-50 mt-12 mb-2"
          onClick={() => push(routerMap.assets)}
        >
          View Account
        </button>
        <button className="btn btn-outline w-50" onClick={() => back()}>
          Return
        </button>
      </div>
    </ViewLayout>
  );
};
export default AssetsIncomeResultsView;
