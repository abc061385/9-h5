import BaseImage from "@/components/base-image";
import { Icon } from "@/components/icon";
import { routerMap, useRouter } from "@/i18n/navigation";

const HomeHeaderBox = () => {
  const { push } = useRouter();
  return (
    <div className="flex items-center justify-between py-2 px-3.5 bg-white">
      <BaseImage
        src="/images/common/logo.svg"
        className="h-[31px] w-[91px]"
        onClick={() => push(routerMap.user)}
      />
      <div className="flex">
        <Icon
          className="size-11"
          name="ai-icon"
          onClick={() => push(routerMap["helper-ai"])}
        />
        <Icon
          className="size-11"
          name="ling-dang"
          onClick={() => push(routerMap.news)}
        />
      </div>
    </div>
  );
};
export default HomeHeaderBox;
