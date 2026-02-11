"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2,
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div className="relative group">
        {/* Animated Gradient Border */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

        <div className="relative bg-[#0A0A0A]/60 backdrop-blur-md border border-white/10 rounded-full px-8 py-3 flex items-center shadow-2xl transition-all duration-300 hover:border-white/20 hover:bg-[#0A0A0A]/80">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-cinzel font-bold tracking-tighter shrink-0 hover:scale-105 transition-transform duration-300 flex items-center gap-1 group/logo"
          >
            <span className="text-white group-hover/logo:text-gray-200 transition-colors">
              JHALAK
            </span>
            <span className="text-[#BA170D] group-hover/logo:drop-shadow-[0_0_8px_rgba(186,23,13,0.8)]">
              .
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
