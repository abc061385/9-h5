"use client";

import ReactDOMServer from "react-dom/server.browser";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
import Bridge from "@/lib/dsBridge";
import { useEffect, useMemo, useState } from "react";
import { Modal } from "@/components/modal";
import { useForm } from "react-hook-form";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { api } from "@/api";

import BaseImage from "@/components/base-image";
import { GrowthPoolBuyDTO } from "@/api/ApiClient";
import toast from "react-hot-toast";

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
      "9MC": 0,
      USDM: 0,
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      coin: "9MC",
      amount: "",
    },
  });

  return (
    <ViewLayout className="flex flex-col md-pc:h-full">
      <HeaderWithBack title={t("9MEcosystemGrowthPool")} algin="center" />
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
          <div className="grid grid-cols-2">
            <div className="flex justify-center items-center flex-col  border-r-[1px] border-[rgba(0,0,0,0.1)]">
              <p>{t("USDMBalance")}</p>
              <span className="text-lg font-bold text-primary">
                {info["USDM"]}
              </span>
            </div>
            <div className="flex justify-center items-center flex-col">
              <p>{t("9MCBalance")}</p>
              <span className="text-lg font-bold text-primary">
                {info["9MC"]}
              </span>
            </div>
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
              <input
                type="text"
                placeholder={t("selectCurrencyDesc")}
                className="input input-bordered w-full"
                {...register("amount", { required: t("selectCurrencyDesc") })}
              />
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
