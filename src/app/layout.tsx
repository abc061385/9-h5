import { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <>{children}</>
    </>
  );
}

export const metadata = {
  icons: {
    icon: "/favicon.svg", // 相对 public 路径
  },
};
