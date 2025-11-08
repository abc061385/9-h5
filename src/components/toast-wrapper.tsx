"use client";
import toast, { Toaster } from "react-hot-toast";

export function ToastWrapper() {
  return <Toaster position="top-center" />;
}

export const blankToast = (message: string) => {
  toast(message, { style: { background: "#333", color: "#fff" } });
};
