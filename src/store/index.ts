import { create } from "zustand";
import { devtools } from "zustand/middleware";

type StoreState = {};

export const useStore = create<StoreState>()(devtools(() => ({})));
