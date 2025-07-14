import { create } from "zustand";

interface LoginState {
  email: string;
  code: string;
  setEmail: (v: string) => void;
  setCode: (v: string) => void;
  reset: () => void;
}

export const useLoginStore = create<LoginState>((set) => ({
  email: "",
  code: "",
  setEmail: (v) => set({ email: v }),
  setCode: (v) => set({ code: v }),
  reset: () => set({ email: "", code: "" }),
}));
