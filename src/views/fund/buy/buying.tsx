import { useTrans } from "@/hooks/useTrans";
import { routerMap, useRouter } from "@/i18n/navigation";
import { FC, useEffect, useMemo, useState } from "react";
import { useFormatBalance } from "@/hooks/useFormatBalance";
import BaseImage from "@/components/base-image";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useRequestMutation } from "@/hooks/useRequestMutation";
import { api } from "@/api";
import { useFundStore } from "@/store/useFundStore";
import { Icon } from "@/components/icon";
import ConfirmOrderBox from "./confirm";
import { useAssetStore } from "@/store/useAssetStore";

const BuyingBox: FC<{ info: FundInfoType }> = ({ info }) => {
  const t = useTrans();
  const params = useSearchParams();
  const { push } = useRouter();
  const { setField, pledgeDays } = useFundStore();

  const { formatBalance, getBalance } = useFormatBalance();
  const {
    getBalanceList,
    getCoinList,
    setField: assetsSetField,
    coinList,
    getChainList,
  } = useAssetStore();

  const [amount, setAmount] = useState<string>("");
  const [isAgreement, setIsAgreement] = useState(false);
  const [buyConfirmOpen, setBuyConfirmOpen] = useState(false);

  useEffect(() => {
    getBalanceList();
    getCoinList();
  }, [getBalanceList, getCoinList]);

  useEffect(() => {
    assetsSetField("depositCoinItem", {});
    assetsSetField("depositChainItem", {});
  }, [assetsSetField]); // 清空充值币种和链

  const { trigger } = useRequestMutation(
    api.fundProductConfig.calMaxProfitUsingPost
  );

  const submit = () => {
    if (!isAgreement) return toast.error(t("请先同意协议"));
    if (!amount) return toast.error(t("请输入质押额度"));
    if (
      (Number(amount) * info.token1Percentage) / 100 / info.pledgeToken1Price >
      Number(getBalance(info.pledgeToken1))
    )
      return toast.error(t("余额不足请充值"));
    if (
      (Number(amount) * info.token2Percentage) / 100 / info.pledgeToken2Price >
      Number(getBalance(info.pledgeToken2))
    )
      return toast.error(t("余额不足请充值"));
    if (Number(amount) < info.minInvestment)
      return toast.error(t("质押金额不能低于", { n: info.minInvestment }));
    if (Number(amount) > (pledgeDays?.maxBet as number))
      return toast.error(
        t("单次质押不能高于", { n: pledgeDays?.maxBet as number })
      );
    trigger(
      {
        productId: Number(params.get("id")),
        pledgeId: pledgeDays?.id || 0,
        totalAmount: Number(amount) || 0,
      },
      {
        onSuccess: () => {
          setField("buyData", {
            ...info,
            productId: params.get("id")!,
            pledgeId: pledgeDays?.id || "",
            totalAmount: amount,
            pledgeToken1Amount: payAmount1,
            pledgeToken2Amount: payAmount2,
            selectCycle: pledgeDays?.pledgeDays || "",
            pledge: pledgeDays!,
          });
          setBuyConfirmOpen(true);
        },
      }
    );
  };

  const payAmount1 = useMemo(() => {
    return formatBalance(
      (Number(amount || 0) * info.token1Percentage) /
        100 /
        info.pledgeToken1Price || "",
      info.pledgeToken1
    );
  }, [
    amount,
    info.token1Percentage,
    info.pledgeToken1Price,
    info.pledgeToken1,
    formatBalance,
  ]);
  const payAmount2 = useMemo(() => {
    return formatBalance(
      (Number(amount || 0) * info.token2Percentage) /
        100 /
        info.pledgeToken2Price || "",
      info.pledgeToken2
    );
  }, [
    amount,
    info.token2Percentage,
    info.pledgeToken2Price,
    info.pledgeToken2,
    formatBalance,
  ]);

  return (
    <div className="flex flex-col flex-1">
      <h2 className="mt-6 mb-2 font-medium text-base">{t("买入基金")}</h2>
      <label className="input w-full text-right">
        <div className="flex items-center gap-1">
          <BaseImage
            src={info.pledgeToken1Logo}
            className="w-5 h-5 rounded-full flex-1"
          />
          <span>{info.pledgeToken1}</span>
        </div>
        <input
          type="text"
          className="input bg-white text-right placeholder:text-text1 px-0"
          placeholder="0.00"
          value={amount}
          onChange={(e) => {
            let input = e.target.value;
            input = input.replace(/[^0-9.]/g, "");
            const parts = input.split(".");
            if (parts.length > 2) {
              input = parts[0] + "." + parts[1];
            }
            if (input.startsWith(".")) {
              input = "0" + input;
            }
            if (
              input.startsWith("0") &&
              !input.startsWith("0.") &&
              input !== "0"
            ) {
              input = String(Number(input));
            }
            setAmount(input);
          }}
        />
      </label>

      <h3 className="text-sm my-4 flex justify-between">
        <span>{t("您需支付")}</span>
        <span className="text-text4">
          {info.pledgeToken1}:{info.pledgeToken2} = {info.token1Percentage / 10}
          :{info.token2Percentage / 10}
        </span>
      </h3>
      <div className="flex justify-between items-center h-12 bg-bg2 rounded-lg px-4">
        <div className="flex items-center gap-1">
          <BaseImage
            src={info.pledgeToken1Logo}
            className="w-5 h-5 rounded-full flex-1 overflow-hidden"
          />
          <span>{info.pledgeToken1}</span>
        </div>
        <span>{payAmount1}</span>
      </div>
      <div className="flex items-center justify-between mt-2 mb-4 text-xs ">
        <span className="text-text4">
          {t("余额")}{" "}
          {formatBalance(getBalance(info.pledgeToken1), info.pledgeToken1)}
          {info.pledgeToken1}
        </span>
        <span
          className="text-primary cursor-pointer flex items-center gap-1"
          onClick={async () => {
            const coin = coinList.find(
              (v) => v.currencyCode === info.pledgeToken1
            );
            if (coin) {
              assetsSetField("depositCoinItem", coin);
              await getChainList();
              push(routerMap.walletDeposit);
            } else {
              toast.error(t("未查询到该币种"));
            }
          }}
        >
          <Icon name="circle-add" className="w-3 h-3" />
          {t("充值")}
        </span>
      </div>
      <div className="flex justify-between items-center h-12 bg-bg2 rounded-lg px-4">
        <div className="flex items-center gap-1">
          <BaseImage
            src={info.pledgeToken2Logo}
            className="w-5 h-5 rounded-full flex-1 overflow-hidden"
          />
          <span>{info.pledgeToken2}</span>
        </div>
        <span>{payAmount2}</span>
      </div>
      <div className="flex items-center justify-between mt-2 text-xs">
        <span className="text-text4">
          {t("余额")}{" "}
          {formatBalance(getBalance(info.pledgeToken2), info.pledgeToken2)}
          {info.pledgeToken2}
        </span>
        <span
          className="text-primary cursor-pointer flex items-center gap-1"
          onClick={async () => {
            const coin = coinList.find(
              (v) => v.currencyCode === info.pledgeToken2
            );
            if (coin) {
              assetsSetField("depositCoinItem", coin);
              await getChainList();
              push(routerMap.walletDeposit);
            } else {
              toast.error(t("未查询到该币种"));
            }
          }}
        >
          <Icon name="circle-add" className="w-3 h-3" />
          {t("充值")}
        </span>
      </div>
      <div className="grow"></div>
      <div className="flex items-center text-xs mt-2 text-text4">
        <label className="label">
          <input
            type="checkbox"
            className="checkbox checkbox-neutral"
            checked={isAgreement}
            onChange={(e) => setIsAgreement(e.target.checked)}
          />

          {t("我已阅读")}
        </label>
        <span
          className="text-text1"
          onClick={() => push(routerMap.protocol + "?type=2")}
        >
          {t("基金投资协议")}
        </span>
      </div>
      <button className="btn btn-primary w-full mt-4" onClick={submit}>
        {t("买入")}
      </button>
      <ConfirmOrderBox
        open={buyConfirmOpen}
        onChange={() => setBuyConfirmOpen(false)}
      />
    </div>
  );
};
export default BuyingBox;
