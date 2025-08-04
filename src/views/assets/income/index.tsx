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

const IncomeView = () => {
  const t = useTrans();
  const { formatBalance } = useFormatBalance();

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
  return (
    <ViewLayout
      heightFull
      header={<HeaderWithBack title={t("投资收益")} algin="center" />}
    >
      <div className="p-content">
        <div role="tablist" className="tabs tabs-box mb-4">
          {tabs.map((tab) => (
            <a
              role="tab"
              className={cn(
                "tab flex-1 leading-[100%]",
                tab.value === tabsValue && "tab-active"
              )}
              key={tab.value}
              onClick={() => setTabsValue(tab.value)}
            >
              {tab.label}
            </a>
          ))}
        </div>
        <div className="bg-bg1 rounded-md px-3.5 py-4 font-bold mb-4">
          <div className="bg-white rounded-md px-3.5 py-4">
            <div className="bg-bg1 rounded-md py-2 text-center">
              <p className="text-xs mb-0.5">{t("个人基金投资额")}</p>
              <div className="text-primary text-xl">
                {formatBalance(
                  incomeInfo?.personalFundInvestment || "0",
                  "USDT"
                )}{" "}
                USDT
              </div>
            </div>
            <div className="text-center mt-4">
              <p className="text-xs">{t("基金投资总收益")}</p>
              <div className="text-primary text-base">
                {formatBalance(incomeInfo?.totalFundReturn || "0", tabsValue)}{" "}
                {tabsValue}
              </div>
            </div>
            <div className="flex py-4">
              <div className="flex-1 flex flex-col items-center border-r border-border2">
                <span className="text-xs">{t("已提取收益")}</span>
                <span className="text-primary">
                  {formatBalance(incomeInfo?.withdrawnReturn || "0", tabsValue)}{" "}
                  {tabsValue}
                </span>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <span className="text-xs">{t("未提取收益")}</span>
                <span className="text-primary">
                  {formatBalance(
                    incomeInfo?.unWithdrawnReturn || "0",
                    tabsValue
                  )}{" "}
                  {tabsValue}
                </span>
              </div>
            </div>
            <div className=" text-rise text-xs flex items-center justify-center gap-1">
              <svg
                width="15"
                height="14"
                viewBox="0 0 15 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.5"
                  width="14"
                  height="14"
                  rx="3.11111"
                  fill="#43B067"
                />
                <g opacity="0.8">
                  <path
                    d="M7.25325 3.11863C7.25644 3.1165 7.25857 3.11437 7.26176 3.11118C7.26495 3.10906 7.26708 3.10693 7.27027 3.1048C7.27239 3.10268 7.27558 3.10055 7.27771 3.09949L7.28728 3.09311C7.28941 3.09098 7.29153 3.08992 7.29472 3.08885C7.29791 3.08673 7.30217 3.0846 7.30536 3.08247C7.30748 3.08141 7.30961 3.08035 7.31174 3.07822C7.31599 3.07609 7.31918 3.07397 7.32343 3.07184L7.32981 3.06865C7.33407 3.06652 7.33726 3.0644 7.34151 3.06227C7.34364 3.06121 7.34683 3.06014 7.34895 3.05908C7.35215 3.05695 7.3564 3.05589 7.35959 3.05376C7.36278 3.0527 7.36597 3.05164 7.36916 3.04951C7.37235 3.04845 7.37554 3.04738 7.37873 3.04526C7.38298 3.04419 7.38617 3.04207 7.39043 3.041C7.39255 3.03994 7.39574 3.03888 7.39787 3.03781L7.41063 3.03462C7.41276 3.03356 7.41488 3.03356 7.41807 3.0325L7.43083 3.02931C7.43296 3.02824 7.43615 3.02824 7.43828 3.02718C7.44253 3.02612 7.44678 3.02612 7.44997 3.02505C7.45316 3.02505 7.45529 3.02399 7.45848 3.02399C7.46167 3.02293 7.46593 3.02293 7.47018 3.02293C7.47337 3.02293 7.47656 3.02186 7.47975 3.02186C7.48294 3.02186 7.48613 3.0208 7.49038 3.0208C7.49464 3.0208 7.49783 3.01974 7.50208 3.01974L7.51165 3.01974L7.52335 3.01974L7.52654 3.01974L7.53185 3.01974L7.53823 3.01974C7.64776 3.01761 7.75942 3.05695 7.84448 3.1399L10.1945 5.42614C10.3625 5.5899 10.3668 5.85893 10.203 6.028C10.0393 6.19602 9.77024 6.20027 9.60117 6.03651L7.95188 4.43189L7.95188 10.556C7.95188 10.791 7.76154 10.9813 7.52654 10.9813C7.29153 10.9813 7.10119 10.791 7.10119 10.556L7.10119 4.43082L5.39448 6.04076C5.22328 6.2024 4.95425 6.19389 4.79368 6.02375C4.71606 5.94187 4.67777 5.8366 4.67777 5.73239C4.67777 5.61967 4.72244 5.50695 4.81176 5.42295L7.23517 3.13671L7.23836 3.13458C7.24156 3.13139 7.24368 3.12926 7.24687 3.12713C7.24794 3.12288 7.25112 3.12075 7.25325 3.11863Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="0.5"
                  />
                </g>
              </svg>
              {t("昨日投资收益")}{" "}
              {formatBalance(incomeInfo?.yesterdayReturn || "0", tabsValue)}{" "}
              {tabsValue}
            </div>
          </div>
          <button
            className="btn btn-primary w-full mt-4"
            onClick={() => {
              if (!incomeInfo?.unWithdrawnReturn)
                return toast.error(t("没有可提取的收益"));
              setOpenWithdraw(true);
            }}
          >
            {t("提取收益")}
          </button>
        </div>
        <h2 className="font-bold">{t("收益明细")}</h2>
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
                  getInfo();
                  getIncomeList();
                  setOpenWithdraw(false);
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
