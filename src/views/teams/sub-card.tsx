import BaseImage from "@/components/base-image";
import { Icon } from "@/components/icon";
import { routerMap, useRouter } from "@/i18n/navigation";
import { formatBalance } from "@/lib/utils";
import { FC } from "react";
import StarIcon from "../vip/star-icon";
import { useTrans } from "@/hooks/useTrans";

interface ISubCardProps {
  data?: TeamDirectReferralAreaType;
}

const SubCardBox: FC<ISubCardProps> = ({ data }) => {
  const { push } = useRouter();
  const t = useTrans();
  return (
    <div
      className="rounded-lg bg-bg1 p-4 mb-2 last:mb-0"
      onClick={() => push(`${routerMap.teamsInformation}?id=${data?.id}`)}
    >
      <div className="flex justify-between items-center flex-wrap gap-2 font-bold mb-4">
        <BaseImage
          src={data?.headUrl || "/icons/user-head.svg"}
          className="size-8 rounded-full overflow-hidden"
        />
        <span className="max-w-[60%] break-words">
          {data?.nickname || "--"}
        </span>
        <div className="py-1 px-1.5 bg-primary rounded-sm text-white text-xs flex gap-2">
          V{data?.vipLevel || "0"}
          <StarIcon level={data?.vipLevel || 0} star={data?.star || 0} />
        </div>
        {/* <div className="badge badge-primary2 h-auto py-1 px-1.5 rounded-sm text-xs">
          Area A
        </div> */}

        <div className="flex-1"></div>
        <Icon name="right-enter" className="w-1.5 h-2.5" color="#FFF" />
      </div>
      <div className="text-sm flex items-center justify-between">
        <span className="text-text4">{t("totalTeamInvestment")}</span>
        <span>≈ {formatBalance(data?.totalTeamInvestment || 0, 4)} USDT</span>
      </div>
      <div className="text-sm flex items-center justify-between mt-1">
        <span className="text-text4">{t("totalTeamMembers")}</span>
        <span>{data?.totalTeamMembers || 0}</span>
      </div>
    </div>
  );
};
export default SubCardBox;
