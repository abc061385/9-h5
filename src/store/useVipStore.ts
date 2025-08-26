import { api } from "@/api";
import { getIsDev } from "@/lib/utils";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { useUserStore } from "./useUserStore";

interface VipState extends BaseState<VipState> {
  currentLevelInfo: VipInfoType;
  nextLevelInfo: VipInfoType;
  currentStartConfig: NextStarConfig;
  nextStartConfig: NextStarConfig;
  fetchNextLevel: () => Promise<void>;
  fetchNextConfig: () => Promise<void>;
}

export const useVipStore = create<VipState>()(
  devtools(
    (set) => {
      return {
        currentLevelInfo: {},
        nextLevelInfo: {},
        currentStartConfig: {},
        nextStartConfig: { teamVipCount: 0 },
        fetchNextLevel: async () => {
          const userInfo = useUserStore.getState().userInfo;
          try {
            const { data } = await api.memberVipLevelConfig.listUsingGet1({});
            if (userInfo.vipLevel === null || userInfo.vipLevel === undefined)
              return;
            if (userInfo.vipLevel < 9) {
              set(() => ({
                currentLevelInfo: data.find(
                  (v: VipInfoType) => v.vipLevel === userInfo.vipLevel,
                ),
                nextLevelInfo: data.find(
                  (v: VipInfoType) =>
                    v.vipLevel === Number(userInfo.vipLevel || 0) + 1,
                ),
              }));
            } else {
              const info = data.find((v: VipInfoType) => v.vipLevel === 9);
              set(() => ({
                currentLevelInfo: info,
                nextLevelInfo: info,
              }));
            }
          } catch {}
        },
        fetchNextConfig: async () => {
          const userInfo = useUserStore.getState().userInfo;

          const { data } = await api.memberVipLevelStartConfig.listUsingGet2(
            {},
          );
          set(() => ({
            currentStartConfig: data.find(
              (item: NextStarConfig) => item.star === userInfo.star,
            ),
            nextStartConfig: data.find(
              (item: NextStarConfig) =>
                item.star === Number(userInfo.star || 0) + 1,
            ),
          }));
        },
        setField: (key, value) => set({ [key]: value }),
      };
    },
    { enabled: getIsDev() },
  ),
);
