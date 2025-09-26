import { api } from "@/api";
import { Drawer } from "@/components/drawer";
import { Icon } from "@/components/icon";
import { ShowIf } from "@/components/show-if";
import { useFormatBalance } from "@/hooks/useFormatBalance";
import { useRequestMutation } from "@/hooks/useRequestMutation";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { useTrans } from "@/hooks/useTrans";
import { utils } from "@/lib/utils";
import { FC, useMemo, useState } from "react";
import toast from "react-hot-toast";

interface IUpgradeProps {
  tabsValue: string;
  info: AwardInfoType;
  initFn: () => void;
}

const NewVersionMap = {
  balance: 0,
  smartWallet: 1,
};

const InfoBox: FC<IUpgradeProps> = ({ tabsValue, info, initFn }) => {
  const t = useTrans();
  const { formatBalance } = useFormatBalance();
  const [openSelect, setOpenSelect] = useState(false);
  const [newVersion, setNewVersion] = useState(NewVersionMap.balance);

  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [withDrawNum, setWithDrawNum] = useState<string>("");

  const { data } = useRequestQuery(api.platformConfig.infoUsingGet1, {});
  const withdrawConfig: infoUsingGet1Type = data?.data as infoUsingGet1Type;

  const { data: incomeInfoSmart } = useRequestQuery(
    api.fundProductConfig.claimedProfitSmartWalletUsingGet,
    { outputToken: tabsValue },
  );
  const { trigger, isMutating } = useRequestMutation(
    api.fundProductConfig.rewardExtractUsingPost,
  );

  // const expectIncome = useCallback(() => {
  //   if (!withdrawConfig?.managementFee) return 0;
  //   if (!info?.frozenRewards) return 0;
  //   const balanceString = formatBalance(
  //     (info.frozenRewards * (100 - withdrawConfig.managementFee)) / 100,
  //     tabsValue,
  //   );
  //   const index = balanceString.indexOf(".");
  //   return balanceString.substring(0, index + 3);
  // }, [info, formatBalance, withdrawConfig, tabsValue]);

  const smartRate = useMemo(() => {
    return utils
      .toBigNumber(
        (incomeInfoSmart?.data as unknown as AssetsIncomeType1)?.dayRate || 0,
      )
      .times(100)
      .toNumber();
  }, [incomeInfoSmart]);

  const disabledWithdrawSubmit = useMemo(() => {
    return (
      !!withDrawNum && Number(withDrawNum) > Number(info?.frozenRewards || 0)
    );
  }, [withDrawNum, info?.frozenRewards]);
  const estimatedArrival = useMemo(() => {
    return (
      utils
        .toBigNumber(withDrawNum)
        .times((100 - withdrawConfig?.managementFee) / 100)
        .toNumber() || 0
    );
  }, [withDrawNum, withdrawConfig]);
  return (
    <div>
      <div className="rounded-lg bg-bg2 p-4 pt-6">
        <h2 className="text-xs text-text4 text-center">{t("币权累计")}</h2>
        <div className="text-xl font-medium leading-6 mt-1 text-center">
          {formatBalance(info.totalCurrency || "0", tabsValue)} {tabsValue}
        </div>
        <div className="border-t border-border2 mt-3 pt-4 flex justify-between">
          <div className="flex flex-col items-start gap-0.5">
            <span className="text-xs text-text4">{t("已提取收益")}</span>
            <span className="text-sm">
              {formatBalance(info.extractedRewards || "0", tabsValue)}{" "}
              {tabsValue}
            </span>
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-xs text-text4">{t("未提取收益")}</span>{" "}
            <span className="text-sm">
              {formatBalance(info.frozenRewards || "0", tabsValue)} {tabsValue}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between bg-white rounded-lg h-12 px-4 mt-4 mb-6">
          <h3 className="text-xs text-text4">{t("昨日币权奖励")}</h3>
          <div className="text-sm text-primary">
            {formatBalance(info.yesterdayCurrencyReward || "0", tabsValue)}{" "}
            {tabsValue}
          </div>
        </div>
        <button
          className="btn btn-primary w-full"
          onClick={() => {
            if (!info.frozenRewards) return toast.error(t("没有可领取得奖励"));
            setOpenSelect(true);
          }}
        >
          {t("领取奖励")}
        </button>
      </div>

      <Drawer
        open={openSelect}
        className="h-auto"
        onChange={(e) => setOpenSelect(e)}
      >
        <div>
          <div
            className="border border-border1 rounded-lg p-4 grid grid-cols-10"
            onClick={() => {
              setNewVersion(NewVersionMap.smartWallet);
              setOpenSelect(false);
              setOpenWithdraw(true);
            }}
          >
            <div className="col-span-9">
              <p className="text-base font-bold ">
                {t("depositIntoSmartWallet")}
              </p>
              <p className="text-text4">
                {t("depositIntoSmartWalletDesc", {
                  rate: `${smartRate} %`,
                })}
              </p>
            </div>
            <div className="col-span-1 flex justify-end items-center">
              <Icon name="right-enter" className="size-4" />
            </div>
          </div>
          <div
            className="border border-border1 rounded-lg p-4 grid grid-cols-10 mt-4"
            onClick={() => {
              setNewVersion(NewVersionMap.balance);
              setOpenSelect(false);
              setOpenWithdraw(true);
            }}
          >
            <div className="col-span-9">
              <p className="text-base font-bold ">
                {t("depositIntoAssetsWallet")}
              </p>
              <p className="text-text4">{t("withdrawNotice")}</p>
            </div>
            <div className="col-span-1 flex justify-end items-center">
              <Icon name="right-enter" className="size-4" />
            </div>
          </div>
        </div>
      </Drawer>
      <Drawer
        open={openWithdraw}
        title={
          newVersion === NewVersionMap.balance
            ? t("depositIntoAssetsWallet")
            : t("depositIntoSmartWallet")
        }
        className="h-auto"
        onChange={(e) => {
          setOpenWithdraw(e);
          setWithDrawNum("");
        }}
      >
        <p className="text-text4 mb-6">
          {newVersion === NewVersionMap.balance
            ? t("withdrawNotice")
            : t("depositIntoSmartWalletDesc", {
                rate: `${smartRate} %`,
              })}
        </p>

        <label className="input w-full h-12">
          <input
            value={withDrawNum}
            type="number"
            // onChange={(e) => setWithDrawNum(e.target.value)}
            onChange={(e) => {
              let value = e.target.value;
              if (value === "") {
                // 更新输入框的值
                e.target.value = "";
                setWithDrawNum("");
                return;
              }

              // 匹配合法数字格式（允许中间态：12.  /  0.）
              if (!/^\d*\.?\d*$/.test(value)) {
                return;
              }

              // 限制小数点后两位
              if (value.includes(".")) {
                const [int, dec] = value.split(".");
                if (dec.length > 2) {
                  value = `${int}.${dec.slice(0, 2)}`;
                }
              }

              // 数值范围限制（只在能转成 number 时判断）
              const num = Number(value);
              if (!isNaN(num)) {
                if (num < 1) value = "1";
                if (info?.frozenRewards && num > Number(info?.frozenRewards)) {
                  value = String(info?.frozenRewards);
                }
              }

              setWithDrawNum(value);
            }}
          />
          <span className="text-text4 text-sm">{tabsValue}</span>
          <span
            className="font-bold text-sm ml-2"
            onClick={() => {
              setWithDrawNum(String(info?.frozenRewards) || "0");
            }}
          >
            {t("withdraw.useAll")}
          </span>
        </label>
        <ShowIf condition={disabledWithdrawSubmit}>
          <div className="text-xs text-primary mt-1">{t("可用余额不足")}</div>
        </ShowIf>
        {/* <div className="bg-bg1 rounded-md px-3.5 py-4 text-center"> */}
        {/*   <p className="mb-1">{t("预计到账")}</p> */}
        {/*   <div className="text-primary text-xl font-medium"> */}
        {/*     {expectIncome()} {tabsValue} */}
        {/*   </div> */}
        {/* </div> */}
        <div className="flex items-center justify-between text-sm mt-4">
          <span className=" text-text4">{t("可提取数量")}</span>
          <span>{formatBalance(info?.frozenRewards || 0, tabsValue)}</span>
        </div>
        <div className="flex items-center justify-between mt-2 text-sm">
          <span className=" text-text4">{t("手续费")}</span>
          <span>{withdrawConfig?.managementFee || "-"}%</span>
        </div>
        <div className="flex items-center justify-between mt-2 text-sm">
          <span className=" text-text4">{t("预计到账")}</span>
          <span>
            {formatBalance(estimatedArrival, tabsValue)} {tabsValue}
          </span>
        </div>
        <ShowIf condition={newVersion === NewVersionMap.smartWallet}>
          <div className="text-sm text-text4 mb-8">
            <hr className="border-border2 my-4" />
            <p>{t("smartWalletN1Tip1")}</p>
            <p>{t("smartWalletN1Tip2")}</p>
          </div>
        </ShowIf>
        <button
          className="btn btn-primary w-full mt-4"
          disabled={isMutating}
          onClick={() => {
            trigger(
              {
                outputToken: tabsValue,
                newVersion: newVersion as unknown as boolean,
                amount: Number(withDrawNum),
              },
              {
                onSuccess: () => {
                  toast.success(t("操作成功"));
                  setOpenWithdraw(false);
                  initFn?.();
                },
              },
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
