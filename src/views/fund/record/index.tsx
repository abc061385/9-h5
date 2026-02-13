"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HeaderWithBack } from "@/components/header-with-back";
import { useTrans } from "@/hooks/useTrans";
import { useRequestMutation } from "@/hooks/useRequestMutation";
import { api } from "@/api";
import { routerMap, useRouter } from "@/i18n/navigation";
import toast from "react-hot-toast";
import Tabs from "@/components/tabs/tabs";
import { Icon } from "@/components/icon";
import CoinIcon from "../coin-icon";
import { useFormatBalance } from "@/hooks/useFormatBalance";
import { InfiniteVirtuosoList } from "@/components/infinite-scroll";
import ViewLayout from "@/components/layout";
import { useAssetStore } from "@/store/useAssetStore";
import Platform from "@/lib/platfrom";
import { ShowIf } from "@/components/show-if";
import { PLATFORMTOKEN, USD1 } from "@/lib/const";

const FundRecordView = () => {
  const reloadRef = useRef<() => Promise<void>>(null);
  const t = useTrans();
  const { push } = useRouter();
  const { getCoinList } = useAssetStore();
  const { formatBalance } = useFormatBalance();

  const [tabsValue, setTabsValue] = useState("");
  const [pageSize] = useState(15);

  useEffect(() => {
    getCoinList();
  }, [getCoinList]);

  const { trigger: editReinvestment } = useRequestMutation(
    api.fundProductConfig.reinvestmentUsingPost,
  );

  const getList = useCallback(
    async (page: number) => {
      const { data } = await api.fundProductConfig.purchaseRecordUsingGet({
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
    [pageSize, tabsValue],
  );

  const tabs = [
    { label: t("walletDetail.all"), value: "" },
    { label: USD1, value: USD1 },
    { label: PLATFORMTOKEN, value: PLATFORMTOKEN },
  ];

  const statusText = [
    t("处理中"),
    t("投资中"),
    t("已到期"),
    t("已赎回"),
    t("已取消"),
    t("复投中"),
  ];
  const fundPath = useMemo(() => {
    if (Platform.isInApp()) {
      return routerMap.fund + "?r=app";
    }
    return routerMap.fund;
  }, []);
  return (
    <ViewLayout
      heightFull
      header={
        <HeaderWithBack title={t("购买记录")} algin="center" path={fundPath} />
      }
    >
      <div className="p-content bg-bg">
        <Tabs
          tabs={tabs}
          value={tabsValue}
          onChange={(e) => setTabsValue(e as string)}
          className="text-base justify-start"
          between={false}
        />
        <InfiniteVirtuosoList<FundOrder>
          fetchData={getList}
          className="!h-[100vh]"
          columns={1}
          onReloadReady={(fn) => {
            reloadRef.current = fn;
          }}
          renderItem={(item: FundOrder) => (
            <div key={item.id} className="mt-4">
              <div className="bg-bg1 rounded-2xl p-4 pb-5">
                <h3
                  className="text-base font-medium flex items-center justify-between gap-2"
                  onClick={() =>
                    push(
                      `${routerMap.fundDetail}?id=${item.id}&orderType=${item.orderType}`,
                    )
                  }
                >
                  {item.fundType === 1 ? t("fund_no_2") : t("fund_no_1")}

                  <div className="flex items-center gap-1 flex-1">
                    <div className="text-primary text-sm text-right">
                      {statusText[item.status]}
                    </div>
                    <Icon name="right-arrow" className="w-1.5 h-2.5" color="var(--color-text2)"/>
                  </div>
                </h3>
                <div className="flex justify-between mt-4 pr-4">
                  <div>
                    <h4 className="text-text2 text-sm leading-4">
                      {t("支付代币")}
                    </h4>
                    <p>
                      {formatBalance(
                        item?.pledgeToken1Amount || 0,
                        item?.pledgeToken1 || "USDT",
                      )}
                      {item?.pledgeToken1}
                      {/*稳健基金才展示*/}
                      <ShowIf condition={item.fundType === 1}>
                        +
                        {formatBalance(
                          item?.pledgeToken2Amount || 0,
                          item?.pledgeToken2 || "USDT",
                        )}{" "}
                        {item?.pledgeToken2}
                      </ShowIf>
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
                <div className="flex justify-between text-text2 text-xs">
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
                  <span className="text-text2 text-sm">{t("自动复投")}</span>
                  <input
                    type="checkbox"
                    checked={Boolean(item.isReinvestment)}
                    className="toggle checked:border-primary checked:bg-primary checked:text-white"
                    onChange={(e) => {
                      editReinvestment(
                        {
                          id: item.id,
                          isReinvestment: e.target.checked,
                        },
                        {
                          onSuccess: async () => {
                            toast.success(t("操作成功"));
                            await reloadRef.current?.();
                          },
                        },
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </ViewLayout>
  );
};
export default FundRecordView;
