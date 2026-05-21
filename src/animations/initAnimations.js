import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initAnimations = (container) => {
  const fadeUps = container.querySelectorAll(
    '[fd-animate="fade-up"]'
  );

  fadeUps.forEach((element, index) => {
    gsap.from(element, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",

      scrollTrigger: {
        trigger: element,
        start: "top 90%",
      },

      delay: index * 0.1,
    });
  });
};