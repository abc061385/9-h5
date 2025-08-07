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
import { ListNoData } from "@/components/nodata/list-nodata";
import BaseImage from "@/components/base-image";
import { useAssetStore } from "@/store/useAssetStore";
import { routerMap, useRouter } from "@/i18n/navigation";

const IncomeView = () => {
  const t = useTrans();
  const { push } = useRouter();
  const { formatBalance } = useFormatBalance();

  const { coinList, setField } = useAssetStore();

  const [tabsValue, setTabsValue] = useState("USDM");
  const [incomeInfo, setIncomeInfo] = useState<AssetsIncomeType>();
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [list, setList] = useState<IncomeListType[]>();

  const { trigger } = useRequestMutation(
    api.fundProductConfig.claimedProfitUsingGet
  );

  const { trigger: getList } = useRequestMutation(
    api.fundProductConfig.claimedProfitTransactionUsingGet
  );

  const { trigger: postExtract, isMutating } = useRequestMutation(
    api.fundProductConfig.extractUsingPost
  );

  const { data } = useRequestQuery(api.platformConfig.infoUsingGet1, {});
  const withdrawConfig: infoUsingGet1Type = data?.data as infoUsingGet1Type;

  const getIncomeList = useCallback(() => {
    getList(
      {
        pageNo: 1,
        pageSize: 100,
        outputToken: tabsValue,
      },
      {
        onSuccess: ({ data }) => setList(data?.list || []),
      }
    );
  }, [getList, tabsValue]);

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
    getIncomeList();
  }, [getIncomeList]);

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
    >
      <div className="p-content">
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
                {formatBalance(incomeInfo?.unWithdrawnReturn || "0", tabsValue)}{" "}
                {tabsValue}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between bg-white rounded-lg h-12 px-4">
            <span className="text-xs text-text4">{t("昨日投资收益")}</span>
            <span className="text-primary text-sm">
              {formatBalance(incomeInfo?.yesterdayReturn || "0", tabsValue)}{" "}
              {tabsValue}
            </span>
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

        <h2 className="font-medium mt-6 mb-4">{t("收益明细")}</h2>
        {list?.length ? (
          list.map((v, i) => <CardBox key={i} data={v} symbol={tabsValue} />)
        ) : (
          <ListNoData />
        )}
      </div>
      <Drawer
        open={openWithdraw}
        title={t("提取收益")}
        className="h-auto"
        onChange={(e) => setOpenWithdraw(e)}
      >
        <div className="bg-bg1 rounded-md px-3.5 py-4 font-bold text-center">
          <p className="text-xs mb-1">{t("预计到账")}</p>
          <div className="text-primary text-2xl">
            {expectIncome()} {tabsValue}
          </div>
        </div>
        <div className="flex items-center justify-between font-bold text-xs mt-3">
          <span>{t("提取数量")}</span>
          <span>
            {formatBalance(incomeInfo?.unWithdrawnReturn || 0, tabsValue)}
          </span>
        </div>
        <div className="flex items-center justify-between font-bold text-xs mt-3">
          <span>{t("手续费")}</span>
          <span>{withdrawConfig?.managementFee || "-"}%</span>
        </div>
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
