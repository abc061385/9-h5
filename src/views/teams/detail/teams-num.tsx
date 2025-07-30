import { api } from "@/api";
import { useRequestMutation } from "@/hooks/useRequestMutation";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { useTrans } from "@/hooks/useTrans";
import { cn } from "@/lib/utils";
import StarIcon from "@/views/vip/star-icon";
import { useEffect, useState } from "react";

interface AreaData {
  area: string;
  topMemberId: number;
}

interface AreaStatData {
  count: number;
  star: number;
  vipLevel: number;
}

const TeamsNumBox = () => {
  const t = useTrans();

  const [tabsValue, setTabsValue] = useState(0);
  const [areaList, setAreaList] = useState<AreaData[]>([]);
  const [areaStatList, setAreaStatList] = useState<AreaStatData[]>([]);

  const { data } = useRequestQuery(api.member.memberTeamAreaUsingGet, {});

  const { trigger } = useRequestMutation(api.member.memberTeamAreaStatUsingGet);

  useEffect(() => {
    if (!data?.data?.length) return;
    setAreaList(data?.data as AreaData[]);
  }, [data]);

  useEffect(() => {
    trigger(
      {
        topMemberId: tabsValue || undefined,
      },
      {
        onSuccess: ({ data }) => {
          setAreaStatList((data as AreaStatData[]) || []);
        },
      }
    );
  }, [tabsValue, trigger]);

  return (
    <div>
      <div
        role="tablist"
        className="tabs tabs-border mb-4 h-10 overflow-x-auto flex flex-nowrap no-scrollbar text-xs"
      >
        <a
          role="tab"
          style={{ minWidth: "max-content" }}
          className={cn(
            "tab flex-1 leading-[100%]",
            tabsValue === 0 && "tab-active text-primary "
          )}
          key={0}
          onClick={() => setTabsValue(0)}
        >
          {t("withdraw.useAll")}
        </a>
        {areaList.map((tab) => (
          <a
            role="tab"
            style={{ minWidth: "max-content" }}
            className={cn(
              "tab flex-1 leading-[100%]",
              tab.topMemberId === tabsValue && "tab-active text-primary "
            )}
            key={tab.topMemberId}
            onClick={() => setTabsValue(tab.topMemberId)}
          >
            {tab.area}
            {t("区")}
          </a>
        ))}
      </div>
      <div>
        <h3 className="flex items-center font-bold text-xs">
          <span className="flex-1 text-center">{t("级别")}</span>
          <span className="flex-1 text-center">{t("人数")}</span>
        </h3>
        {areaStatList?.map((v, i) => {
          return (
            <div key={i} className="flex items-center text-xs mt-4">
              <span className="flex-1 text-center flex items-center justify-center gap-1">
                {"VIP" + v.vipLevel}
                <StarIcon level={v.vipLevel} star={v.star} />
              </span>
              <span className="flex-1 text-center">{v.count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default TeamsNumBox;
