"use client";

import {usePathname} from "next/navigation";

import Animations from "@/providers/Animations";
import SmoothScrolling from "@/providers/SmoothScrolling";
import Footer from "@/components/layout/Footer";

export default function SiteShell({children}) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <SmoothScrolling>
      <Animations>
        {children}
        <Footer />
      </Animations>
    </SmoothScrolling>
  );
}
