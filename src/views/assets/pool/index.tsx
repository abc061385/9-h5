"use client";

import { api } from "@/api";
import BaseImage from "@/components/base-image";
import { Drawer } from "@/components/drawer";
import { HeaderWithBack } from "@/components/header-with-back";
import { InfiniteVirtuosoList } from "@/components/infinite-scroll";
import ViewLayout from "@/components/layout";
import { ShowIf } from "@/components/show-if";
import HorizontalTabs from "@/components/tabs/horizontal-tabs";
import { useFormatBalance } from "@/hooks/useFormatBalance";
import { useRequestMutation } from "@/hooks/useRequestMutation";
// import { useRequestQuery } from "@/hooks/useRequestQuery";
import { useTrans } from "@/hooks/useTrans";
import { cn } from "@/lib/utils";
import { useAssetStore } from "@/store/useAssetStore";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import CardBox from "./card";
import { routerMap, useRouter } from "@/i18n/navigation";
import { useBack } from "@/hooks/useBack";
import { PLATFORMTOKEN, USD1 } from "@/lib/const";

const SmartYield = () => {
  const t = useTrans();
  const { coinList, setField } = useAssetStore();
  const { formatBalance } = useFormatBalance();
  const { push } = useRouter();

  const back = useBack();
  const [tabsValue, setTabsValue] = useState(USD1);
  const [incomeInfo, setIncomeInfo] = useState<AssetsIncomeType1>();
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [withDrawNum, setWithDrawNum] = useState<string>("");
  const [detailTabsValue, setDetailTabsValue] = useState(0);
  const [pageSize] = useState(20);

  const { trigger } = useRequestMutation(
    api.fundProductConfig.claimedProfitSmartWalletUsingGet,
  );

  // const { data } = useRequestQuery(api.platformConfig.infoUsingGet1, {});
  // const withdrawConfig: infoUsingGet1Type = data?.data as infoUsingGet1Type;

  const getInfo = useCallback(() => {
    trigger(
      {
        outputToken: tabsValue,
      },
      {
        onSuccess: ({ data }) => {
          setIncomeInfo(data as AssetsIncomeType1);
        },
      },
    );
  }, [trigger, tabsValue]);

  useEffect(() => {
    getInfo();
  }, [getInfo]);

  const getIncomeList = useCallback(
    async (page: number) => {
      const { data } =
        await api.fundProductConfig.claimedProfitIncomeDetailsUsingGet({
          pageNo: page,
          pageSize: pageSize,
          tabType: detailTabsValue,
          outputToken: tabsValue,
        });
      const newData = data?.list || [];
      return {
        data: newData,
        hasMore: page < data.total / pageSize,
      };
    },
    [tabsValue, pageSize, detailTabsValue],
  );

  const tabs = [
    { label: USD1, value: USD1 },
    { label: PLATFORMTOKEN, value: PLATFORMTOKEN },
  ];
  const [submitLoading, setSumitLoading] = useState(false);

  const detailTabs = [
    { label: t("walletDetail.all"), value: 0 },
    { label: t("投资收益转入"), value: 1 },
    { label: t("币权收益转入"), value: 2 },
    { label: t("SmartYieldWallet"), value: 3 },
  ];

  const coinLogo = useCallback(
    (coin: string) => {
      return coinList.find((v) => v.currencyCode === coin)?.logo || "";
    },
    [coinList],
  );

  const estimatedArrival = useMemo(() => {
    return withDrawNum;
    // return (
    //   utils
    //     .toBigNumber(withDrawNum)
    //     .times((100 - withdrawConfig?.managementFee) / 100)
    //     .toNumber() || 0
    // );
  }, [withDrawNum]);

  const handleSubmit = useCallback(async () => {
    setSumitLoading(true);
    try {
      const res = await api.fundProductConfig.smartWalletExtractUsingPost({
        amount: Number(withDrawNum),
        outputToken: tabsValue,
      });
      setSumitLoading(false);
      if (res.code === 200) {
        setOpenWithdraw(false);
        getInfo();
        setField(
          "incomeWithdrawAmount",
          `${formatBalance(withDrawNum || 0, tabsValue)} ${tabsValue}`,
        );
        setField("resultPageType", "normal");
        push(routerMap.incomeResult);
      }
    } catch {
      setSumitLoading(false);
    }
  }, [withDrawNum, tabsValue, getInfo, push, setField, formatBalance]);

  const disabledWithdrawSubmit = useMemo(() => {
    return (
      !!withDrawNum &&
      Number(withDrawNum) > Number(incomeInfo?.unWithdrawnReturn || 0)
    );
  }, [withDrawNum, incomeInfo?.unWithdrawnReturn]);

  return (
    <ViewLayout
      heightFull
      header={
        <HeaderWithBack
          title="Smart Yield Wallet"
          algin="center"
          onClick={back}
        />
      }
      className="flex flex-col"
    >
      <div className="p-content overflow-x-hidden h-max">
        <div role="tablist" className="tabs">
          {tabs.map((tab) => (
            <a
              role="tab"
              className={cn(
                "tab flex-1 text-lg leading-5",
                tab.value === tabsValue && "tab-active font-bold",
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
            <p className="text-xs mb-1 text-text4">
              {t("SmartYieldWallet总收益")}
            </p>
            <div className="text-xl font-medium">
              {formatBalance(incomeInfo?.totalFundReturn || "0", tabsValue)}{" "}
              {tabsValue}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center text-xs">
            <p className="text-xs  text-text4">{t("每日复利收益")}: </p>
            <p className="ml-2">{(incomeInfo?.dayRate || 0) * 100} %</p>
          </div>
          <div className="flex py-4">
            <div className="flex-1 flex flex-col gap-0.5 items-start">
              <span className="text-xs text-text4">{t("累计转出")}</span>
              <span className="text-sm">
                {formatBalance(incomeInfo?.withdrawnReturn || "0", tabsValue)}{" "}
                {tabsValue}
              </span>
            </div>
            <div className="flex-1 flex flex-col gap-0.5 items-end">
              <span className="text-xs text-text4">
                {t("smartyieldwallet可用余额")}
              </span>
              <span className="text-sm">
                {formatBalance(incomeInfo?.unWithdrawnReturn || "0", tabsValue)}{" "}
                {tabsValue}
              </span>
            </div>
          </div>
          <div className="bg-white rounded-lg py-3.5 px-4">
            <div className="flex items-center justify-between ">
              <span className="text-xs text-text4">
                {t("昨日SmartYieldWallet收益")}
              </span>
              <span className="text-primary text-sm text-right">
                {formatBalance(incomeInfo?.yesterdayReturn || "0", tabsValue)}{" "}
                {tabsValue}
              </span>
            </div>
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
        <HorizontalTabs
          type="border"
          tabs={detailTabs}
          value={detailTabsValue}
          onChange={(e) => setDetailTabsValue(Number(e))}
          className="text-base mt-6 mb-4"
          wrapClassName="gap-4"
        />

        <div className="h-[80vh]">
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
        onChange={(e) => {
          setWithDrawNum("");
          setOpenWithdraw(e);
        }}
      >
        {/* <p className="text-text4 mb-6">{t("withdrawNotice")}</p> */}

        <fieldset className="fieldset">
          <legend className="fieldset-legend">{t("transfer_amount")}</legend>

          <label className="input w-full h-12">
            <input
              value={withDrawNum}
              type="number"
              onChange={(e) => {
                let value = e.target.value;
                if (value === "") {
                  // 更新输入框的值
                  e.target.value = "";
                  setWithDrawNum("");
                  return;
                }

                // 匹配合法数字格式（允许中间态：12.  /  0.）
                if (!/^\d*\.?\d*$/.test(value)) {
                  return;
                }

                // 限制小数点后两位
                if (value.includes(".")) {
                  const [int, dec] = value.split(".");
                  if (dec.length > 2) {
                    value = `${int}.${dec.slice(0, 2)}`;
                  }
                }

                // 数值范围限制（只在能转成 number 时判断）
                const num = Number(value);
                if (!isNaN(num)) {
                  if (num < 1) value = "1";
                  if (
                    incomeInfo?.unWithdrawnReturn &&
                    num > Number(incomeInfo.unWithdrawnReturn)
                  ) {
                    value = String(incomeInfo.unWithdrawnReturn);
                  }
                }

                setWithDrawNum(value);
              }}
            />
            <span className="text-text4 text-sm">{tabsValue}</span>
            <span
              className="font-bold text-sm ml-2"
              onClick={() => {
                setWithDrawNum(String(incomeInfo?.unWithdrawnReturn) || "0");
              }}
            >
              {t("withdraw.useAll")}
            </span>
          </label>
        </fieldset>
        <ShowIf condition={disabledWithdrawSubmit}>
          <div className="text-xs text-primary mt-1">{t("可用余额不足")}</div>
        </ShowIf>

        <div className="flex items-center justify-between text-sm mt-1">
          <span className=" text-text4">{t("可提取数量")}</span>
          <span>
            {formatBalance(incomeInfo?.unWithdrawnReturn || 0, tabsValue)}
          </span>
        </div>

        {/* <fieldset className="fieldset"> */}
        {/*   <legend className="fieldset-legend">{t("预计到账")}</legend> */}
        {/*   <label className="input w-full h-12"> */}
        {/*     <input value={estimatedArrival} type="text" disabled /> */}
        {/*     <span className="text-text4 text-sm">{tabsValue}</span> */}
        {/*   </label> */}
        {/* </fieldset> */}

        {/* <div className="flex items-center justify-between mt-2 text-sm"> */}
        {/*   <span className=" text-text4">{t("手续费")}</span> */}
        {/*   <span>{withdrawConfig?.managementFee || "-"}%</span> */}
        {/* </div> */}
        <div className="flex items-center justify-between mt-2 text-sm">
          <span className=" text-text4">{t("预计到账")}</span>
          <span>
            {formatBalance(estimatedArrival, tabsValue)} {tabsValue}
          </span>
        </div>

        <button
          className="btn btn-primary w-full mt-4"
          onClick={handleSubmit}
          disabled={
            submitLoading || disabledWithdrawSubmit || !Number(withDrawNum)
          }
        >
          {submitLoading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            t("common.confirm")
          )}
        </button>
      </Drawer>
    </ViewLayout>
  );
};

export default SmartYield;
