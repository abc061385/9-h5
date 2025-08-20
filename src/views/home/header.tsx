import BaseImage from "@/components/base-image";
import { Icon } from "@/components/icon";
import { routerMap, useRouter } from "@/i18n/navigation";
import Platform from "@/lib/platfrom";

const HomeHeaderBox = () => {
  const { push } = useRouter();
  const handleCustomerSupport = () => {
    if (Platform.isDesktop()) {
      window?.ssq?.push("chatOpen");
    } else {
      push(routerMap["customer-support"]);
    }
  };
  return (
    <div className="flex items-center justify-between py-2 px-3.5 bg-white">
      <BaseImage
        src="/images/common/logo.svg"
        className="h-[31px] w-[91px] cursor-pointer"
        onClick={() => push(routerMap.user)}
      />
      <div className="flex">
        <Icon
          className="size-11 cursor-pointer"
          name="ai-icon"
          onClick={handleCustomerSupport}
        />
        <Icon
          className="size-11 cursor-pointer"
          name="ling-dang"
          onClick={() => push(routerMap.news)}
        />
      </div>
    </div>
  );
};
export default HomeHeaderBox;
