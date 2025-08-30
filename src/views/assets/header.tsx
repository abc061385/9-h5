import { api } from "@/api";
import BaseImage from "@/components/base-image";
import { Drawer } from "@/components/drawer";
import { useRequestMutation } from "@/hooks/useRequestMutation";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { useTrans } from "@/hooks/useTrans";
import { routerMap, useRouter } from "@/i18n/navigation";
import { formatBalance } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useAssetStore } from "@/store/useAssetStore";
import { Icon } from "@/components/icon";
import { ShowIf } from "@/components/show-if";
import toast from "react-hot-toast";

interface TotalInvestmentType {
  personalFundInvestment: number;
  yesterdayReturn: number;
  frozenUbx: number;
}

type CardType = {
  icon: string;
  label: string;
  path?: string;
  onClick?: () => void;
};

const HeaderBox = () => {
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

  const { data } = useRequestQuery(api.wallet.listUsingPost, {});
  const totalAmount = data?.data.total;
  const { trigger } = useRequestMutation(api.wallet.getTotalInvestmentUsingGet);

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

  const handleTip = () => {
    toast(t("老数据总资产"));
  };
  return (
    <div className="">
      <h3 className="text-lg font-bold mb-9.5">{t("myAssets")}</h3>
      <h4 className="text-sm text-text4 mb-1">{t("assets.balance")}</h4>
      <h4 className="text-[28px] font-bold leading-8">
        ${formatBalance(totalAmount, 2)}
      </h4>
      {totalInvestment?.frozenUbx ? (
        <div className="text-text4 text-sm mt-2">
          <div className="flex items-center">
            <span className="text-xs">{t("冻结金额")}</span>：
            <span>
              {formatBalance(totalInvestment?.frozenUbx || 0, 2)} USDT
            </span>
            <Icon name="warning-black" onClick={handleTip} />
          </div>
        </div>
      ) : null}
      <div className="text-text4 text-sm mt-2">
        <span className="mb-2 text-xs">{t("投资总额")}</span>：
        <span>
          {formatBalance(totalInvestment?.personalFundInvestment || 0, 2)} USDT
        </span>
      </div>
      <div className="grid grid-cols-5 gap-8 py-6 border-b border-border2">
        {cardList.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-start"
            onClick={() => {
              if (item.onClick) return item.onClick();
              if (!item.path) return;
              push(item.path);
            }}
          >
            <BaseImage src={item.icon} className="w-10 h-10" />
            <span className="text-xs mt-2 text-center">{t(item.label)}</span>
          </div>
        ))}
      </div>
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
