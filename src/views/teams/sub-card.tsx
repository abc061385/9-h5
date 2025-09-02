import BaseImage from "@/components/base-image";
import { Icon } from "@/components/icon";
import { routerMap, useRouter } from "@/i18n/navigation";

const SubCardBox = () => {
  const { push } = useRouter();
  return (
    <div
      className="rounded-lg bg-bg2 p-4 mb-2 last:mb-0"
      onClick={() => push(routerMap.teamsInformation)}
    >
      <div className="flex justify-between items-center gap-2 font-bold mb-4">
        <BaseImage src="/icons/user-head.svg" className="size-8" />
        <span>9M****05</span>
        <div className="py-1 px-1.5 bg-primary rounded-sm text-white text-xs">
          V5
        </div>
        <div className="badge badge-primary2 h-auto py-1 px-1.5 rounded-sm text-xs">
          Area A
        </div>

        <div className="flex-1"></div>
        <Icon name="right-enter" className="w-1.5 h-2.5" />
      </div>
      <div className="text-sm flex items-center justify-between">
        <span className="text-text4">Total Team Investment</span>
        <span>≈ 32,952,238.31 USDT</span>
      </div>
      <div className="text-sm flex items-center justify-between mt-1">
        <span className="text-text4">Total Team Members</span>
        <span>442</span>
      </div>
    </div>
  );
};
export default SubCardBox;
