"use client";
import { api } from "@/api";
import { NumberWithUnit } from "@/components/number-with-unit";
import { HeaderWithBack } from "@/components/header-with-back";
import { Icon } from "@/components/icon";
import { TextError } from "@/components/input/text-error";
import ViewLayout from "@/components/layout";
import { SelectChain } from "@/components/select/select-chain";
import { SelectToken } from "@/components/select/select-token";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { useTrans } from "@/hooks/useTrans";
import { routerMap, useRouter } from "@/i18n/navigation";
import z from "@/lib/z";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useRequestMutation } from "@/hooks/useRequestMutation";
import { useWithdrawalStore } from "@/store/useWithdrawal";
import { useSettingStore } from "@/store/useSettingStore";
import { ConfirmModal } from "@/components/modal/confirm-modal";

const chainEnum = z.object({
  protocolType: z.string(),
  minWithdrawal: z.number(),
  maxWithdrawal: z.number(),
  withdrawalFeeType: z.string(),
  withdrawalFeeConfig: z.number(),
});

const WithdrawView = () => {
  const { push } = useRouter();
  const t = useTrans();

  const setField = useWithdrawalStore((s) => s.setField);
  const formState = useWithdrawalStore((s) => s.formState);
  const resetFormState = useWithdrawalStore((s) => s.resetFormState);

  const setSettingField = useSettingStore((s) => s.setField);
  const googleCode = useSettingStore((s) => s.googleCode);
  const clearGoogleCode = useSettingStore((s) => s.clearGoogleCode);
  const clearAddressInfo = useSettingStore((s) => s.clearAddressInfo);
  const gaPreviousPageType = useSettingStore((s) => s.gaPreviousPageType);
  const addressPreviousPageType = useSettingStore(
    (s) => s.addressPreviousPageType,
  );
  const addressInfo = useSettingStore((s) => s.addressInfo);

  const [openModal, setOpenModal] = useState(false);
  const { trigger } = useRequestMutation(api.wallet.withdrawUsingPost);
  const Schema = z
    .object({
      currencyCode: z.string().nonempty(),
      chainEnum: chainEnum,
      XRPTag: z.string(),
      withdrawAddress: z.string().nonempty({ message: "请输入地址" }),
      withdrawAmount: z.coerce.number(),
    })
    .check((ctx) => {
      const data = ctx.value;
      if (data.withdrawAmount < (data.chainEnum.minWithdrawal as number)) {
        ctx.issues.push({
          code: "custom",
          message: t("withdraw.minAmountTip", {
            min: (data.chainEnum.minWithdrawal as number) + data.currencyCode,
          }),
          path: ["withdrawAmount"],
          input: ctx.value,
        });
      }

      if (data.currencyCode.toUpperCase() === "XRP" && !data.XRPTag) {
        ctx.issues.push({
          code: "custom",
          message: t("XRP Tag Withdraw"),
          path: ["XRPTag"],
          input: ctx.value,
        });
      }
    });
  const {
    control,
    setValue,
    register,
    getValues,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: formState,
    resolver: zodResolver(Schema),
  });
  const currencyCode = useWatch({ control, name: "currencyCode" });
  const [withdrawalFeeConfig, withdrawalFeeType] = useWatch({
    control,
    name: ["chainEnum.withdrawalFeeConfig", "chainEnum.withdrawalFeeType"],
  });
  const { data: accountResponse } = useRequestQuery(
    api.wallet.listUsingPost,
    {},
  );
  const accountList: Account[] = accountResponse?.data?.wallet;
  const currencyAccount = useMemo(() => {
    if (!accountList?.length) {
      return {};
    }
    return accountList.find((item) => item.coin === currencyCode);
  }, [accountList, currencyCode]);

  const feeUnit =
    withdrawalFeeType === "fixed"
      ? currencyCode
      : withdrawalFeeType === "percentage"
        ? "%"
        : "";

  const submit = (data: z.infer<typeof Schema>) => {
    setField("formState", data);
    setSettingField("gaPreviousPageType", "withdraw");
    push({
      pathname: routerMap.settingGoogleVerify,
    });
  };

  // INFO: 如果是有谷歌验证码就提示弹窗
  useEffect(() => {
    if (gaPreviousPageType === "withdraw" && googleCode && formState) {
      setOpenModal(true);
    }
  }, [googleCode, formState, gaPreviousPageType]);
  // INFO: 如果是有地址
  useEffect(() => {
    if (addressPreviousPageType === "withdraw" && addressInfo) {
      setValue("withdrawAddress", addressInfo?.addr || "");
    }
  }, [addressPreviousPageType, addressInfo, setValue]);

  const confirm = useCallback(() => {
    trigger({
      address: formState.withdrawAddress,
      amount: formState.withdrawAmount,
      coinCode: formState.currencyCode,
      protocol: formState.chainEnum.protocolType,
      code: Number(googleCode),
      memo: formState.XRPTag,
    } as Parameters<typeof trigger>[0]);
  }, [googleCode, formState, trigger]);

  const clear = useCallback(() => {
    clearGoogleCode();
    resetFormState();
    clearAddressInfo();
    reset();
  }, [clearGoogleCode, resetFormState, clearAddressInfo, reset]);
  const handleModalColse = useCallback(() => {
    setOpenModal(false);
    clear();
  }, [clear]);

  return (
    <ViewLayout
      header={
        <HeaderWithBack
          title={t("withdraw.title")}
          algin="center"
          onChange={clear}
        />
      }
      heightFull
    >
      <div className="p-content h-full flex flex-col">
        <form className="grow" autoComplete="off">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              {t("withdraw.coinType")}
            </legend>
            <Controller
              name="currencyCode"
              control={control}
              render={({ field }) => (
                <SelectToken
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setValue("chainEnum", {
                      protocolType: "",
                      minWithdrawal: 0,
                      maxWithdrawal: 0,
                      withdrawalFeeType: "",
                      withdrawalFeeConfig: 0,
                    });
                  }}
                />
              )}
            ></Controller>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">{t("withdraw.network")}</legend>
            <Controller
              name="chainEnum"
              control={control}
              render={({ field }) => (
                <SelectChain
                  {...field}
                  currencyCode={currencyCode}
                  value={field.value?.protocolType as string}
                />
              )}
            ></Controller>
            <TextError>{errors.chainEnum?.message}</TextError>
          </fieldset>
          {getValues("currencyCode").toUpperCase() === "XRP" ? (
            <fieldset className="fieldset">
              <legend className="fieldset-legend">XRP Tag</legend>
              <label className="input w-full">
                <input
                  type="text"
                  {...register("XRPTag")}
                  placeholder={t("输入 XRP Tag")}
                  className="grow"
                />
              </label>
              <TextError>{errors.XRPTag?.message}</TextError>
            </fieldset>
          ) : null}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">{t("withdraw.address")}</legend>
            <label className="input w-full flex">
              <input
                type="text"
                {...register("withdrawAddress")}
                placeholder={t("withdraw.longPressToPaste")}
                className="w-9/10"
              />
              <div
                className="grow text-center"
                onClick={() => {
                  setSettingField("addressPreviousPageType", "withdraw");
                  push(routerMap.settingAddress);
                }}
              >
                <Icon name="address" />
              </div>
            </label>
            <TextError>{errors.withdrawAddress?.message}</TextError>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">{t("withdraw.amount")}</legend>
            <label className="input w-full">
              <input
                type="number"
                placeholder={t("withdraw.amount")}
                className="grow"
                {...register("withdrawAmount")}
              />
              <span>{getValues("currencyCode")}</span>
            </label>
            <TextError>{errors.withdrawAmount?.message}</TextError>
          </fieldset>
          <fieldset className="fieldset h-10 rounded-md bg-bg1 flex items-center px-3 mt-4">
            <span className="grow text-sm font-bold">
              {t("withdraw.availableBalance")}
            </span>
            <NumberWithUnit
              value={currencyAccount?.balance || 0}
              unit={getValues("currencyCode")}
            />
            <button
              type="button"
              className="btn btn-link text-sm font-bold"
              onClick={() => {
                setValue("withdrawAmount", currencyAccount?.balance);
              }}
            >
              {t("withdraw.useAll")}
            </button>
          </fieldset>
          <fieldset className="fieldset h-10 rounded-md bg-bg1 flex items-center px-3 mt-4">
            <span className="grow text-sm font-bold">{t("withdraw.fee")}</span>
            <NumberWithUnit value={withdrawalFeeConfig} unit={feeUnit} />
          </fieldset>
        </form>
        <button
          className="btn btn-primary w-full"
          onClick={handleSubmit((data) => {
            submit(data);
          })}
        >
          {t("withdraw.confirm")}
        </button>
        <ConfirmModal
          open={openModal}
          title={t("withdraw.confirmWithdraw")}
          onClose={handleModalColse}
          tips={
            <p className="text-center">
              {t("withdraw.withdrawConfirmContent", {
                amount: getValues("withdrawAmount") as string,
                currency: getValues("currencyCode") as string,
                address: getValues("withdrawAddress") as string,
              })}
            </p>
          }
          onConfirm={confirm}
        ></ConfirmModal>
      </div>
    </ViewLayout>
  );
};

export default WithdrawView;
