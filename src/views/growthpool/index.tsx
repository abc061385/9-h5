"use client";

import ReactDOMServer from "react-dom/server.browser";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
import Bridge from "@/lib/dsBridge";
import { useEffect, useMemo, useState } from "react";
import { Modal } from "@/components/modal";
import { Controller, useForm } from "react-hook-form";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { api } from "@/api";

import { zodResolver } from "@hookform/resolvers/zod";
import z from "@/lib/z";
import BaseImage from "@/components/base-image";
import { GrowthPoolBuyDTO } from "@/api/ApiClient";
import toast from "react-hot-toast";
import { utils } from "@/lib/utils";

type FormData = {
  coin: string;
  amount: string;
};

const GrowthPoolView = () => {
  const t = useTrans();
  const [open, setOpen] = useState(false);
  const { data: infoRes, mutate: infoMutate } = useRequestQuery(
    api.growth.getGrowthPoolInfoUsingGet,
    {},
  );
  const [loading, setLoading] = useState(false);
  const { data: listData, mutate } = useRequestQuery(
    api.growth.getGrowthPoolTransactionsUsingGet,
    {
      pageNo: 1,
      pageSize: 5000,
    },
  );
  const info = useMemo(() => {
    const _info = {
      USDT: 0,
    } as { [key in string]: number };
    infoRes?.data?.balances?.forEach(
      (i: { symbol: string; amount: number }) => {
        _info[i?.symbol] = i?.amount || 0;
      },
    );
    return _info;
  }, [infoRes]);
  useEffect(() => {
    if (Bridge.setFull) {
      Bridge.setFull(true);
    }
  }, []);

  const formatDesc = (text: string) => {
    try {
      const newTextList = text?.split("\n").map((item, index) => {
        if (index > 2) {
          return ReactDOMServer.renderToString(
            <p key={index} className="text-primary list-item list-disc ml-4">
              {item}
            </p>,
          );
        }
        return `<p>${item}</p>`;
      });
      return newTextList.join("\n");
    } catch {
      return text;
    }
  };

  const Schema = z.object({
    coin: z.string(),
    amount: z.string(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
    defaultValues: {
      coin: "9MC",
      amount: "0",
    },
  });

  return (
    <ViewLayout className="flex flex-col md-pc:h-full">
      <HeaderWithBack
        title={
          <span className="text-center leading-none">
            {t("9MEcosystemGrowthPool")}
          </span>
        }
        algin="center"
      />
      <img
        src="/images/growthpool/banner@2x.webp"
        className="w-full h-[164px] mt-2 mb-7 mc-pc:block"
      />
      <div className="px-content pb-4 flex-1 flex flex-col mb-4">
        <div>
          <div
            className="text-sm mb-[26px]"
            dangerouslySetInnerHTML={{
              __html: formatDesc(t("9MEcosystemGrowthPoolDesc")),
            }}
          ></div>
          <div className="grid grid-cols-1">
            <div className="flex justify-center items-center flex-col  border-[rgba(0,0,0,0.1)]">
              <p>USDT {t("assets.balance")}</p>
              <span className="text-lg font-bold text-primary">
                {info["USDT"] || 0}
              </span>
            </div>
            {/* <div className="flex justify-center items-center flex-col"> */}
            {/*   <p>{t("9MCBalance")}</p> */}
            {/*   <span className="text-lg font-bold text-primary"> */}
            {/*     {info["9MC"]} */}
            {/*   </span> */}
            {/* </div> */}
          </div>
          <div className="h-[1PX] bg-[rgba(0,0,0,0.1)] mt-3"></div>
          <div className="mt-6">{t("Deposit History")}</div>
        </div>
        <div className="grow shrink-0 mb-4 mt-3 min-h-[200px] relative">
          <div className="size-full absolute overflow-y-scroll rounded-box border border-base-content/5 ">
            <div className="size-full">
              <table className="table">
                <tbody>
                  {listData?.data?.list?.length ? (
                    listData?.data?.list?.map(
                      (
                        item: {
                          amount: number;
                          coin: string;
                          createTime: string;
                        },
                        index: number,
                      ) => {
                        return (
                          <tr
                            key={index}
                            className="divide-x divide-base-content/5"
                          >
                            <td>
                              +{item?.amount} {item?.coin}
                            </td>
                            <td>{item?.createTime}</td>
                          </tr>
                        );
                      },
                    )
                  ) : (
                    <tr>
                      <td colSpan={2} className="py-10 text-center">
                        <BaseImage
                          src="/images/common/no_data.png"
                          className="w-[104px] h-[90px] mx-auto"
                        />
                        <p className="font-bold text-text2 text-sm">
                          {t("暂无数据")}
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <button className="btn btn-primary mt-4" onClick={() => setOpen(true)}>
          {t("9MEcosystemBuy")}
        </button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title={t("9MEcosystemBuy")}
        >
          <div className="grid gap-4">
            <div className="form-control w-full mt-4">
              <select
                className="select w-full max-w-xs"
                defaultValue={"9MC"}
                {...register("coin", { required: t("selectCurrency") })}
              >
                <option value="9MC">9MC</option>
                <option value="USDM">USDM</option>
              </select>
              {errors.coin && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.coin.message}
                </span>
              )}
            </div>
            <div className="form-control w-full">
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <input
                    {...register("amount", {
                      required: t("selectCurrencyDesc"),
                    })}
                    {...field}
                    type="text"
                    placeholder={t("selectCurrencyDesc")}
                    className="input input-bordered w-full"
                    inputMode="decimal" // 让手机键盘仍然显示数字键盘
                    onChange={(e) => {
                      const val = e.target.value;

                      // 允许输入整数或最多两位小数
                      if (!/^\d*(\.\d{0,2})?$/.test(val)) {
                        return; // 不符合规则则不更新
                      }

                      // 允许输入整数或最多两位小数
                      if (/^\d*\.$/.test(val)) {
                        setValue("amount", val);
                        return;
                      }
                      // 只有USDM和9MC 2位小数
                      const v = utils
                        .toBigNumber(val || 0)
                        .decimalPlaces(2, utils.ROUND_DOWN)
                        .toString();

                      setValue("amount", v === "NaN" ? "0" : v);
                    }}
                  />
                )}
              ></Controller>
              {errors.amount && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.amount.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full bottom-0"
              disabled={loading}
              onClick={handleSubmit((v) => {
                setLoading(true);
                api.growth
                  .buyGrowthPoolUsingPost({
                    amount: Number(v.amount),
                    coin: v.coin,
                  } as unknown as GrowthPoolBuyDTO)
                  .then(() => {
                    toast.success(t("购买成功"));
                    setOpen(false);
                    setLoading(false);
                    mutate();
                    infoMutate();
                    reset();
                  })
                  .catch(() => {
                    setLoading(false);
                  });
              })}
            >
              {t("9MEcosystemBuy")}
            </button>
          </div>
        </Modal>
      </div>
    </ViewLayout>
  );
};

export default GrowthPoolView;
