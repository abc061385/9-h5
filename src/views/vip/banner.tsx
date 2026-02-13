import { useTrans } from "@/hooks/useTrans";
import BaseImage from "@/components/base-image";
import StarIcon from "./star-icon";
import { useUserStore } from "@/store/useUserStore";
import { useFormatBalance } from "@/hooks/useFormatBalance";

const VipBannerBox = () => {
  const t = useTrans();
  const userInfo = useUserStore((s) => s.userInfo);

  const { formatBalance } = useFormatBalance();

  return (
    <div className="flex items-center justify-between border-b border-border2 pb-3">
      <div className="flex-1">
        <h2 className="text-text2 text-sm mb-1">{t("目前团队投资总额")}</h2>
        <div className="font-bold text-2xl">
          {formatBalance(userInfo?.totalTeamInvestment || 0, "USDT")} USDT
        </div>
        <div className="flex items-center gap-2 mt-6">
          <span className="text-sm">{t("当前等级")}</span>
          <div className="flex items-center text-sm font-bold">
            {userInfo.vipLevel === 0 ? (
              t("user.normalUser")
            ) : (
              <>
                <span className="mr-1">VIP{userInfo.vipLevel}</span>
                <StarIcon star={userInfo.star} level={userInfo.vipLevel || 0} />
              </>
            )}
          </div>
        </div>
      </div>

      <BaseImage
        src={`/images/vip/icon-vip${userInfo.vipLevel}.png`}
        className="w-[124px] h-[112px]"
      />
    </div>
  );
};
export default VipBannerBox;
