"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
import { cn, utils } from "@/lib/utils";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import { Icon } from "@/components/icon";
import { useBack } from "@/hooks/useBack";
import ChallengeProgress from "@/views/vip-challenge/progress";

const NewVersionMap = {
  balance: 0,
  smartWallet: 1,
};

const IncomeView = () => {
  const t = useTrans();
  const { push } = useRouter();
  const back = useBack();
  const { formatBalance } = useFormatBalance();

  const { coinList, setField } = useAssetStore();

  const [tabsValue, setTabsValue] = useState("USDM");
  const [incomeInfo, setIncomeInfo] = useState<AssetsIncomeType>();
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);
  const [newVersion, setNewVersion] = useState(NewVersionMap.balance);
  const [pageSize] = useState(20);
  const [withDrawNum, setWithDrawNum] = useState<string>("");

  const { trigger } = useRequestMutation(
    api.fundProductConfig.claimedProfitUsingGet,
  );
  const { trigger: triggerSmart, data: incomeInfoSmart } = useRequestMutation(
    api.fundProductConfig.claimedProfitSmartWalletUsingGet,
  );

  const { trigger: postExtract, isMutating } = useRequestMutation(
    api.fundProductConfig.extractUsingPost,
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
    [tabsValue, pageSize],
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
      },
    );
    triggerSmart({ outputToken: tabsValue });
  }, [trigger, tabsValue, triggerSmart]);

  useEffect(() => {
    getInfo();
  }, [getInfo]);

  const estimatedArrival = useMemo(() => {
    return (
      utils
        .toBigNumber(withDrawNum)
        .times((100 - withdrawConfig?.managementFee) / 100)
        .toNumber() || 0
    );
  }, [withDrawNum, withdrawConfig]);

  const tabs = [
    { label: "USDM", value: "USDM" },
    { label: "9MC", value: "9MC" },
  ];

  const coinLogo = useCallback(
    (coin: string) => {
      return coinList.find((v) => v.currencyCode === coin)?.logo || "";
    },
    [coinList],
  );

  const disabledWithdrawSubmit = useMemo(() => {
    return (
      !!withDrawNum &&
      Number(withDrawNum) > Number(incomeInfo?.unWithdrawnReturn || 0)
    );
  }, [withDrawNum, incomeInfo?.unWithdrawnReturn]);
  const smartRate = useMemo(() => {
    return utils
      .toBigNumber(
        (incomeInfoSmart?.data as unknown as AssetsIncomeType1)?.dayRate || 0,
      )
      .times(100)
      .toNumber();
  }, [incomeInfoSmart]);
  return (
    <ViewLayout
      heightFull
      header={
        <HeaderWithBack title={t("投资收益")} algin="center" onClick={back} />
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
          <div className="mb-4">
            <ChallengeProgress
              value={utils
                .toBigNumber(100)
                .minus(incomeInfo?.remainingProportion || 0)
                .toNumber()}
              max={100}
            />
          </div>
          <div className="bg-white rounded-lg py-3.5 px-4">
            <div className="flex items-center justify-between ">
              <span className="text-xs text-text4">{t("昨日投资收益")}</span>
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
              setOpenSelect(true);
            }}
          >
            {t("提取收益")}
          </button>
        </div>

        <h2 className="font-medium mt-6 mb-4">{t("收益明细")}</h2>

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
        open={openSelect}
        className="h-auto"
        onChange={(e) => setOpenSelect(e)}
      >
        <div>
          <div
            className="border border-border1 rounded-lg p-4 grid grid-cols-10"
            onClick={() => {
              setNewVersion(NewVersionMap.smartWallet);
              setOpenSelect(false);
              setOpenWithdraw(true);
            }}
          >
            <div className="col-span-9">
              <p className="text-base font-bold ">
                {t("depositIntoSmartWallet")}
              </p>
              <p className="text-text4">
                {t("depositIntoSmartWalletDesc", {
                  rate: `${smartRate} %`,
                })}
              </p>
            </div>
            <div className="col-span-1 flex justify-end items-center">
              <Icon name="right-enter" className="size-4" />
            </div>
          </div>
          <div
            className="border border-border1 rounded-lg p-4 grid grid-cols-10 mt-4"
            onClick={() => {
              setNewVersion(NewVersionMap.balance);
              setOpenSelect(false);
              setOpenWithdraw(true);
            }}
          >
            <div className="col-span-9">
              <p className="text-base font-bold ">
                {t("depositIntoAssetsWallet")}
              </p>
              <p className="text-text4">{t("withdrawNotice")}</p>
            </div>
            <div className="col-span-1 flex justify-end items-center">
              <Icon name="right-enter" className="size-4" />
            </div>
          </div>
        </div>
      </Drawer>
      <Drawer
        open={openWithdraw}
        title={
          newVersion === NewVersionMap.balance
            ? t("depositIntoAssetsWallet")
            : t("depositIntoSmartWallet")
        }
        className="h-auto"
        onChange={(e) => {
          setOpenWithdraw(e);
          setWithDrawNum("");
        }}
      >
        <p className="text-text4 mb-6">
          {newVersion === NewVersionMap.balance
            ? t("withdrawNotice")
            : t("depositIntoSmartWalletDesc", {
                rate: `${smartRate} %`,
              })}
        </p>

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
        <ShowIf condition={disabledWithdrawSubmit}>
          <div className="text-xs text-primary mt-1">{t("可用余额不足")}</div>
        </ShowIf>

        <div className="flex items-center justify-between text-sm mt-4">
          <span className=" text-text4">{t("可提取数量")}</span>
          <span>
            {formatBalance(incomeInfo?.unWithdrawnReturn || 0, tabsValue)}
          </span>
        </div>
        <div className="flex items-center justify-between mt-2 text-sm">
          <span className=" text-text4">{t("手续费")}</span>
          <span>{withdrawConfig?.managementFee || "-"}%</span>
        </div>
        <div className="flex items-center justify-between mt-2 text-sm">
          <span className=" text-text4">{t("预计到账")}</span>
          <span>
            {formatBalance(estimatedArrival, tabsValue)} {tabsValue}
          </span>
        </div>

        <ShowIf condition={newVersion === NewVersionMap.smartWallet}>
          <div className="text-text4 mb-8">
            <hr className="border-border2 my-4" />
            <p>{t("smartWalletN1Tip1")}</p>
            <p>{t("smartWalletN1Tip2")}</p>
          </div>
        </ShowIf>
        <button
          className="btn btn-primary w-full mt-4"
          disabled={
            isMutating || disabledWithdrawSubmit || !Number(withDrawNum)
          }
          onClick={() => {
            postExtract(
              {
                outputToken: tabsValue,
                newVersion: newVersion as unknown as boolean,
                amount: Number(withDrawNum),
              },
              {
                onSuccess: () => {
                  setField(
                    "incomeWithdrawAmount",
                    `${formatBalance(
                      withDrawNum || 0,
                      tabsValue,
                    )} ${tabsValue}`,
                  );
                  setField(
                    "resultPageType",
                    newVersion === 0 ? "normal" : "smart",
                  );
                  push(routerMap.incomeResult);
                },
              },
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
