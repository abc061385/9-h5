import BaseImage from "@/components/base-image";
import { Icon } from "@/components/icon";
import { routerMap, useRouter } from "@/i18n/navigation";

const HomeHeaderBox = () => {
  const { push } = useRouter();
  return (
    <div className="flex items-center justify-between py-4 px-3.5">
      <BaseImage
        src="/images/common/logo.svg"
        className="h-[31px] w-[91px]"
        onClick={() => push(routerMap.user)}
      />
      <div className="flex gap-4">
        <Icon name="ling-dang" onClick={() => push(routerMap.news)} />
        <Icon name="ai-icon" onClick={() => push(routerMap["helper-ai"])} />
      </div>
    </div>
  );
};
export default HomeHeaderBox;
