import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const fadeAnimations = [
  "fade-up",
  "fade-in-up",
  "fade-in-bottom",
  "fade-in-left",
  "fade-in-right",
];

const childAnimations = [
  "child-fade-up",
  "child-fade-in-up",
  "child-fade-in-bottom",
  "child-fade-in-left",
  "child-fade-in-right",
];

const createScrollTrigger = (element) => ({
  trigger: element,
  start: "top 90%",
});

const splitHeading = (element) => {
  const text = element.textContent?.trim();

  if (!text) return [];

  element.setAttribute("aria-label", text);
  element.textContent = "";

  const characters = [];
  const words = text.split(" ");

  words.forEach((word, wordIndex) => {
    const wordElement = document.createElement("span");
    wordElement.setAttribute("aria-hidden", "true");
    wordElement.style.display = "inline-block";
    wordElement.style.whiteSpace = "nowrap";
    wordElement.style.overflow = "hidden";

    Array.from(word).forEach((character) => {
      const characterElement = document.createElement("span");
      characterElement.dataset.fdChar = "";
      characterElement.textContent = character;
      characterElement.style.display = "inline-block";
      wordElement.appendChild(characterElement);
      characters.push(characterElement);
    });

    element.appendChild(wordElement);

    if (wordIndex < words.length - 1) {
      element.appendChild(document.createTextNode(" "));
    }
  });

  return characters;
};

export const initAnimations = (container) => {
  const splitElements = [];

  const context = gsap.context(() => {
    fadeAnimations.forEach((animationName) => {
      const elements = container.querySelectorAll(`[fd-animate="${animationName}"]`);

      elements.forEach((element, index) => {
        gsap.to(element, {
          x: 0,
          y: 0,
          autoAlpha: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: createScrollTrigger(element),
          delay: index * 0.08,
        });
      });
    });

    childAnimations.forEach((animationName) => {
      const elements = container.querySelectorAll(`[fd-animate="${animationName}"]`);

      elements.forEach((element) => {
        const children = Array.from(element.children);

        if (!children.length) return;

        gsap.to(children, {
          x: 0,
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power4.out",
          stagger: 0.12,
          scrollTrigger: createScrollTrigger(element),
        });
      });
    });

    const headings = container.querySelectorAll('[fd-animate="heading-anime"]');

    headings.forEach((element) => {
      splitElements.push({
        element,
        html: element.innerHTML,
      });

      const characters = splitHeading(element);

      if (!characters.length) return;

      gsap.to(characters, {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "power4.out",
        stagger: 0.025,
        scrollTrigger: createScrollTrigger(element),
      });
    });
  }, container);

  ScrollTrigger.refresh();

  return () => {
    context.revert();

    splitElements.forEach(({ element, html }) => {
      element.innerHTML = html;
      element.removeAttribute("aria-label");
    });
  };
};
