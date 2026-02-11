"use client";
import { api } from "@/api";
import { HeaderWithBack } from "@/components/header-with-back";
import { Icon } from "@/components/icon";
import { TextError } from "@/components/input/text-error";
import ViewLayout from "@/components/layout";
import { ConfirmModal } from "@/components/modal/confirm-modal";
import { NumberWithUnit } from "@/components/number-with-unit";
import SecurityVerification from "@/components/security-verify";
import { SelectChain } from "@/components/select/select-chain";
import { SelectToken } from "@/components/select/select-token";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { useTrans } from "@/hooks/useTrans";
import { routerMap, useRouter } from "@/i18n/navigation";
import { formatBalance1 } from "@/lib/utils";
import { useSettingStore } from "@/store/useSettingStore";
import { defaultFormState, useWithdrawalStore } from "@/store/useWithdrawal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import useSchema from "./useSchema";

const WithdrawView = () => {
  const { push } = useRouter();
  const t = useTrans();

  const setField = useWithdrawalStore((s) => s.setField);
  const formState = useWithdrawalStore((s) => s.formState);
  const resetFormState = useWithdrawalStore((s) => s.resetFormState);
  const getAddrMap = useWithdrawalStore((s) => s.getAddrMap);
  const addressMap = useWithdrawalStore((s) => s.addressMap);

  const setSettingField = useSettingStore((s) => s.setField);
  const clearGoogleCode = useSettingStore((s) => s.clearGoogleCode);
  const clearAddressInfo = useSettingStore((s) => s.clearAddressInfo);
  const getPlatformInfo = useSettingStore((s) => s.getPlatformInfo);
  const platformInfo = useSettingStore((s) => s.platformInfo);
  const addressPreviousPageType = useSettingStore(
    (s) => s.addressPreviousPageType,
  );
  const addressInfo = useSettingStore((s) => s.addressInfo);

  const [openModal, setOpenModal] = useState(false);
  const [verifyOpen, setVerifyOpen] = useState(false);
  // const [isSubmit, setIsSubmit] = useState(false);

  const Schema = useSchema();

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
  const chainEnum = useWatch({ control, name: "chainEnum" });

  useEffect(() => {
    getPlatformInfo();
  }, [getPlatformInfo]);

  useEffect(() => {
    // 获取地址列表
    getAddrMap();
  }, [getAddrMap]);

  useEffect(() => {
    setValue("withdrawAddress", "");
  }, [chainEnum?.protocolType]);

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

  const handleNext = () => {
    setField("formState", getValues());
    setSettingField("gaPreviousPageType", "withdraw");
    setVerifyOpen(true);
  };

  // INFO: 如果是有谷歌验证码就提示弹窗
  // useEffect(() => {
  //   if (gaPreviousPageType === "withdraw" && googleCode && formState) {
  //     // push(routerMap.walletWithdrawConfirm);
  //   }
  // }, [googleCode, formState, gaPreviousPageType, push]);
  // INFO: 如果是有地址
  useEffect(() => {
    if (addressPreviousPageType === "withdraw" && addressInfo) {
      setValue("withdrawAddress", addressInfo?.addr || "");
    }
  }, [addressPreviousPageType, addressInfo, setValue, clearAddressInfo]);

  const clear = useCallback(() => {
    clearGoogleCode();
    resetFormState();
    clearAddressInfo();
    reset(defaultFormState);
  }, [clearGoogleCode, resetFormState, clearAddressInfo, reset]);

  const handleModalColse = useCallback(() => {
    setOpenModal(false);
    clear();
  }, [clear]);

  // 获取标识 withdrawTag 【0=可输入地址，1=不能输入】
  const isInputAddressDisabled = useMemo(() => {
    return platformInfo.withdrawTag === 1;
  }, [platformInfo]);

  return (
    <ViewLayout
      header={
        <HeaderWithBack
          title={
            <div className="flex items-center justify-center w-full relative">
              <span>{t("withdraw.title")}</span>
              {/* <Icon name="history" className="size-11 absolute right-[-30px]" /> */}
            </div>
          }
          algin="center"
          onChange={clear}
        />
      }
      heightFull
    >
      <div className="p-content h-full flex flex-col">
        <form className="grow" autoComplete="off">
          <fieldset className="fieldset p-0">
            <legend className="fieldset-legend text-sm text-text2 font-normal pb-4">
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

          {getValues("currencyCode").toUpperCase() === "XRP" ? (
            <fieldset className="fieldset p-0">
              <legend className="fieldset-legend text-sm text-text2 font-normal pt-6 pb-4">
                XRP Tag
              </legend>
              <label className="input w-full h-12">
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

          <fieldset className="fieldset p-0">
            <legend className="fieldset-legend text-sm text-text2 font-normal pt-6 pb-4">
              {t("withdraw.network")}
            </legend>
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

          <fieldset className="fieldset p-0">
            <legend className="fieldset-legend text-sm text-text2 font-normal pt-6 pb-4">
              {t("withdraw.address")}
            </legend>
            <div className="join items-center gap-4.5">
              <label className="input w-full flex items-center h-12 rounded-lg pr-0 !bg-bg1">
                <input
                  type="text"
                  {...register("withdrawAddress")}
                  disabled={isInputAddressDisabled}
                  placeholder={
                    isInputAddressDisabled
                      ? t("withdrawalBindTip")
                      : t("enter_receiving_address")
                  }
                  onChange={(e) => {
                    setValue("withdrawAddress", e.target.value);
                    setField("formState", {
                      ...formState,
                      withdrawAddress: e.target.value,
                    });
                  }}
                  className="w-9/10"
                />
                <div className="inline-flex items-center h-12">
                  {/* <Icon name="scan" className="size-11" /> */}
                </div>
              </label>
              <Icon
                name="address-book"
                className="size-5"
                color="var(--color-text1)"
                onClick={() => {
                  setSettingField("addressPreviousPageType", "withdraw");
                  setField("formState", getValues());
                  setSettingField(
                    "withdrawNetwork",
                    getValues("chainEnum").protocolType,
                  );
                  const _withdrawAddress = addressMap
                    ? addressMap[chainEnum?.protocolType]?.addr
                    : "";
                  if (_withdrawAddress) {
                    push(routerMap.settingAddress);
                  } else {
                    push(routerMap.settingAddressAdd);
                  }
                }}
              />
            </div>
            <TextError>{errors.withdrawAddress?.message}</TextError>
          </fieldset>

          <fieldset className="fieldset p-0">
            <legend className="fieldset-legend text-sm font-normal pt-6 pb-4">
              {t("withdraw.amount")}
            </legend>
            <Controller
              name="withdrawAmount"
              control={control}
              render={({ field }) => (
                <label className="input w-full h-12 !bg-bg1">
                  <input
                    type="number"
                    placeholder={t("withdraw.amount")}
                    className="grow"
                    {...register("withdrawAmount")}
                    {...field}
                    onChange={(e) => {
                      const val = e.target.value;
                      // 允许输入整数或最多两位小数
                      if (!/^\d*(\.\d{0,8})?$/.test(val)) {
                        return;
                      }
                      setValue("withdrawAmount", val);
                    }}
                  />
                  <span>{getValues("currencyCode")}</span>
                </label>
              )}
            />
            <p className="text-text4 text-xs">
              {t("余额")}：{formatBalance1(currencyAccount?.balance || 0, 8)}{" "}
              {getValues("currencyCode")}
            </p>
            <TextError>{errors.withdrawAmount?.message}</TextError>
          </fieldset>
          {/* <fieldset className="fieldset h-10 rounded-md bg-bg1 flex items-center px-3 mt-4">
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
                setValue("withdrawAmount", String(currencyAccount?.balance));
              }}
            >
              {t("withdraw.useAll")}
            </button>
          </fieldset> */}

          <fieldset className="fieldset h-12 rounded-lg bg-bg1 flex items-center p-4 mt-6 text-sm text-text4 justify-between font-normal">
            <span>{t("withdraw.fee")}</span>
            <NumberWithUnit value={withdrawalFeeConfig} unit={feeUnit} />
          </fieldset>
        </form>
        <button
          className="btn btn-primary w-full"
          onClick={handleSubmit(() => {
            handleNext();
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
                amount: getValues("withdrawAmount"),
                currency: getValues("currencyCode") as string,
                address: getValues("withdrawAddress") as string,
              })}
            </p>
          }
          onConfirm={confirm}
        ></ConfirmModal>
      </div>
      <SecurityVerification
        open={verifyOpen}
        onClose={() => setVerifyOpen(false)}
        onClick={(e) => {
          setSettingField("googleCode", e);
          push(routerMap.walletWithdrawConfirm);
        }}
      />
    </ViewLayout>
  );
};

export default WithdrawView;
