"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import Eyebrow from "@/components/ui/Eyebrow";

export default function FaqSection({
  id = "faq",
  
  title = "Helpful answers before you reach out",
  description = "Everything you need to know about the process, timing, and what comes next after your message.",
  items = [],
  defaultOpenIndex = 0,
  className = "",
}) {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex >= 0 ? defaultOpenIndex : 0);
  const panelRefs = useRef([]);
  const contentRefs = useRef([]);

  useEffect(() => {
    panelRefs.current.forEach((panel, index) => {
      const content = contentRefs.current[index];

      if (!panel || !content) return;

      const isOpen = index === openIndex;

      gsap.set(panel, { height: 0, opacity: 0, overflow: "hidden" });

      if (isOpen) {

        gsap.to(panel, {
          height: "auto",
          opacity: 1,
          duration: 0.5,

        });
      } else {
        gsap.to(panel, {
          height: 0,
          opacity: 0,
          duration: 0.4,
     
        });
      }
    });
  }, [openIndex, items]);

  const handleToggle = (index) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  return (
    <section id={id} className={`bg-white py-16 md:py-24 ${className}`.trim()}>
      <div className="padding-global">
        <div className="container-xlarge flex flex-col gap-10">
          <div className="mx-auto flex flex-col items-center gap-4 text-center">
      
            <h2 className="heading-h3 max-w-lg">{title}</h2>
            <p className="max-w-108 text-body text-black/60">{description}</p>
          </div>

          <div className="flex flex-col gap-4">
            {items.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <details
                  key={item.question || `faq-${index}`}
                  open={openIndex === index}
                  className="rounded-xl border border-black/10"
                  onToggle={(event) => {
                    if (event.currentTarget.open) {
                      handleToggle(index);
                    } else if (openIndex === index) {
                      setOpenIndex(-1);
                    }
                  }}
                >
                  <summary className="flex cursor-pointer p-5 list-none items-center justify-between gap-4 text-base font-semibold text-black md:text-lg">
                    <span>{item.question}</span>
                    <span className="text-xl text-black/60">{isOpen ? "−" : "+"}</span>
                  </summary>

                  <div
                    ref={(node) => {
                      panelRefs.current[index] = node;
                    }}
                    className="overflow-hidden"
                  >
                    <div
                      ref={(node) => {
                        contentRefs.current[index] = node;
                      }}
                      className="p-4 text-body text-black/65"
                    >
                      {item.answer}
                    </div>
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
