"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export default function SmoothScrolling({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothTouch: false,
      normalizeWheel: true,
      wheelMultiplier: 1,
      infinite: false,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    const startLenis = () => {
      document.body.classList.remove("scroll-locked");
      lenis.start();
    };

    if (document.readyState === "complete") {
      startLenis();
    } else {
      window.addEventListener("load", startLenis);
    }

    window.lenisCustomStart = startLenis;

    window.lenisCustomStop = function () {
      document.body.classList.add("scroll-locked");
      lenis.stop();
    };

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("load", startLenis);
      lenis.destroy();
    };
  }, []);

  return children;
}