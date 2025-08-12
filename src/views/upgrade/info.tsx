import { api } from "@/api";
import { Drawer } from "@/components/drawer";
import { useFormatBalance } from "@/hooks/useFormatBalance";
import { useRequestMutation } from "@/hooks/useRequestMutation";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { useTrans } from "@/hooks/useTrans";
import { FC, useCallback, useState } from "react";
import toast from "react-hot-toast";

interface IUpgradeProps {
  tabsValue: string;
  info: AwardInfoType;
  initFn: () => void;
}

const InfoBox: FC<IUpgradeProps> = ({ tabsValue, info, initFn }) => {
  const t = useTrans();
  const { formatBalance } = useFormatBalance();

  const [openWithdraw, setOpenWithdraw] = useState(false);

  const { data } = useRequestQuery(api.platformConfig.infoUsingGet1, {});
  const withdrawConfig: infoUsingGet1Type = data?.data as infoUsingGet1Type;

  const { trigger, isMutating } = useRequestMutation(
    api.fundProductConfig.rewardExtractUsingPost
  );

  const expectIncome = useCallback(() => {
    if (!withdrawConfig?.managementFee) return 0;
    if (!info?.frozenRewards) return 0;
    const balanceString = formatBalance(
      (info.frozenRewards * (100 - withdrawConfig.managementFee)) / 100,
      tabsValue
    );
    const index = balanceString.indexOf(".");
    return balanceString.substring(0, index + 3);
  }, [info, formatBalance, withdrawConfig, tabsValue]);

  return (
    <div>
      <div className="rounded-lg bg-bg2 p-4 pt-6">
        <h2 className="text-xs text-text4 text-center">{t("币权累计")}</h2>
        <div className="text-xl font-medium leading-6 mt-1 text-center">
          {formatBalance(info.totalCurrency || "0", tabsValue)}
          {' '}
          {tabsValue}
        </div>
        <div className="border-t border-border2 mt-3 pt-4 flex justify-between">
          <div className="flex flex-col items-start gap-0.5">
            <span className="text-xs text-text4">{t("已提取收益")}</span>
            <span className="text-sm">
              {formatBalance(info.extractedRewards || "0", tabsValue)}
              {' '}
              {tabsValue}
            </span>
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-xs text-text4">{t("未提取收益")}</span>{" "}
            <span className="text-sm">
              {formatBalance(info.frozenRewards || "0", tabsValue)}
              {' '}
              {tabsValue}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between bg-white rounded-lg h-12 px-4 mt-4 mb-6">
          <h3 className="text-xs text-text4">{t("昨日币权奖励")}</h3>
          <div className="text-sm text-primary">
            {formatBalance(info.yesterdayCurrencyReward || "0", tabsValue)}
            {' '}
            {tabsValue}
          </div>
        </div>
        <button
          className="btn btn-primary w-full"
          onClick={() => {
            if (!info.frozenRewards) return toast.error(t("没有可领取得奖励"));
            setOpenWithdraw(true);
          }}
        >
          {t("领取奖励")}
        </button>
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
          <span>{formatBalance(info?.frozenRewards || 0, tabsValue)}</span>
        </div>
        <div className="flex items-center justify-between font-bold text-xs mt-3">
          <span>{t("手续费")}</span>
          <span>{withdrawConfig?.managementFee || "-"}%</span>
        </div>
        <button
          className="btn btn-primary w-full mt-4"
          disabled={isMutating}
          onClick={() => {
            trigger(
              {
                outputToken: tabsValue,
              },
              {
                onSuccess: () => {
                  toast.success(t("操作成功"));
                  setOpenWithdraw(false);
                  initFn?.();
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
    </div>
  );
};

export default InfoBox;
