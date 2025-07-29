import { Icon } from "@/components/icon";
import { useTrans } from "@/hooks/useTrans";
import { routerMap, useRouter } from "@/i18n/navigation";
import { FC, useEffect, useMemo, useState } from "react";
import { useFormatBalance } from "@/hooks/useFormatBalance";
import { Drawer } from "@/components/drawer";
import { cn } from "@/lib/utils";
import BaseImage from "@/components/base-image";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useRequestMutation } from "@/hooks/useRequestMutation";
import { api } from "@/api";
import { useFundStore } from "@/store/useFundStore";

const BuyingBox: FC<{ info: FundInfoType }> = ({ info }) => {
  const t = useTrans();
  const params = useSearchParams();
  const { push } = useRouter();
  const { setField } = useFundStore();
  const { formatBalance, getBalance } = useFormatBalance();

  const [amount, setAmount] = useState<string>("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pledgeDays, setPledgeDays] = useState<PledgeType>();
  const [isAgreement, setIsAgreement] = useState(false);

  const { trigger } = useRequestMutation(
    api.fundProductConfig.calMaxProfitUsingPost
  );

  useEffect(() => {
    const res = info.pledgePlans.find(
      (v) => v.pledgeDays.toString() === params.get("pledgeDays")
    );
    setPledgeDays(res);
  }, [params, info.pledgePlans]);

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
          push(routerMap.fundSuccess);
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
    <div>
      <h2 className="my-4">{t("买入基金")}</h2>
      <input
        type="text"
        placeholder={t("输入总质押USDT额度")}
        className="input bg-white"
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
      <div className="bg-bg1 rounded-md px-2.5 py-4 mt-4">
        <h3>{t("您需支付")}</h3>
        <div className="flex justify-between items-center h-12 bg-white rounded-md px-2 mt-4">
          <div className="flex items-center gap-1">
            <BaseImage
              src={info.pledgeToken1Logo}
              className="w-5 h-5 rounded-full flex-1"
            />
            <span>{info.pledgeToken1}</span>
          </div>
          <span>{payAmount1}</span>
        </div>
        <div className="flex items-center justify-between mt-2 mb-4">
          <span>
            {t("余额")}{" "}
            {formatBalance(getBalance(info.pledgeToken1), info.pledgeToken1)}
            {info.pledgeToken1}
          </span>
          <span
            className="text-primary cursor-pointer"
            onClick={() => push(routerMap.walletDeposit)}
          >
            {t("充值")}
          </span>
        </div>
        <div className="flex justify-between items-center h-12 bg-white rounded-md px-2 mt-4">
          <div className="flex items-center gap-1">
            <BaseImage
              src={info.pledgeToken2Logo}
              className="w-5 h-5 rounded-full flex-1"
            />
            <span>{info.pledgeToken2}</span>
          </div>
          <span>{payAmount2}</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span>
            {t("余额")}
            {formatBalance(getBalance(info.pledgeToken2), info.pledgeToken2)}
            {info.pledgeToken2}
          </span>
          <span
            className="text-primary cursor-pointer"
            onClick={() => push(routerMap.walletDeposit)}
          >
            {t("充值")}
          </span>
        </div>
      </div>
      <div
        className="flex items-center justify-between h-12 mt-2 rounded-md bg-bg1 px-3"
        onClick={() => setDrawerOpen(true)}
      >
        <span>{t("买入周期")}</span>
        <span className="flex items-center gap-1">
          {pledgeDays?.pledgeDays}
          {t("天")}
          <Icon name="arrow-line-down" />
        </span>
      </div>
      <div className="flex items-center text-xs mt-2">
        <label className="label">
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            checked={isAgreement}
            onChange={(e) => setIsAgreement(e.target.checked)}
          />

          {t("我已阅读")}
        </label>
        <span
          className="text-primary"
          onClick={() => push(routerMap.fundProtocol)}
        >
          {t("基金投资协议")}
        </span>
      </div>
      <button className="btn btn-primary w-full mt-4" onClick={submit}>
        {t("买入")}
      </button>
      <Drawer
        open={drawerOpen}
        onChange={setDrawerOpen}
        className="h-[40vh] py-4"
        title={t("质押周期")}
      >
        {info?.pledgePlans?.map((item: PledgeType) => (
          <div
            key={item.id}
            className={cn(
              "h-10 flex justify-center items-center rounded-md my-2 font-bold text-[#757575]",
              item.id === pledgeDays?.id && "bg-primary text-white"
            )}
            onClick={() => {
              setPledgeDays(item);
              setDrawerOpen(false);
            }}
          >
            {item.pledgeDays}
            {t("天")}
          </div>
        ))}
      </Drawer>
    </div>
  );
};
export default BuyingBox;
