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
import { Icon } from "@/components/icon";
import { Drawer } from "@/components/drawer";
import { cn } from "@/lib/utils";
import { useFundStore } from "@/store/useFundStore";

const FundBuyView = () => {
  const t = useTrans();
  const params = useSearchParams();
  const { setField } = useFundStore();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [plegeValue, setPlegeValue] = useState<PledgeType>();
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

  const { trigger } = useRequestMutation(api.fundProductConfig.detailUsingGet2);

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
          const pledge = data.pledgePlans.find(
            (v: PledgeType) =>
              v.pledgeDays.toString() === params.get("pledgeDays")
          );
          setPlegeValue(pledge);
          setField("pledgeDays", pledge);
          setInfo(data as FundInfoType);
        },
      }
    );
  }, [trigger, params, setField]);

  return (
    <ViewLayout
      heightFull
      header={<HeaderWithBack title={t("买入")} algin="center" />}
    >
      <div className="p-content relative h-full flex flex-col">
        <div className="flex justify-between relative">
          <div>
            <h3 className="text-text4 text-xs">{t("质押代币")}</h3>
            <p className="text-base font-medium mb-2 mt-1">
              {info?.pledgeToken1} / {info?.pledgeToken2}
            </p>
            <CoinIcon
              coins={[
                { src: info?.pledgeToken2Logo || "" },
                { src: info?.pledgeToken1Logo || "" },
              ]}
              overlap={18}
              size={24}
              className="justify-start"
            />
          </div>
          <div className="text-center">
            <h3 className="text-text4 text-xs">{t("产出代币")}</h3>
            <p className="text-base font-medium mb-2 mt-1">
              {info?.outputToken}
            </p>
            <CoinIcon size={24} coins={[{ src: info?.outputTokenLogo }]} />
          </div>
          <div className="divider divider-neutral w-[70%] absolute bottom-1 left-[18%] m-0">
            <Icon name="circle-right-arrow" className="size-12" />
          </div>
        </div>

        <div className="mt-10">
          <h3 className="font-medium text-base mb-2">{t("日收益率")}</h3>
          <div
            className="bg-bg2 rounded-lg px-4 py-3.5 flex items-center justify-between text-sm"
            onClick={() => setDrawerOpen(true)}
          >
            <span className="font-bold">
              {plegeValue?.pledgeDays}
              {t("天")}
            </span>
            <span>
              {t("日收益率")} ≈ {plegeValue?.dailyYield}%
              <Icon name="right-enter" className="w-1.5 h-2.5 rotate-90 ml-2" />
            </span>
          </div>
        </div>
        <BuyingBox info={info} />
        <Drawer
          title={t("质押周期")}
          open={drawerOpen}
          onChange={(e) => setDrawerOpen(e)}
          className="h-auto"
        >
          {info?.pledgePlans?.map((item, index) => {
            return (
              <div
                key={index}
                className={cn(
                  "flex justify-between items-center mt-2 h-16 bg-bg2 rounded-lg px-4",
                  plegeValue?.pledgeDays === item.pledgeDays &&
                    "bg-primary text-white"
                )}
                onClick={() => {
                  setPlegeValue(item);
                  setField("pledgeDays", item);
                  setDrawerOpen(false);
                }}
              >
                <span className="font-bold text-lg">
                  {item.pledgeDays} {t("天")}
                </span>
                <span
                  className={cn(
                    "text-base text-text4",
                    plegeValue?.pledgeDays === item.pledgeDays && "text-white"
                  )}
                >
                  {t("日收益率")} ≈ {item?.dailyYield}%
                </span>
              </div>
            );
          })}
        </Drawer>
      </div>
    </ViewLayout>
  );
};

export default FundBuyView;
