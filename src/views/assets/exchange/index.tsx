"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z, { useRootReg } from "@/lib/z";
import { Icon } from "@/components/icon";
import { TextError } from "@/components/input/text-error";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { api } from "@/api";
import { useCallback, useEffect, useState } from "react";
import { Drawer } from "@/components/drawer";
import { cn, formatBalance } from "@/lib/utils";
import BaseImage from "@/components/base-image";
import { useAssetStore } from "@/store/useAssetStore";

type FormData = {
  code: string;
};

const AssetsExchangeView = () => {
  const t = useTrans();
  const reg = useRootReg();
  const { getBalanceList, balanceList } = useAssetStore();

  const [formCoinList, setFormCoinList] = useState<CurrencyInfo[]>([]);
  const [toCoinList, setToCoinList] = useState<CurrencyInfo[]>([]);

  const [formDrawerOpen, setFormDrawerOpen] = useState(false);
  const [toDrawerOpen, setToDrawerOpen] = useState(false);

  const [formCoinItem, setFormCoinItem] = useState<CurrencyInfo>();
  const [toCoinItem, setToCoinItem] = useState<CurrencyInfo>();

  const { data } = useRequestQuery(
    api.currencySettings.protocolListUsingGet,
    {}
  );
  const currencyList = data?.data as CurrencyInfo[];

  useEffect(() => {
    getBalanceList();
  }, [getBalanceList]);

  useEffect(() => {
    if (!currencyList?.length) return;
    const res = currencyList.filter((item) =>
      ["USDT", "USDM", "9MC"].includes(item.currencyCode!.toUpperCase())
    );
    setFormCoinList(res);
  }, [currencyList]);

  useEffect(() => {
    if (!currencyList?.length) return;
    if (!formCoinItem?.id) return;
    if (formCoinItem.currencyCode === "USDT") {
      setToCoinList(
        currencyList.filter(
          (item) =>
            !["USDT", "USDM", "9MC"].includes(item.currencyCode!.toUpperCase())
        )
      );
      return;
    }
    setToCoinList(
      currencyList.filter((item) =>
        ["USDT"].includes(item.currencyCode!.toUpperCase())
      )
    );
  }, [currencyList, formCoinItem]);

  const balance = useCallback(
    (coin: string | undefined, decimalPlaces: number) => {
      if (!balanceList?.length) return;
      return formatBalance(
        balanceList.find((v) => v.coin === coin)?.balance || "--",
        decimalPlaces
      );
    },
    [balanceList]
  );

  const Schema = z.object({
    code: reg.googleVerifyCode,
  });

  const {
    register,
    // getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  return (
    <ViewLayout
      header={<HeaderWithBack title={t("verify.title")} algin="center" />}
    >
      <div className="p-content">
        <form className="grow" autoComplete="off">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">{t("支付代币")}</legend>
            <label className="input w-full">
              <span
                className="text-xs flex items-center gap-1"
                onClick={() => setFormDrawerOpen(true)}
              >
                {formCoinItem?.id ? (
                  <>
                    <BaseImage
                      src={formCoinItem?.logo || "/"}
                      className="w-5 h-5 rounded-full overflow-hidden"
                    />
                    <span className="font-bold">
                      {formCoinItem.currencyCode}
                    </span>
                  </>
                ) : (
                  t("withdraw.selectCoin")
                )}
                <Icon name="arrow-line-down" />
              </span>
              <input
                type="code"
                {...register("code")}
                className="grow text-xs text-right"
              />
            </label>
            <TextError>{errors?.code?.message}</TextError>
          </fieldset>

          <div className="flex items-center justify-between text-xs font-medium">
            <span>
              {t("余额")}：
              {balance(
                formCoinItem?.currencyCode,
                formCoinItem?.decimalPlaces || 2
              )}
            </span>
            <button className="text-primary">{t("walletDetail.all")}</button>
          </div>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">{t("接收代币")}</legend>
            <label className="input w-full">
              <span
                className="text-xs flex items-center gap-1"
                onClick={() => setToDrawerOpen(true)}
              >
                {toCoinItem?.id ? (
                  <>
                    <BaseImage
                      src={toCoinItem?.logo || "/"}
                      className="w-5 h-5 rounded-full overflow-hidden"
                    />
                    <span className="font-bold">{toCoinItem.currencyCode}</span>
                  </>
                ) : (
                  t("withdraw.selectCoin")
                )}
                <Icon name="arrow-line-down" />
              </span>
              <input
                type="code"
                {...register("code")}
                className="grow text-xs text-right"
              />
            </label>
            <TextError>{errors?.code?.message}</TextError>
          </fieldset>

          <div className="text-xs font-bold">
            {t("余额")}：{" "}
            {balance(toCoinItem?.currencyCode, toCoinItem?.decimalPlaces || 2)}
          </div>

          <div className="bg-bg1 h-10 px-4 rounded-md flex items-center justify-between text-xs font-bold my-4">
            <span>{t("兑换价格")}</span>
            <span>1 USDM ≈ 1 USDT</span>
          </div>
        </form>
        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
          onClick={handleSubmit((e) => {
            console.log(e);
          })}
        >
          {t("verify.confirm")}
        </button>
        <Drawer
          open={formDrawerOpen}
          title={t("address.selectToken")}
          onChange={setFormDrawerOpen}
          className="h-auto"
        >
          <div className="px-2">
            {formCoinList?.map((item) => {
              return (
                <div
                  key={item.id}
                  className={cn(
                    "flex items-center justify-center gap-1 h-11 mb-4 font-bold rounded-md",
                    item.id === formCoinItem?.id ? "bg-primary text-white" : ""
                  )}
                  onClick={() => {
                    setFormCoinItem(item);
                    setFormDrawerOpen(false);
                  }}
                >
                  <BaseImage
                    src={item.logo || ""}
                    className="w-6 h-6 rounded-full overflow-hidden"
                  />
                  <span>{item.currencyCode}</span>
                </div>
              );
            })}
          </div>
        </Drawer>
        <Drawer
          open={toDrawerOpen}
          title={t("address.selectToken")}
          onChange={setToDrawerOpen}
          className="h-auto"
        >
          <div className="px-2 max-h-[40vh] overflow-auto">
            {toCoinList?.length ? (
              toCoinList.map((item) => {
                return (
                  <div
                    key={item.id}
                    className={cn(
                      "flex items-center justify-center gap-1 h-11 mb-4 font-bold rounded-md",
                      item.id === toCoinItem?.id ? "bg-primary text-white" : ""
                    )}
                    onClick={() => {
                      setToCoinItem(item);
                      setToDrawerOpen(false);
                    }}
                  >
                    <BaseImage
                      src={item.logo || ""}
                      className="w-6 h-6 rounded-full overflow-hidden"
                    />
                    <span>{item.currencyCode}</span>
                  </div>
                );
              })
            ) : (
              <h3 className="font-bold text-text2 text-sm text-center py-4">
                {t("暂无数据")}
              </h3>
            )}
          </div>
        </Drawer>
      </div>
    </ViewLayout>
  );
};
export default AssetsExchangeView;
