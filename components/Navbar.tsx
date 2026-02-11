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
        duration: 1,
        ease: "power3.out",
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
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-8 py-3 flex items-center shadow-2xl transition-all duration-300 hover:border-[#BA170D]/30 hover:shadow-[#BA170D]/20">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-cinzel font-bold tracking-tighter shrink-0 hover:scale-105 transition-transform duration-300 flex items-center gap-1 group"
        >
          <span className="text-white group-hover:text-gray-200 transition-colors">
            JHALAK
          </span>
          <span className="text-[#BA170D] group-hover:drop-shadow-[0_0_8px_rgba(186,23,13,0.8)]">
            .
          </span>
        </Link>
      </div>
    </nav>
  );
}
