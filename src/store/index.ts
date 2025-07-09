import { create } from "zustand";
import { createAppSlice, AppSlice } from "./slices/app";
import { devtools } from "zustand/middleware";

type StoreState = AppSlice;

export const useStore = create<StoreState>()(
  devtools((...a) => ({
    ...createAppSlice(...a),
  })),
);
