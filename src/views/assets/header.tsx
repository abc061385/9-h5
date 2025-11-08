import { api } from "@/api";
import BaseImage from "@/components/base-image";
import { Drawer } from "@/components/drawer";
import { useRequestMutation } from "@/hooks/useRequestMutation";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { useTrans } from "@/hooks/useTrans";
import { routerMap, useRouter } from "@/i18n/navigation";
import { formatBalance } from "@/lib/utils";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAssetStore } from "@/store/useAssetStore";
import { Icon } from "@/components/icon";
import { ShowIf } from "@/components/show-if";
import { createAxiosInstance, ApiResponse } from "@/lib/axios";
import { blankToast } from "@/components/toast-wrapper";

interface NpAssets {
  coin: string; // 币种名称
  released: number; // 已发放
  total: number; // 总资产
  dailyRate: number; // 每日释放比例 = 0.1%
}
interface TotalInvestmentType {
  personalFundInvestment: number;
  yesterdayReturn: number;
  frozenUbx: number;
  npAssets: null | NpAssets;
}

type CardType = {
  icon: string;
  label: string;
  path?: string;
  onClick?: () => void;
};

const HeaderBox = () => {
  const baseApi = createAxiosInstance("/app");
  const { push } = useRouter();
  const t = useTrans();
  const {
    coinList,
    setField,
    depositCoinItem,
    getChainList,
    chainList,
    getCoinList,
  } = useAssetStore();

  const [totalInvestment, setTotalInvestment] = useState<TotalInvestmentType>();
  const [coinListData, setCoinList] = useState<CryptoAsset[]>([]);
  const [depositCoinDrawerOpen, setDepositCoinDrawerOpen] = useState(false);
  const [depositChainDrawerOpen, setDepositChainDrawerOpen] = useState(false);
  const [oneClickFund, setOneClickFund] = useState<{
    productId: number;
    pledgeDays: number;
  }>();

  const { data } = useRequestQuery(api.wallet.listUsingPost, {});
  const { trigger } = useRequestMutation(api.wallet.getTotalInvestmentUsingGet);

  const [totalAmount] = useMemo(() => {
    return [data?.data?.total ?? 0, data?.data?.frozenTotal ?? 0];
  }, [data?.data]);

  useEffect(() => {
    trigger(
      {},
      {
        onSuccess: ({ data }) => {
          setTotalInvestment(data as TotalInvestmentType);
        },
      },
    );
  }, [trigger]);

  useEffect(() => {
    if (!coinList?.length) {
      getCoinList();
      return;
    }
    setCoinList(coinList);
  }, [coinList, setField, getCoinList]);

  useEffect(() => {
    setField("depositCoinItem", {});
    setField("depositChainItem", {});
  }, [setField]);

  const cardList: CardType[] = [
    {
      icon: "/images/assets/deposit.svg",
      label: "assets.deposit",
      onClick: () => setDepositCoinDrawerOpen(true),
    },
    {
      icon: "/images/assets/withdraw.svg",
      label: "assets.withdraw",
      path: routerMap.walletWithdraw,
    },
    {
      icon: "/images/assets/flash.svg",
      label: "闪兑",
      path: routerMap.assetsExchange,
    },
    {
      icon: "/images/assets/investment.svg",
      label: "assets.investment",
      path: routerMap.income,
    },
    {
      icon: "/images/assets/plan.svg",
      label: "assets.upgrade",
      path: routerMap.upgrade,
    },
  ];

  const getOneClickFund = useCallback(async () => {
    const res: ApiResponse<{
      list: { productId: number; pledgeDays: number }[];
    }> = await baseApi.get("/fund-product-config/fast-invest-detail");
    setOneClickFund(res.data.list?.[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getOneClickFund();
  }, [getOneClickFund]);

  return (
    <div className="">
      <h3 className="text-lg font-bold mb-9.5">{t("myAssets")}</h3>
      <h4 className="text-sm text-text4 mb-1">{t("assets.balance")}</h4>
      <h4 className="text-[28px] font-bold leading-8">
        ${formatBalance(totalAmount, 2)}
      </h4>
      <>
        {totalInvestment?.npAssets ? (
          <div className="text-text4 text-sm mt-2 flex items-center">
            <span>
              {totalInvestment?.npAssets?.coin || "-"}:{" "}
              {totalInvestment?.npAssets?.released || "-"}/
              {totalInvestment?.npAssets?.total || "-"}
            </span>
            <Icon
              name="annotation"
              className="size-4 ml-2"
              onClick={() => {
                blankToast(
                  t("assets_np_tips", {
                    token_name: totalInvestment?.npAssets?.coin || "",
                    precent: (totalInvestment?.npAssets?.dailyRate || 0) * 100,
                  }),
                );
              }}
            />
          </div>
        ) : null}
      </>

      {/* {totalInvestment?.frozenUbx ? ( */}
      {/*   <div className="text-text4 text-sm mt-2"> */}
      {/*     <div className="flex items-center"> */}
      {/*       <span className="text-xs">{t("冻结金额")}</span>： */}
      {/*       <span> */}
      {/*         {formatBalance(totalInvestment?.frozenUbx || 0, 2)} USDT */}
      {/*       </span> */}
      {/*       <Icon name="warning-black" onClick={handleTip} /> */}
      {/*     </div> */}
      {/*   </div> */}
      {/* ) : null} */}
      <div className="text-text4 text-sm mt-2">
        <span className="mb-2 text-xs">{t("投资总额")}</span>：
        <span>
          {formatBalance(totalInvestment?.personalFundInvestment || 0, 2)} USDT
        </span>
      </div>
      {/* {frozenTotal ? ( */}
      {/*   <div className="text-text4 text-sm flex items-center"> */}
      {/*     <span className="text-xs">{t("funds_frozen")}</span>： */}
      {/*     <span>{formatBalance(frozenTotal, 2)} USDT</span> */}
      {/*     <Icon */}
      {/*       name="warning-black" */}
      {/*       onClick={() => toast(t("funds_frozen_tip"))} */}
      {/*     /> */}
      {/*   </div> */}
      {/* ) : null} */}
      <div className="grid grid-cols-5 gap-2 py-6">
        {cardList.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-start overflow-hidden"
            onClick={() => {
              if (item.onClick) return item.onClick();
              if (!item.path) return;
              push(item.path);
            }}
          >
            <BaseImage src={item.icon} className="w-10 h-10" />
            <span className="text-xs mt-2 text-center break-words w-full">
              {t(item.label)}
            </span>
          </div>
        ))}
      </div>
      <div
        className="p-4 bg-bg2 rounded-lg flex items-center justify-between gap-4 cursor-pointer"
        onClick={() => {
          push(routerMap.smartYield);
        }}
      >
        <Icon name="smartYieldWallet" className="w-4.5 h-4" />
        <span className="flex-1">Smart Yield Wallet</span>
        <Icon name="right-enter" className="w-1.5 h-2.5" />
      </div>
      <div
        className="p-4 bg-bg2 rounded-lg flex items-center justify-between gap-4 cursor-pointer mt-2"
        onClick={() => {
          if (!oneClickFund?.productId) return;
          push(
            `${routerMap.fundBuy}?id=${oneClickFund?.productId}&pledgeDays=360&oneClick=1`,
          );
        }}
      >
        <div className="flex flex-1 gap-4">
          <Icon name="oneInvestment" className="w-4.5 h-4 mt-1" />
          <dl className="flex-1">
            <dt>{t("oneClickInvestment")}</dt>
            <dd className="font-normal text-xs text-text4">
              {t("investmentDescription")}
            </dd>
          </dl>
        </div>
        <Icon name="right-enter" className="w-1.5 h-2.5" />
      </div>

      <div className="divider"></div>

      <Drawer
        className="h-auto"
        title={t("address.selectToken")}
        open={depositCoinDrawerOpen}
        onChange={() => {
          setDepositCoinDrawerOpen(false);
          setField("depositCoinItem", {});
        }}
      >
        <div className="max-h-[400px] overflow-auto no-scrollbar">
          {coinListData?.map((v) => {
            return (
              <div
                key={v.id}
                className="flex items-center justify-between py-3.5 border-b border-border2"
                onClick={() => {
                  setField("depositCoinItem", v);
                  getChainList();
                  setDepositCoinDrawerOpen(false);
                  setDepositChainDrawerOpen(true);
                }}
              >
                <BaseImage
                  src={v.logo!}
                  className="w-6 h-6 rounded-full overflow-hidden mr-4"
                />
                <span className="font-bold">{v.currencyCode}</span>
                <span className="flex-1 ml-2 text-sm text-text4">
                  {v.currencyCode}
                </span>
                <ShowIf
                  condition={depositCoinItem.currencyCode === v.currencyCode}
                >
                  <Icon name="duigou-primary" className="w-4 h-3" />
                </ShowIf>
              </div>
            );
          })}
        </div>
        <button
          className="btn btn-outline w-full mt-6"
          onClick={() => {
            setDepositCoinDrawerOpen(false);
            setField("depositCoinItem", {});
          }}
        >
          {t("common.cancel")}
        </button>
      </Drawer>
      <Drawer
        className="h-auto"
        title={t("address.selectChain")}
        open={depositChainDrawerOpen}
        onChange={() => {
          setDepositChainDrawerOpen(false);
          setField("depositCoinItem", {});
          setField("depositChainItem", {});
        }}
      >
        <div className="max-h-[400px] overflow-auto no-scrollbar">
          {chainList?.map((v) => {
            return (
              <div
                key={v.id}
                className="flex items-center justify-between py-3.5 border-b border-border2"
                onClick={() => {
                  setField("depositChainItem", v);
                  push(routerMap.walletDeposit);
                }}
              >
                {/* <BaseImage
                  src={v.logo!}
                  className="w-6 h-6 rounded-full overflow-hidden mr-4"
                /> */}
                <span className="font-bold flex-1">{v.protocolType}</span>
              </div>
            );
          })}
        </div>
        <button
          className="btn btn-outline w-full mt-6"
          onClick={() => {
            setDepositChainDrawerOpen(false);
            setField("depositCoinItem", {});
            setField("depositChainItem", {});
          }}
        >
          {t("common.cancel")}
        </button>
      </Drawer>
    </div>
  );
};

export default HeaderBox;
