"use client";
import Image from "next/image";
import { PropsWithChildren, useEffect, useState } from "react";

type IProps = PropsWithChildren<{}>;
export const Launch = ({ children }: IProps) => {
  const [showSplash, setShowSplash] = useState(false);
  const [isMount, setIsMount] = useState(false);

  const showSplashFunction = () => {
    setShowSplash(true);
    setTimeout(() => {
      // sessionStorage.setItem("splashSeen", "true");
      setShowSplash(false);
    }, 2000);
  };

  useEffect(() => {
    showSplashFunction();
    // const hasSeen = sessionStorage.getItem("splashSeen") === "true";
    // if (!hasSeen) {
    // showSplashFunction()
    // }
    setIsMount(true);
  }, []);
  if (!isMount) return null;
  if (showSplash) {
    return (
      <div className="size-full bg-white flex justify-center items-center">
        <div className="w-1/2 h-full relative">
          <Image
            className="animate-in zoom-in duration-2000 ease-in-out"
            src="/images/common/logo.svg"
            alt="Logo"
            fill
            unoptimized
          />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
