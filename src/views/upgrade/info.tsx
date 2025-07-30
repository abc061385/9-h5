import { api } from "@/api";
import { Drawer } from "@/components/drawer";
import { Icon } from "@/components/icon";
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
    <div className="bg-bg1 rounded-lg p-3 pb-4 mt-4 font-bold">
      <div className="rounded-lg py-2.5 text-center bg-white p-3">
        <h2>{t("币权累计")}</h2>
        <div className="text-[26px] text-primary my-2">
          {formatBalance(info.totalCurrency || "0", tabsValue)}
          {tabsValue}
        </div>
        <h3 className="text-xs">{t("昨日币权奖励")}</h3>
        <div className="mt-2 flex items-center justify-center gap-1">
          <Icon name="up-arrow-vip" className="w-4.5 h-4.5" />
          {formatBalance(info.yesterdayCurrencyReward || "0", tabsValue)}
          {tabsValue}
        </div>
        <div className="border-t border-[#F4F1FD] mt-2.5 pt-2.5 flex justify-between">
          <div className="flex flex-col items-start border-r border-[#F4F1FD] flex-1 text-left pr-2 gap-3">
            <span className="leading-[120%]">{t("已提取收益")}</span>
            <span>
              {formatBalance(info.extractedRewards || "0", tabsValue)}
              {tabsValue}
            </span>
          </div>
          <div className="flex flex-col items-end flex-1 text-right pl-2 gap-3">
            <span className="leading-[120%]">{t("未提取收益")}</span>{" "}
            <span>
              {formatBalance(info.frozenRewards || "0", tabsValue)}
              {tabsValue}
            </span>
          </div>
        </div>
      </div>
      <button
        className="btn btn-primary w-full mt-2.5"
        onClick={() => {
          if (!info.frozenRewards) return toast.error(t("没有可领取得奖励"));
          setOpenWithdraw(true);
        }}
      >
        {t("领取奖励")}
      </button>
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
