"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import CardBox from "./card";
import { useRequestMutation } from "@/hooks/useRequestMutation";
import { api } from "@/api";
import { useFormatBalance } from "@/hooks/useFormatBalance";
import toast from "react-hot-toast";
import { Drawer } from "@/components/drawer";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import BaseImage from "@/components/base-image";
import { useAssetStore } from "@/store/useAssetStore";
import { routerMap, useRouter } from "@/i18n/navigation";
import { InfiniteVirtuosoList } from "@/components/infinite-scroll";
import { ShowIf } from "@/components/show-if";
import HorizontalTabs from "@/components/tabs/horizontal-tabs";

const IncomeView = () => {
  const t = useTrans();
  const { push } = useRouter();
  const { formatBalance } = useFormatBalance();

  const { coinList, setField } = useAssetStore();

  const [tabsValue, setTabsValue] = useState("USDM");
  const [incomeInfo, setIncomeInfo] = useState<AssetsIncomeType>();
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [pageSize] = useState(20);
  const [detailTabsValue, setDetailTabsValue] = useState("all");
  const [withDrawNum, setWithDrawNum] = useState<string>("");

  const detailTabs = [
    { label: "All Details", value: "all" },
    { label: "Investment", value: "withdrawn" },
    { label: "Smart Yield Wallet", value: "unWithdrawn" },
  ];

  const { trigger } = useRequestMutation(
    api.fundProductConfig.claimedProfitUsingGet
  );

  const { trigger: postExtract, isMutating } = useRequestMutation(
    api.fundProductConfig.extractUsingPost
  );

  const { data } = useRequestQuery(api.platformConfig.infoUsingGet1, {});
  const withdrawConfig: infoUsingGet1Type = data?.data as infoUsingGet1Type;

  const getIncomeList = useCallback(
    async (page: number) => {
      const { data } =
        await api.fundProductConfig.claimedProfitTransactionUsingGet({
          pageNo: page,
          pageSize: pageSize,
          outputToken: tabsValue,
        });
      const newData = data?.list || [];
      return {
        data: newData,
        hasMore: page < data.total / pageSize,
      };
    },
    [tabsValue, pageSize]
  );

  const getInfo = useCallback(() => {
    trigger(
      {
        outputToken: tabsValue,
      },
      {
        onSuccess: ({ data }) => {
          setIncomeInfo(data as AssetsIncomeType);
        },
      }
    );
  }, [trigger, tabsValue]);

  useEffect(() => {
    getInfo();
  }, [getInfo]);

  const expectIncome = useCallback(() => {
    if (!withdrawConfig?.managementFee) return 0;
    if (!incomeInfo?.unWithdrawnReturn) return 0;
    const balanceString = formatBalance(
      (incomeInfo.unWithdrawnReturn * (100 - withdrawConfig.managementFee)) /
        100,
      tabsValue
    );
    const index = balanceString.indexOf(".");
    return balanceString.substring(0, index + 3);
  }, [incomeInfo, formatBalance, withdrawConfig, tabsValue]);

  const tabs = [
    { label: "USDM", value: "USDM" },
    { label: "9MC", value: "9MC" },
  ];

  const coinLogo = useCallback(
    (coin: string) => {
      return coinList.find((v) => v.currencyCode === coin)?.logo || "";
    },
    [coinList]
  );
  return (
    <ViewLayout
      heightFull
      header={<HeaderWithBack title={t("投资收益")} algin="center" />}
      className="flex flex-col"
    >
      <div className="p-content overflow-x-hidden h-max">
        <div role="tablist" className="tabs">
          {tabs.map((tab) => (
            <a
              role="tab"
              className={cn(
                "tab flex-1 text-lg leading-5",
                tab.value === tabsValue && "tab-active font-bold"
              )}
              key={tab.value}
              onClick={() => setTabsValue(tab.value)}
            >
              <BaseImage
                src={coinLogo(tab.label)}
                className="size-5 rounded-full overflow-hidden mr-2"
              />

              {tab.label}
            </a>
          ))}
        </div>
        <div className="bg-bg2 rounded-lg p-4 relative mt-14 pt-12">
          <BaseImage
            src={coinLogo(tabsValue)}
            className="size-12 absolute left-[50%] top-0 translate-[-50%] rounded-full overflow-hidden"
          />
          <div className="text-center border-b border-border2 pb-4 mb-4">
            <p className="text-xs mb-1 text-text4">{t("个人基金投资额")}</p>
            <div className="text-xl font-medium">
              {formatBalance(incomeInfo?.personalFundInvestment || "0", "USDT")}{" "}
              USDT
            </div>
          </div>

          <ShowIf condition={tabsValue === "9MC"}>
            <div className="flex py-4">
              <div className="flex-1 flex flex-col gap-0.5 items-start">
                <span className="text-xs text-text4">
                  {t("基金投资总收益")}
                </span>
                <span className="text-sm">
                  {formatBalance(incomeInfo?.withdrawnReturn || "0", tabsValue)}{" "}
                  {tabsValue}
                </span>
              </div>
              <div className="flex-1 flex flex-col gap-0.5 items-end">
                <span className="text-xs text-text4 text-right">
                  Smart Yield Wallet total income
                </span>
                <span className="text-sm">
                  {formatBalance(
                    incomeInfo?.unWithdrawnReturn || "0",
                    tabsValue
                  )}{" "}
                  {tabsValue}
                </span>
              </div>
            </div>
            <div className="flex py-4">
              <div className="flex-1 flex flex-col gap-0.5 items-start">
                <span className="text-xs text-text4">{t("已提取收益")}</span>
                <span className="text-sm">
                  {formatBalance(incomeInfo?.withdrawnReturn || "0", tabsValue)}{" "}
                  {tabsValue}
                </span>
              </div>
              <div className="flex-1 flex flex-col gap-0.5 items-end">
                <span className="text-xs text-text4 text-right">
                  Smart Yield Wallet balance
                </span>
                <span className="text-sm">
                  {formatBalance(
                    incomeInfo?.unWithdrawnReturn || "0",
                    tabsValue
                  )}{" "}
                  {tabsValue}
                </span>
              </div>
            </div>
          </ShowIf>
          <ShowIf condition={tabsValue === "USDM"}>
            <div className="text-center mt-4">
              <p className="text-xs mb-0,5 text-text4">{t("基金投资总收益")}</p>
              <div>
                {formatBalance(incomeInfo?.totalFundReturn || "0", tabsValue)}{" "}
                {tabsValue}
              </div>
            </div>
            <div className="flex py-4">
              <div className="flex-1 flex flex-col gap-0.5 items-start">
                <span className="text-xs text-text4">{t("已提取收益")}</span>
                <span className="text-sm">
                  {formatBalance(incomeInfo?.withdrawnReturn || "0", tabsValue)}{" "}
                  {tabsValue}
                </span>
              </div>
              <div className="flex-1 flex flex-col gap-0.5 items-end">
                <span className="text-xs text-text4">{t("未提取收益")}</span>
                <span className="text-sm">
                  {formatBalance(
                    incomeInfo?.unWithdrawnReturn || "0",
                    tabsValue
                  )}{" "}
                  {tabsValue}
                </span>
              </div>
            </div>
          </ShowIf>
          <div className="bg-white rounded-lg py-3.5 px-4">
            <div className="flex items-center justify-between ">
              <span className="text-xs text-text4">{t("昨日投资收益")}</span>
              <span className="text-primary text-sm text-right">
                {formatBalance(incomeInfo?.yesterdayReturn || "0", tabsValue)}{" "}
                {tabsValue}
              </span>
            </div>
            <ShowIf condition={tabsValue === "9MC"}>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-text4 flex-1">
                  Yesterday’s Smart Yield Wallet Income
                </span>
                <span className="text-primary text-sm text-right">
                  {formatBalance(incomeInfo?.yesterdayReturn || "0", tabsValue)}{" "}
                  {tabsValue}
                </span>
              </div>
            </ShowIf>
          </div>
          <button
            className="btn btn-primary w-full mt-6"
            onClick={() => {
              if (!incomeInfo?.unWithdrawnReturn)
                return toast.error(t("没有可提取的收益"));
              setOpenWithdraw(true);
            }}
          >
            {t("提取收益")}
          </button>
        </div>

        <ShowIf condition={tabsValue === "USDM"}>
          <h2 className="font-medium mt-6 mb-4">{t("收益明细")}</h2>
        </ShowIf>

        <ShowIf condition={tabsValue === "9MC"}>
          <HorizontalTabs
            type="border"
            tabs={detailTabs}
            value={detailTabsValue}
            onChange={(e) => setDetailTabsValue(e as string)}
            className="text-base mt-6 mb-4 gap-6"
          />
        </ShowIf>

        <div className="h-[100vh]">
          <InfiniteVirtuosoList<IncomeListType>
            fetchData={getIncomeList}
            columns={1}
            renderItem={(item: IncomeListType) => (
              <CardBox key={item.id} data={item} symbol={tabsValue} />
            )}
          />
        </div>
      </div>
      <Drawer
        open={openWithdraw}
        title={t("提取收益")}
        className="h-auto"
        onChange={(e) => setOpenWithdraw(e)}
      >
        <p className="text-text4 mb-6">{t("withdrawNotice")}</p>

        <label className="input w-full h-12">
          <input
            value={withDrawNum}
            type="number"
            onChange={(e) => setWithDrawNum(e.target.value)}
          />
          <span className="text-text4 text-sm">{tabsValue}</span>
          <span className="font-bold text-sm ml-2">All</span>
        </label>
        <ShowIf
          condition={
            !!withDrawNum &&
            Number(withDrawNum) > Number(incomeInfo?.unWithdrawnReturn || 0)
          }
        >
          <div className="text-xs text-primary mt-1">可用余额不足</div>
        </ShowIf>

        <div className="flex items-center justify-between text-sm mt-4">
          <span className=" text-text4">{t("提取数量")}</span>
          <span>
            {formatBalance(incomeInfo?.unWithdrawnReturn || 0, tabsValue)}
          </span>
        </div>
        <div className="flex items-center justify-between mt-2 text-sm">
          <span className=" text-text4">{t("手续费")}</span>
          <span>{withdrawConfig?.managementFee || "-"}%</span>
        </div>
        <ShowIf condition={tabsValue === "9MC"}>
          <div className="flex items-center justify-between mt-2 text-sm">
            <span className=" text-text4">Expected amount to be received</span>
            <span>
              {expectIncome()} {tabsValue}
            </span>
          </div>
        </ShowIf>

        <button
          className="btn btn-primary w-full mt-4"
          disabled={isMutating}
          onClick={() => {
            postExtract(
              {
                outputToken: tabsValue,
              },
              {
                onSuccess: () => {
                  setField(
                    "incomeWithdrawAmount",
                    `${formatBalance(
                      incomeInfo?.unWithdrawnReturn || 0,
                      tabsValue
                    )} ${tabsValue}`
                  );
                  push(routerMap.incomeResult);
                  // getInfo();
                  // getIncomeList();
                  // setOpenWithdraw(false);
                },
              }
            );
          }}
        >
          {isMutating ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            t("common.confirm")
          )}
        </button>
      </Drawer>
    </ViewLayout>
  );
};
export default IncomeView;
