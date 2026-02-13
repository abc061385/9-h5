import { useTrans } from "@/hooks/useTrans";
import BaseImage from "@/components/base-image";
import StarIcon from "../vip/star-icon";
import { useUserStore } from "@/store/useUserStore";
import { FC, useState } from "react";
import { useFormatBalance } from "@/hooks/useFormatBalance";
import { Icon } from "@/components/icon";
import { Modal } from "@/components/modal";

interface IUpgradeProps {
  tabsValue: string;
  info: AwardInfoType;
}

const VipBannerBox: FC<IUpgradeProps> = ({ tabsValue, info }) => {
  const t = useTrans();
  const { formatBalance } = useFormatBalance();

  const userInfo = useUserStore((s) => s.userInfo);

  const [earningsOpen, setEarningsOpen] = useState(false);

  return (
    <div className="flex justify-between border-t border-border2 my-6 pt-6 relative">
      <div>
        <h4 className="text-sm">{t("当前等级")}</h4>
        <div className="text-2xl font-bold leading-6 mt-1 mb-4 flex items-center">
          {userInfo.vipLevel === 0 ? (
            t("user.normalUser")
          ) : (
            <>
              <span className="mr-1">VIP{userInfo.vipLevel}</span>
              <StarIcon star={userInfo.star} level={userInfo.vipLevel || 0} />
            </>
          )}
        </div>
        <div className="text-sm flex items-center relative z-[1]">
          <span className="text-xs text-text2 mr-2">
            {t("vipEarningsLimit")}
          </span>
          <span className="text-text1">
            {formatBalance(info?.coinQuotaStats?.totalQuota || 0, "USDT")}
            USDT
          </span>
          <Icon
            name="annotation"
            className="size-3 ml-2"
            onClick={() => setEarningsOpen(true)}
          />
        </div>
        <div className="text-sm">
          <span className="text-xs text-text2 mr-2">{t("昨日VIP奖励")}</span>
          <span className="text-primary">
            {formatBalance(info?.yesterdayVipReward || 0, tabsValue)}{" "}
            {tabsValue}
          </span>
        </div>
      </div>
      <BaseImage
        src={`/images/vip/icon-vip${userInfo.vipLevel}.png`}
        className="w-[124px] h-[112px] absolute right-0"
      />
      <Modal
        title={t("vipEarningsLimit")}
        open={earningsOpen}
        onClose={() => setEarningsOpen(false)}
      >
        <p className="text-sm mt-4 w-62 text-center mx-auto">
          {t("excludedEarningsNote")}
        </p>
      </Modal>
    </div>
  );
};
export default VipBannerBox;
