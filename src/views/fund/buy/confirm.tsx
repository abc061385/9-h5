import { Drawer } from "@/components/drawer";
import { useTrans } from "@/hooks/useTrans";
import { FC, useMemo, useState } from "react";
import CoinIcon from "../coin-icon";
import { useFundStore } from "@/store/useFundStore";
import { useFormatBalance } from "@/hooks/useFormatBalance";
import { routerMap, useRouter } from "@/i18n/navigation";
import { useRequestMutation } from "@/hooks/useRequestMutation";
import { cn } from "@/lib/utils";
import { api } from "@/api";
import { Icon } from "@/components/icon";
import { Modal } from "@/components/modal";
import { useSearchParams } from "next/navigation";
import { ShowIf } from "@/components/show-if";

interface Iprops {
  open: boolean;
  onChange: () => void;
}

type PurchaseUsingPostQuery = {
  isFastPledge?: boolean;
  isLockPosit?: boolean;
  /** 复投是否开启(0:否,1:是) */
  isReinvestment?: boolean;
  isUsdtFirst?: boolean;
  /**
   * 质押计划ID
   * @format int64
   */
  pledgeId: number;
  /**
   * 产品ID
   * @format int64
   */
  productId: number;
  /** 投资总金额(USDT) */
  totalAmount: number;
};

const ConfirmOrderBox: FC<Iprops> = ({ open, onChange }) => {
  const t = useTrans();
  const params = useSearchParams();
  const { push } = useRouter();
  const { buyData, usdtFirstIs } = useFundStore();
  const { formatBalance } = useFormatBalance();
  const [isCheck, setIsCheck] = useState(true);
  const [oncClickTipsOpen, setOncClickTipsOpen] = useState(false);

  const { trigger: postBuy, isMutating } = useRequestMutation(
    api.fundProductConfig.purchaseUsingPost,
  );

  const isOneClick = useMemo(() => {
    return params.get("oneClick") === "1";
  }, [params]);

  return (
    <div>
      <Drawer
        open={open}
        title={t("confirmOrder")}
        className="h-auto"
        onChange={() => onChange?.()}
      >
        <h4 className="text-text2 text-sm leading-4">{t("purchase")}</h4>
        <div className="font-bold my-1 leading-5">
          {Number(buyData?.productType) === 1 ? t("fund_no_2") : t("fund_no_1")}
          &nbsp;
          {buyData?.selectCycle} {t("天")}
        </div>
        <p className="text-sm leading-5">
          {t("日收益率")} ≈ {buyData?.pledge?.dailyYield}%
        </p>
        <div className="flex justify-between border-t border-border2 pt-6 mt-6">
          <CoinIcon
            coins={[
              { src: buyData?.pledgeToken1Logo || "" },
              { src: buyData?.pledgeToken2Logo || "" },
            ]}
            overlap={16}
            size={24}
          />
          <div className="text-right">
            <h4 className="text-text2 text-sm leading-4">{t("支付代币")}</h4>
            <p>
              {buyData?.pledgeToken1Amount}
              {buyData?.pledgeToken1} + {buyData?.pledgeToken2Amount}
              {buyData?.pledgeToken2}
            </p>
          </div>
        </div>
        <div className="flex justify-between border-t border-border2 pt-6 mt-6">
          <span className="text-text1 text-sm">{t("自动复投功能")}</span>
          <input
            type="checkbox"
            checked={isCheck}
            onChange={(e) => setIsCheck(e.target.checked)}
            className="toggle toggle-primary checked:border-primary checked:bg-primary checked:text-white"
          />
        </div>

        <ShowIf condition={isOneClick}>
          <div className="flex justify-between border-t border-border2 pt-6 mt-6">
            <span className="flex items-center gap-1">
              {" "}
              {t("swapAmount")}
              <Icon
                name="annotation"
                className="size-4"
                onClick={() => setOncClickTipsOpen(true)}
              />
            </span>
            <b className="text-xl">
              {formatBalance(buyData?.swapAmount || "", "USDT")} USDT
            </b>
          </div>
        </ShowIf>

        <div className="flex justify-between border-t border-border2 pt-6 mt-6">
          <span>{t("购买总额")}</span>
          <b className="text-xl">
            {formatBalance(buyData?.totalAmount || "", "USDT")} USDT
          </b>
        </div>
        <button
          className={cn(
            "btn btn-primary w-full mt-10.5",
            isMutating && "btn-disabled",
          )}
          disabled={isMutating}
          onClick={() => {
            const params: {
              productId: number;
              pledgeId: number;
              totalAmount: number;
              isReinvestment?: boolean;
              isUsdtFirst?: string;
              isFastPledge?: number;
            } = {
              productId: Number(buyData?.productId ?? 0),
              pledgeId: Number(buyData?.pledgeId ?? 0),
              totalAmount: Number(buyData?.totalAmount ?? 0),
              isReinvestment: isCheck,
            };

            if (isOneClick) {
              params.isUsdtFirst = usdtFirstIs || "0";
              params.isFastPledge = 1;
            }
            postBuy(params as unknown as PurchaseUsingPostQuery, {
              onSuccess: () => {
                push(routerMap.fundSuccess);
              },
            });
          }}
        >
          {t("common.confirm")}
        </button>
      </Drawer>
      <Modal
        open={oncClickTipsOpen}
        onClose={() => setOncClickTipsOpen(false)}
        title={t("swapAmount")}
      >
        <p className="pt-5">{t("usdtAmount")}</p>
      </Modal>
    </div>
  );
};

export default ConfirmOrderBox;
