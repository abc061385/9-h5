import { StateCreator } from "zustand";

export interface AppSlice {
  showLayoutDock: boolean;
  setShowLayoutDock: (showLayoutDock: boolean) => void;
}
export const createAppSlice: StateCreator<AppSlice> = (set) => ({
  showLayoutDock: false,
  setShowLayoutDock: (showLayoutDock) => set({ showLayoutDock }),
});
