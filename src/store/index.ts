import { create } from "zustand";
import { useUserStore } from "./useUserStore";

type RootStore = {
  initLoading: boolean;
  lang: string;
  initRoot: () => void;
  setLang: (lang: string) => void;
};

export type AppStore = RootStore;

export const useStore = create<AppStore>()((set) => ({
  initLoading: false,
  lang: "en",
  setLang(lang: string) {
    set(() => ({
      lang,
    }));
  },
  async initRoot() {
    if (typeof window !== "undefined") {
      // useUserStore
      //   .getState()
      //   .setField("token", window.localStorage.getItem("token") || "");
    }
    try {
      set({ initLoading: true });
      await useUserStore.getState().fetchUserInfo();
      set({ initLoading: false });
    } catch {
      set({ initLoading: false });
    }
  },
}));
