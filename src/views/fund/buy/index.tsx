"use client";

import { useEffect, useState } from "react";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
import CoinIcon from "../coin-icon";
import BuyingBox from "./buying";
import { api } from "@/api";
import { useSearchParams } from "next/navigation";
import { useRequestMutation } from "@/hooks/useRequestMutation";

const FundBuyView = () => {
  const t = useTrans();
  const params = useSearchParams();

  const [info, setInfo] = useState<FundInfoType>({
    pledgeToken1: "",
    pledgeToken2: "",
    pledgeToken2Logo: "/",
    pledgeToken1Logo: "/",
    outputTokenLogo: "/",
    pledgePlans: [],
    outputToken: "",
    token1Percentage: 0,
    pledgeToken1Price: 0,
    token2Percentage: 0,
    pledgeToken2Price: 0,
    minInvestment: 0,
    id: 0,
    productType: 0,
  });

  const { trigger } = useRequestMutation(api.fundProductConfig.detailUsingGet);

  useEffect(() => {
    if (!params.get("id")) return;
    trigger(
      {
        id: Number(params.get("id")),
      },
      {
        onSuccess: ({ data }) => {
          const pledgeList = data?.pledgePlans.sort(
            (a: { pledgeDays: number }, b: { pledgeDays: number }) => {
              return b.pledgeDays - a.pledgeDays;
            }
          );
          data.pledgePlans = pledgeList;
          setInfo(data as FundInfoType);
        },
      }
    );
  }, [trigger, params]);

  return (
    <ViewLayout
      heightFull
      header={<HeaderWithBack title={t("买入")} algin="center" />}
    >
      <div className="p-content font-bold">
        <div className="bg-bg1 rounded-md py-4 px-3.5">
          <div className="bg-white rounded-md py-7 px-9 flex justify-between text-xs">
            <div>
              <h3>{t("质押代币")}</h3>
              <p className="my-1.5 font-[510]">
                {info?.pledgeToken1} / {info?.pledgeToken2}
              </p>
              <CoinIcon
                coins={[
                  { src: info?.pledgeToken2Logo || "" },
                  { src: info?.pledgeToken1Logo || "" },
                ]}
                overlap={8}
                className="justify-center"
              />
            </div>
            <div className="text-center">
              <h3>{t("产出代币")}</h3>
              <p className="my-1.5 font-[510]">{info?.outputToken}</p>
              <CoinIcon
                coins={[{ src: info?.outputTokenLogo }]}
                className="justify-center"
              />
            </div>
          </div>

          <div className="bg-white rounded-md py-4 px-2.5 mt-5">
            <h3 className="text-center">{t("日收益率")}</h3>
            {info?.pledgePlans?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between items-center mt-4"
                >
                  <span>
                    {item.pledgeDays} {t("天")}
                  </span>
                  <span>{item.dailyYield}%</span>
                </div>
              );
            })}
          </div>
        </div>
        <BuyingBox info={info} />
      </div>
    </ViewLayout>
  );
};

export default FundBuyView;
