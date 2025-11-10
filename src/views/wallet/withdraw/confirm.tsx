"use client";

import { api } from "@/api";
import BaseImage from "@/components/base-image";
import CopyText from "@/components/copy-text";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useFormatBalance } from "@/hooks/useFormatBalance";
import { useRequestMutation } from "@/hooks/useRequestMutation";
import { useTrans } from "@/hooks/useTrans";
import { routerMap, useRouter } from "@/i18n/navigation";
import { useSettingStore } from "@/store/useSettingStore";
import { useWithdrawalStore } from "@/store/useWithdrawal";
import { ReactNode, useCallback } from "react";
import toast from "react-hot-toast";

type ChainEnum = {
  protocolType: string;
  minWithdrawal: number;
  maxWithdrawal: number;
  withdrawalFeeType: string;
  withdrawalFeeConfig: number;
  logo: string;
};

const WithdrawConfirmView = () => {
  const t = useTrans();
  const { push } = useRouter();
  const { formState, resetFormState } = useWithdrawalStore();
  const { googleCode, clearGoogleCode, platformInfo } = useSettingStore();
  const { clearAddressInfo } = useSettingStore();

  const { formatBalance } = useFormatBalance();

  const { trigger } = useRequestMutation(api.wallet.withdrawUsingPost);

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
    clearGoogleCode();
    resetFormState();
    clearAddressInfo();
  }, [clearGoogleCode, resetFormState, clearAddressInfo]);

  const confirm = useCallback(() => {
    const _data = {
      address: formState.withdrawAddress,
      amount: Number(formState.withdrawAmount),
      coinCode: formState.currencyCode,
      protocol: formState.chainEnum.protocolType,
      code: Number(googleCode),
      tag: platformInfo.withdrawTag,
    } as unknown as Parameters<typeof trigger>[0];

    if (formState.XRPTag) {
      _data.memo = formState.XRPTag;
    }
    trigger(_data)
      .then(() => {
        clear();
        toast.success(t("withdraw.withdrawSuccess"));
        push(routerMap.assets);
      })
      .catch(() => {
        clearGoogleCode();
      });
  }, [
    googleCode,
    formState,
    trigger,
    clearGoogleCode,
    t,
    clear,
    push,
    platformInfo,
  ]);

  return (
    <ViewLayout
      header={<HeaderWithBack title={t("confirmInfo")} algin="center" />}
    >
      <div className="p-content">
        <h5 className="text-sm text-text4 mt-2">{t("withdrawalCurrency")}</h5>
        <BaseImage
          className="size-10 rounded-full overflow-hidden my-4"
          src={(formState?.chainEnum as ChainEnum).logo}
        />
        <div className="font-bold text-2xl mb-10">
          {formatBalance(formState.withdrawAmount, formState.currencyCode)}{" "}
          {formState.currencyCode}
        </div>
        {fieldEl("Network", formState.chainEnum.protocolType)}
        {fieldEl(
          "Address",
          <div className="flex items-center gap-2">
            <span>{formState.withdrawAddress}</span>
            <CopyText text={formState.withdrawAddress} />
          </div>,
        )}
        {fieldEl(
          "Service Fee",
          formState.chainEnum.withdrawalFeeConfig + " USDT",
        )}
        <button className="btn btn-primary w-full mt-10" onClick={confirm}>
          {t("confirmSubmit")}
        </button>
      </div>
    </ViewLayout>
  );
};

export default WithdrawConfirmView;
