"use client";

import { useEffect, useState } from "react";
import { HeaderWithBack } from "@/components/header-with-back";
import { useTrans } from "@/hooks/useTrans";
import { ListNoData } from "@/components/nodata/list-nodata";
import { useRequestMutation } from "@/hooks/useRequestMutation";
import { api } from "@/api";
import { routerMap, useRouter } from "@/i18n/navigation";
import toast from "react-hot-toast";
import Tabs from "@/components/tabs/tabs";
import { Icon } from "@/components/icon";
import CoinIcon from "../coin-icon";
import { useFormatBalance } from "@/hooks/useFormatBalance";

const FundRecordView = () => {
  const t = useTrans();
  const { push } = useRouter();
  const { formatBalance } = useFormatBalance();

  const [tabsValue, setTabsValue] = useState("");
  const [list, setList] = useState<FundOrder[]>([]);

  const { trigger } = useRequestMutation(
    api.fundProductConfig.purchaseRecordUsingGet
  );

  const { trigger: editReinvestment } = useRequestMutation(
    api.fundProductConfig.reinvestmentUsingPost
  );

  useEffect(() => {
    trigger(
      { pageNo: 1, pageSize: 100, outputToken: tabsValue },
      {
        onSuccess: ({ data }) => {
          setList(data.list);
        },
      }
    );
  }, [trigger, tabsValue]);

  const tabs = [
    { label: t("walletDetail.all"), value: "" },
    { label: "USDM", value: "USDM" },
    { label: "9MC", value: "9MC" },
  ];

  const statusText = [
    t("处理中"),
    t("投资中"),
    t("已到期"),
    t("已赎回"),
    t("已取消"),
  ];
  return (
    <>
      <HeaderWithBack
        title={t("购买记录")}
        algin="center"
        path={routerMap.fund}
      />
      <div className="p-content">
        <Tabs
          tabs={tabs}
          value={tabsValue}
          onChange={(e) => setTabsValue(e as string)}
          className="text-base justify-start"
          between={false}
        />
        {list?.length ? (
          list.map((item) => (
            <div key={item.id} className="mt-4">
              <div className="bg-bg2 rounded-2xl p-4 pb-5">
                <h3
                  className="text-base font-medium flex items-center justify-between"
                  onClick={() =>
                    push(
                      `${routerMap.fundDetail}?id=${item.id}&orderType=${item.orderType}`
                    )
                  }
                >
                  {item.fundType === 1 ? t("稳健基金") : t("策略基金")}
                  <div className="flex items-center gap-1">
                    <div className="text-primary text-sm">
                      {statusText[item.status]}
                    </div>
                    <Icon name="right-arrow" className="w-1.5 h-2.5" />
                  </div>
                </h3>
                <div className="flex justify-between mt-4 pr-4">
                  <div>
                    <h4 className="text-text4 text-sm leading-4">
                      {t("支付代币")}
                    </h4>
                    <p>
                      {formatBalance(
                        item?.pledgeToken1Amount || 0,
                        item?.pledgeToken1 || "USDT"
                      )}
                      {item?.pledgeToken1} +{" "}
                      {formatBalance(
                        item?.pledgeToken2Amount || 0,
                        item?.pledgeToken2 || "USDT"
                      )}{" "}
                      {item?.pledgeToken2}
                    </p>
                  </div>
                  <CoinIcon
                    coins={[
                      { src: item?.pledgeToken1Logo || "" },
                      { src: item?.pledgeToken2Logo || "" },
                    ]}
                    overlap={16}
                    size={24}
                  />
                </div>
                <progress
                  className="progress progress-gradient w-full h-1 rounded-none bg-border2"
                  value={item.totalProfit || 0}
                  max={item.maxProfit}
                ></progress>
                <div className="flex justify-between text-text4 text-xs">
                  <div className="flex flex-col">
                    <span>{t("购买时间")}</span>
                    <span>{item.purchaseTime}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span>{t("到期时间")}</span>
                    <span>{item.maturityTime}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-7">
                  <span className="text-text6 text-sm">{t("自动复投")}</span>
                  <input
                    type="checkbox"
                    checked={Boolean(item.isReinvestment)}
                    className="toggle toggle-primary checked:border-primary checked:bg-primary checked:text-white"
                    onChange={(e) => {
                      editReinvestment(
                        {
                          id: item.id,
                          isReinvestment: e.target.checked,
                        },
                        {
                          onSuccess: () => {
                            toast.success(t("操作成功"));
                          },
                        }
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <ListNoData />
        )}
      </div>
    </>
  );
};
export default FundRecordView;
