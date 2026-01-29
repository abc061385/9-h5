"use client";

import { api } from "@/api";
import CopyText from "@/components/copy-text";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useFormatBalance } from "@/hooks/useFormatBalance";
import { useRequestMutation } from "@/hooks/useRequestMutation";
import { useTrans } from "@/hooks/useTrans";
import { routerMap, useRouter } from "@/i18n/navigation";
import { useSettingStore } from "@/store/useSettingStore";
import { useInternalTransferStore } from "@/store/useInternalTransfer";
import { ReactNode, useCallback } from "react";
import toast from "react-hot-toast";

// type ChainEnum = {
//   protocolType: string;
//   minWithdrawal: number;
//   maxWithdrawal: number;
//   withdrawalFeeType: string;
//   withdrawalFeeConfig: number;
//   logo: string;
// };

const WithdrawConfirmView = () => {
  const t = useTrans();
  const { push } = useRouter();
  const { formState, resetFormState } = useInternalTransferStore();
  // const { googleCode, clearGoogleCode } = useSettingStore();
  const { clearAddressInfo } = useSettingStore();

  const { formatBalance } = useFormatBalance();

  const { trigger, isMutating } = useRequestMutation(
    api.coinTransfer.transferUsingPost,
  );

  const fieldEl = useCallback(
    (label: string | ReactNode, value: string | ReactNode) => {
      return (
        <div className="text-sm text-text4 flex items-center justify-between mb-4">
          <div>{label}</div>
          <div>{value}</div>
        </div>
      );
    },
    [],
  );

  const clear = useCallback(() => {
    // clearGoogleCode();
    resetFormState();
    clearAddressInfo();
  }, [resetFormState, clearAddressInfo]);

  const confirm = useCallback(() => {
    const _data = {
      invitationCode: formState.withdrawAddress,
      amount: Number(formState.withdrawAmount),
      coin: formState.currencyCode,
      // code: Number(googleCode),
    } as unknown as Parameters<typeof trigger>[0];

    trigger(_data)
      .then(() => {
        clear();
        toast.success(t("withdraw.withdrawSuccess"));
        push(routerMap.assets);
      })
      .catch(() => {
        // clearGoogleCode();
      });
  }, [formState, trigger, clear, push, t]);

  return (
    <ViewLayout
      header={<HeaderWithBack title={t("confirmInfo")} algin="center" />}
    >
      <div className="p-content">
        <h5 className="text-sm text-text4 mt-2">{t("withdrawalCurrency")}</h5>
        <div className="font-bold text-2xl mb-10">
          {formatBalance(formState.withdrawAmount, formState.currencyCode)}{" "}
          {formState.currencyCode}
        </div>
        {fieldEl(
          t("invite.inviteCode"),
          <div className="flex items-center gap-2">
            <span>{formState.withdrawAddress}</span>
            <CopyText text={formState.withdrawAddress} />
          </div>,
        )}
        <button
          className="btn btn-primary w-full mt-10"
          onClick={confirm}
          disabled={isMutating}
        >
          {t("confirmSubmit")}
        </button>
      </div>
    </ViewLayout>
  );
};

export default WithdrawConfirmView;
