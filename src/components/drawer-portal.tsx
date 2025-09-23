"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface DrawerPortalProps {
  children: ReactNode;
}

export function DrawerPortal({ children }: DrawerPortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(children, document.body);
}
