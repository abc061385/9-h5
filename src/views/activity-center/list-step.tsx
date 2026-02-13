import BaseImage from "@/components/base-image";
import { Icon } from "@/components/icon";
import { useTrans } from "@/hooks/useTrans";
import { routerMap, useRouter } from "@/i18n/navigation";
import { createAxiosInstance, ApiResponse } from "@/lib/axios";
import { useCallback, useEffect, useState } from "react";

const ListStepBox = () => {
  const t = useTrans();
  const api = createAxiosInstance("/app");
  const { push } = useRouter();

  const [list, setList] = useState<ActivityAllListType[]>();

  const getList = useCallback(async () => {
    try {
      const res: ApiResponse<ActivityAllListType[]> = await api.get(
        "/global-activity/global-studio/list"
      );
      if (res.code === 200) {
        setList(res.data || []);
      }
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getList();
  }, [getList]);

  return (
    <div className="mt-10">
      <h2 className="text-lg font-medium leading-6 text-center mb-6">
        {t("globalStudioDistribution")}
      </h2>
      {list?.map((v) => {
        return (
          <div className="pb-6 last:pb-0 flex gap-3 relative" key={v.countryId}>
            <div className="flex flex-col items-center">
              <input
                type="radio"
                className="radio radio-primary radio-custom"
                checked={Boolean(v.establishTime)}
              />
              <div
                className="w-[1px] bg-text3 absolute top-4.5"
                style={{ height: "calc(100% - 18px)" }}
              ></div>
            </div>
            <dl className="flex-1">
              <dt className="mb-4">
                {v.establishTime || (
                  <span className="text-text5">{t("underConstruction")}…</span>
                )}
              </dt>
              <dd
                className="bg-bg4 p-4 rounded-lg flex gap-4"
                onClick={() => {
                  push(`${routerMap.meetingMinutes}?id=${v.countryId}`);
                }}
              >
                <BaseImage
                  src={v.flagUrl}
                  className="size-10 rounded-full overflow-hidden"
                />
                <div className="flex-1">
                  <h4 className="font-medium leading-6 flex justify-between items-center">
                    {v.holdCountry}
                    <Icon name="right-enter" className="w-1.5 h-2.5" color="var(--color-text1)"/>
                  </h4>
                  <p className="leading-5 text-sm mt-2 line-clamp-2">
                    {v.description}
                  </p>
                </div>
              </dd>
            </dl>
          </div>
        );
      })}
    </div>
  );
};
export default ListStepBox;
