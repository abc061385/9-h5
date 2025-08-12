import Script from "next/script";
import { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Script
        src="https://plugin-code.salesmartly.com/js/project_315109_323721_1745570348.js"
        strategy="afterInteractive"
      />
      <>{children}</>
    </>
  );
}

export const metadata = {
  icons: {
    icon: "/favicon.svg", // 相对 public 路径
  },
};
