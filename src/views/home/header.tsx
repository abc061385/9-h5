import { api } from "@/api";
import BaseImage from "@/components/base-image";
import { Icon } from "@/components/icon";
import { useRequestQuery } from "@/hooks/useRequestQuery";
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
  const { data } = useRequestQuery(api.getMemberMessageUnreadCount, {});
  return (
    <div className="flex items-center justify-between py-2 px-3.5 bg-white">
      <BaseImage
        src="/images/common/logo.svg"
        className="h-[34px] w-[90px] cursor-pointer"
        onClick={() => push(routerMap.user)}
      />
      <div className="flex">
        <Icon
          className="size-11 cursor-pointer"
          name="ai-icon"
          onClick={handleCustomerSupport}
        />
        <div className="inline-block relative">
          <Icon
            className="size-11 cursor-pointer"
            name="ling-dang"
            onClick={() => push(routerMap.news)}
          />

          {data?.data ? (
            <div
              aria-label="error"
              className="status status-error absolute top-2 right-2 bg-[#FF0A52]"
            ></div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default HomeHeaderBox;
