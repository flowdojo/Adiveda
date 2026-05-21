"use client";

import { useState } from "react";
import ButtonA from "@/components/ui/ButtonA";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);

    if (!isOpen) {
      window.lenisCustomStop();
    } else {
      window.lenisCustomStart();
    }
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full py-6">
      <div className="padding-global">
        <div className="container-xlarge">
          <div className=" flex items-center justify-between">
            {/* LOGO */}
            <a href="/" className="heading-h6">
              Flowdojo
            </a>

            {/* DESKTOP NAV */}
            <nav className="hidden items-center gap-8 md:flex">
              <a href="/" className="hover:text-primary transition-colors">Home</a>
              <a href="/about" className="hover:text-primary transition-colors">About</a>
              <a href="#" className="hover:text-primary transition-colors">Work</a>
              <a href="/contact" className="hover:text-primary transition-colors">Contact</a>

              <ButtonA href="/contact" text="Let's Talk" />
            </nav>

            {/* MOBILE BUTTON */}
            <button
              onClick={toggleMenu}
              className="relative z-[60] flex h-12 w-12 items-center justify-center md:hidden"
            >
              <div className="relative flex h-5 w-6 flex-col justify-between">
                <span
                  className={`block h-[2px] w-full bg-black transition-all duration-300 ${
                    isOpen ? "translate-y-[9px] rotate-45" : ""
                  }`}
                />

                <span
                  className={`block h-[2px] w-full bg-black transition-all duration-300 ${
                    isOpen ? "opacity-0" : ""
                  }`}
                />

                <span
                  className={`block h-[2px] w-full bg-black transition-all duration-300 ${
                    isOpen ? "-translate-y-[9px] -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`fixed left-0 top-0 z-40 flex h-screen w-full items-center justify-center bg-white transition-all duration-500 md:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col items-center gap-8 text-center">
          <a href="/" className="heading-h3 hover:text-primary transition-colors" onClick={toggleMenu}>
            Home
          </a>

          <a href="/about" className="heading-h3 hover:text-primary transition-colors" onClick={toggleMenu}>
            About
          </a>

          <a href="#" className="heading-h3 hover:text-primary transition-colors" onClick={toggleMenu}>
            Work
          </a>

          <a href="/contact" className="heading-h3 hover:text-primary transition-colors" onClick={toggleMenu}>
            Contact
          </a>

          <ButtonA href="/contact" text="Let's Talk" className="mt-4" onClick={toggleMenu} />
        </nav>
      </div>
    </header>
  );
}
