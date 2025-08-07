"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "@/lib/z";
import { Icon } from "@/components/icon";
import { TextError } from "@/components/input/text-error";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { api } from "@/api";
import { useCallback, useEffect, useState } from "react";
import { Drawer } from "@/components/drawer";
import { encryptPassword, formatBalance } from "@/lib/utils";
import BaseImage from "@/components/base-image";
import { useAssetStore } from "@/store/useAssetStore";
import axios from "axios";
import CoinList from "./coin-list";
import { useRequestMutation } from "@/hooks/useRequestMutation";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/skeleton";

type FormData = {
  formCoinValue: string;
  toCoinValue: string;
};

const AssetsExchangeView = () => {
  const t = useTrans();
  const { getBalanceList, balanceList } = useAssetStore();

  const [formCoinList, setFormCoinList] = useState<CurrencyInfo[]>([]);
  const [toCoinList, setToCoinList] = useState<CurrencyInfo[]>([]);

  const [formDrawerOpen, setFormDrawerOpen] = useState(false);
  const [toDrawerOpen, setToDrawerOpen] = useState(false);

  const [formCoinItem, setFormCoinItem] = useState<CurrencyInfo>();
  const [toCoinItem, setToCoinItem] = useState<CurrencyInfo>();

  const [price, setPrice] = useState("");

  const { data, isLoading } = useRequestQuery(
    api.currencySettings.protocolListUsingGet,
    {}
  );
  const currencyList = data?.data as CurrencyInfo[];

  const { trigger, isMutating } = useRequestMutation(
    api.member.flashExchangeUsingPost
  );

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
    formCoinValue: z.string(),
    toCoinValue: z.string(),
  });

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (!formCoinItem?.currencyCode || !toCoinItem?.currencyCode) return;
    if (formCoinItem?.currencyCode !== "USDT") return setPrice("1");

    axios(
      `https://www.okx.com/api/v5/market/index-tickers?instId=${toCoinItem?.currencyCode}-USDT`
    ).then((res) => {
      const price = res?.data?.data?.[0]?.idxPx || 0;
      setPrice(formatBalance(1 / price, toCoinItem.decimalPlaces || 2));
    });
  }, [formCoinItem, toCoinItem]);

  useEffect(() => {
    setValue(
      "toCoinValue",
      (Number(getValues().formCoinValue) * Number(price)).toString()
    );
  }, [setValue, getValues, price, toCoinItem]);

  return (
    <ViewLayout
      header={
        <HeaderWithBack
          title={
            <div className="flex items-center justify-center w-full relative">
              <span>{t("闪兑")}</span>
              <Icon name="history" className="size-11 absolute right-[-30px]" />
            </div>
          }
          algin="center"
        />
      }
    >
      <div className="p-content">
        <form className="grow" autoComplete="off">
          <fieldset className="fieldset p-0">
            <label className="input w-full border-none !shadow-none h-[92px] !bg-bg2 rounded-lg px-6">
              <Skeleton isLoading={isLoading}>
                <span
                  className="text-xs flex items-center gap-1"
                  onClick={() => setFormDrawerOpen(true)}
                >
                  {formCoinItem?.id ? (
                    <>
                      <BaseImage
                        src={formCoinItem?.logo || "/"}
                        className="w-8 h-8 rounded-full overflow-hidden mr-2"
                      />
                      <span className="text-base">
                        {formCoinItem.currencyCode}
                      </span>
                    </>
                  ) : (
                    t("withdraw.selectCoin")
                  )}
                  <Icon
                    name="right-enter"
                    className="rotate-90 w-1.5 h-2.5 ml-2"
                  />
                </span>
              </Skeleton>

              <input
                type="number"
                {...register("formCoinValue")}
                className="grow text-xl font-normal text-right placeholder:text-text1"
                placeholder="0"
                onChange={(e) => {
                  if (!formCoinItem?.id || !toCoinItem?.id) return;
                  setValue(
                    "toCoinValue",
                    (Number(e.target.value) * Number(price)).toString()
                  );
                }}
              />
              <div className="text-xs text-text4 absolute bottom-4 right-6">
                {t("余额")}：
                {balance(
                  formCoinItem?.currencyCode,
                  formCoinItem?.decimalPlaces || 2
                )}
              </div>
            </label>

            <TextError>{errors?.formCoinValue?.message}</TextError>
          </fieldset>

          <fieldset className="fieldset">
            <label className="input w-full border-none !shadow-none h-[92px] !bg-bg2 rounded-lg px-6">
              <Skeleton isLoading={isLoading}>
                <span
                  className="text-xs flex items-center gap-1"
                  onClick={() => setToDrawerOpen(true)}
                >
                  {toCoinItem?.id ? (
                    <>
                      <BaseImage
                        src={toCoinItem?.logo || "/"}
                        className="w-8 h-8 rounded-full overflow-hidden mr-2"
                      />
                      <span className="text-base">
                        {toCoinItem.currencyCode}
                      </span>
                    </>
                  ) : (
                    t("withdraw.selectCoin")
                  )}
                  <Icon
                    name="right-enter"
                    className="rotate-90 w-1.5 h-2.5 ml-2"
                  />
                </span>
              </Skeleton>
              <input
                type="text"
                {...register("toCoinValue")}
                className="grow text-xl font-normal text-right placeholder:text-text1"
                placeholder="0"
                readOnly
              />
              <div className="text-xs text-text4 absolute bottom-4 right-6">
                {t("余额")}：{" "}
                {balance(
                  toCoinItem?.currencyCode,
                  toCoinItem?.decimalPlaces || 2
                )}
              </div>
            </label>
          </fieldset>

          <div className="flex items-center justify-between text-xs text-text4 my-6">
            <span>{t("兑换价格")}</span>
            {formCoinItem?.currencyCode && toCoinItem?.currencyCode ? (
              <span>
                1 {formCoinItem?.currencyCode} ≈ {price}{" "}
                {toCoinItem?.currencyCode}
              </span>
            ) : (
              "--"
            )}
          </div>
        </form>
        <button
          disabled={isMutating}
          type="submit"
          className="btn btn-primary w-full mt-4"
          onClick={handleSubmit((e) => {
            if (!e.formCoinValue) return toast.error(t("deposit.selectCoin"));
            if (!price) return toast.error(t("未获取到币价"));

            trigger(
              {
                fromCoin: formCoinItem?.currencyCode,
                toCoin: toCoinItem?.currencyCode,
                amount: Number(e.formCoinValue),
                rate: encryptPassword(e.toCoinValue),
              },

              {
                onSuccess: () => {
                  toast.success(t("操作成功"));
                  getBalanceList();
                  setValue("formCoinValue", "");
                  setValue("toCoinValue", "");
                },
              }
            );
          })}
        >
          {isMutating ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            t("verify.confirm")
          )}
        </button>
        <Drawer
          open={formDrawerOpen}
          title={t("address.selectToken")}
          onChange={setFormDrawerOpen}
          className="h-auto"
        >
          <CoinList
            list={formCoinList}
            checkValue={formCoinItem?.id}
            onClick={(item) => {
              setFormCoinItem(item);
              setFormDrawerOpen(false);
              setToCoinItem(undefined);
              setValue("formCoinValue", "");
            }}
          />
        </Drawer>
        <Drawer
          open={toDrawerOpen}
          title={t("address.selectToken")}
          onChange={setToDrawerOpen}
          className="h-auto"
        >
          <CoinList
            list={toCoinList}
            checkValue={toCoinItem?.id}
            onClick={(item) => {
              setToCoinItem(item);
              setToDrawerOpen(false);
              setPrice("");
            }}
          />
        </Drawer>
      </div>
    </ViewLayout>
  );
};
export default AssetsExchangeView;
