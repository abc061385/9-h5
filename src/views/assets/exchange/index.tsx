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
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { Drawer } from "@/components/drawer";
import { encryptPassword, formatBalance, utils } from "@/lib/utils";
import BaseImage from "@/components/base-image";
import { useAssetStore } from "@/store/useAssetStore";
import CoinList from "./coin-list";
import { useRequestMutation } from "@/hooks/useRequestMutation";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/skeleton";
import { ShowIf } from "@/components/show-if";

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
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { data, isLoading } = useRequestQuery(
    api.currencySettings.protocolListUsingGet,
    {},
  );
  const { data: priceListRes } = useRequestQuery(
    api.kline.marketSituationUsingGet,
    { type: "DAY" },
  );
  const lastPrice = useMemo(() => {
    const _list = priceListRes?.data?.situationVOS || [];
    if (!_list?.length) return 0;
    return _list?.slice(-1)[0]?.price || 0;
  }, [priceListRes]);
  const currencyList = data?.data as CurrencyInfo[];

  const { trigger, isMutating } = useRequestMutation(
    api.member.flashExchangeUsingPost,
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
    getBalanceList();
  }, [getBalanceList]);

  useEffect(() => {
    if (!currencyList?.length) return;
    const res = currencyList.filter((item) =>
      ["USDT", "USDC", "USDM", "9MC"].includes(
        item.currencyCode!.toUpperCase(),
      ),
    );

    // const firstSymbol = res[0]?.currencyCode;
    // setValue("formCoinValue", firstSymbol as string);
    setFormCoinList(res);
  }, [currencyList, setValue]);

  useEffect(() => {
    if (!currencyList?.length) return;
    if (!formCoinItem?.id) return;
    if (formCoinItem.currencyCode === "USDT") {
      setToCoinList(
        currencyList.filter(
          (item) =>
            !["USDT", "USDM", "9MC"].includes(item.currencyCode!.toUpperCase()),
        ),
      );
      return;
    }
    setToCoinList(
      currencyList.filter((item) =>
        ["USDT"].includes(item.currencyCode!.toUpperCase()),
      ),
    );
  }, [currencyList, formCoinItem]);

  const balance = useCallback(
    (coin: string | undefined, decimalPlaces: number) => {
      if (!balanceList?.length) return;
      return formatBalance(
        balanceList.find((v) => v.coin === coin)?.balance || "--",
        decimalPlaces,
      );
    },
    [balanceList],
  );

  useEffect(() => {
    if (!formCoinItem?.currencyCode || !toCoinItem?.currencyCode) return;
    // if (formCoinItem?.currencyCode === "USDM") return setPrice("1");

    // api.getTickerPrice(`${toCoinItem?.currencyCode}USDT`).then((res) => {
    //   const price = res.data?.length ? Number(res.data[0]?.price) || 1 : 1;
    //   setPrice(utils.toBigNumber(1).div(price).toString());
    // });
    const currentToken =
      formCoinItem?.currencyCode !== "USDT"
        ? formCoinItem?.currencyCode
        : toCoinItem.currencyCode;

    api.currencySettings
      .protocolExchangeUsingGet({
        instId: `${currentToken}-USDT`,
      })
      .then((res) => {
        const price = res.data?.idxPx || 1;

        if (formCoinItem?.currencyCode !== "USDT") {
          setPrice(price);
        } else {
          setPrice(utils.toBigNumber(1).div(price).toString());
        }
      });
  }, [formCoinItem, toCoinItem, lastPrice]);

  useEffect(() => {
    setValue(
      "toCoinValue",
      formatBalance(
        Number(getValues().formCoinValue) * Number(price),
        toCoinItem?.decimalPlaces || 4,
      ),
    );
  }, [setValue, getValues, price, toCoinItem, formCoinItem]);

  const fieldEl = useCallback(
    (label: string | ReactNode, value: string | ReactNode) => {
      return (
        <div className="text-sm text-text4 flex items-center justify-between mb-2">
          <div>{label}</div>
          <div>{value}</div>
        </div>
      );
    },
    [],
  );

  return (
    <ViewLayout
      header={
        <HeaderWithBack
          title={
            <div className="flex items-center justify-center w-full relative">
              <span>{t("闪兑")}</span>
              {/* <Icon name="history" className="size-11 absolute right-[-30px]" /> */}
            </div>
          }
          algin="center"
        />
      }
    >
      <div className="p-content">
        <form className="grow relative" autoComplete="off">
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
                    formatBalance(
                      Number(e.target.value) * Number(price),
                      toCoinItem.decimalPlaces || 4,
                    ).toString(),
                  );
                }}
              />
              <div className="text-xs text-text4 absolute bottom-4 right-6">
                {t("余额")}：
                {balance(
                  formCoinItem?.currencyCode,
                  formCoinItem?.decimalPlaces || 2,
                )}
              </div>
            </label>

            <TextError>{errors?.formCoinValue?.message}</TextError>
          </fieldset>

          <Icon
            name="exchange"
            className="w-10 h-10 absolute left-[50%] top-[50%] z-10 translate-[-50%]"
          />

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
                  toCoinItem?.decimalPlaces || 2,
                )}
              </div>
            </label>
          </fieldset>
        </form>
        <div className="flex items-center justify-between text-xs text-text4 my-6">
          <span>{t("兑换价格")}</span>
          {formCoinItem?.currencyCode && toCoinItem?.currencyCode ? (
            <span>
              1 {formCoinItem?.currencyCode} ≈{" "}
              {formatBalance(price, toCoinItem.decimalPlaces || 4)}{" "}
              {toCoinItem?.currencyCode}
            </span>
          ) : (
            "--"
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
          onClick={handleSubmit((e) => {
            if (!formCoinItem?.currencyCode || !toCoinItem?.currencyCode)
              return toast.error(t("deposit.selectCoin"));
            if (!e.formCoinValue) return toast.error(t("deposit.enterAmount"));
            if (!price) return toast.error(t("未获取到币价"));
            return setConfirmOpen(true);
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
          <CoinList
            list={formCoinList}
            checkValue={formCoinItem?.id}
            onCancel={() => setFormDrawerOpen(false)}
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
            onCancel={() => setFormDrawerOpen(false)}
            onClick={(item) => {
              setToCoinItem(item);
              setToDrawerOpen(false);
              setPrice("");
            }}
          />
        </Drawer>
        <Drawer
          open={confirmOpen}
          onChange={setConfirmOpen}
          title={t("exchangeConfirmation")}
          className="h-auto"
        >
          <ShowIf
            condition={!isMutating}
            elseEl={
              <div className="py-16 text-center">
                <Icon
                  className="size-12 animate-spin1 duration-50000"
                  name="confirm-loading"
                />
                <p className="text-sm text-text4 mt-6">{t("securityCheck")}</p>
              </div>
            }
          >
            <div className="flex items-center justify-between border-b border-border2 mb-6 pb-6">
              <div className="flex flex-col items-start gap-4">
                <BaseImage
                  src={formCoinItem?.logo || ""}
                  className="size-10 rounded-full overflow-hidden"
                />
                <b>
                  {formatBalance(
                    getValues().formCoinValue,
                    formCoinItem?.decimalPlaces || 4,
                  )}{" "}
                  {formCoinItem?.currencyCode}
                </b>
              </div>
              <Icon name="right-jt" className="size-4 relative top-[-20px]" />
              <div className="flex flex-col items-end gap-4">
                <BaseImage
                  src={toCoinItem?.logo || ""}
                  className="size-10 rounded-full overflow-hidden"
                />
                <b>
                  {getValues().toCoinValue} {toCoinItem?.currencyCode}
                </b>
              </div>
            </div>
            {fieldEl(
              t("channel"),
              `${formCoinItem?.currencyCode} → ${toCoinItem?.currencyCode}`,
            )}
            {fieldEl(
              t("兑换价格"),
              `1 ${formCoinItem?.currencyCode} ≈ ${formatBalance(
                price,
                toCoinItem?.decimalPlaces || 4,
              )}
              ${toCoinItem?.currencyCode}`,
            )}
            {fieldEl(t("expectedToReceive"), getValues().toCoinValue)}
            <div className="grid grid-flow-row-dense grid-cols-3 gap-2 mt-9">
              <button
                className="btn btn-outline"
                onClick={() => setConfirmOpen(false)}
              >
                {t("common.cancel")}
              </button>
              <button
                className="btn btn-primary col-span-2"
                onClick={() => {
                  trigger(
                    {
                      fromCoin: formCoinItem?.currencyCode,
                      toCoin: toCoinItem?.currencyCode,
                      amount: Number(getValues().formCoinValue),
                      rate: encryptPassword(getValues().toCoinValue),
                    },

                    {
                      onSuccess: () => {
                        toast.success(t("操作成功"));
                        getBalanceList();
                        setValue("formCoinValue", "");
                        setValue("toCoinValue", "");
                        setConfirmOpen(false);
                      },
                    },
                  );
                }}
              >
                {t("common.confirm")}
              </button>
            </div>
          </ShowIf>
        </Drawer>
      </div>
    </ViewLayout>
  );
};
export default AssetsExchangeView;
