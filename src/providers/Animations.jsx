"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { initAnimations } from "@/animations/initAnimations";

export default function Animations({ children }) {
  const rootRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!rootRef.current) return;

    const cleanup = initAnimations(rootRef.current);

    return () => {
      cleanup?.();
    };
  }, [pathname]);

  return <div ref={rootRef}>{children}</div>;
}
