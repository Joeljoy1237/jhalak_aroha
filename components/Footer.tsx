"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in main container
      gsap.from(containerRef.current, {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Stagger links
      gsap.from(".footer-link-group", {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 70%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });

      // Big Title Reveal
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 70%",
        },
        yPercent: 50,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#0A0A0A] text-white pt-32 pb-12 px-6 overflow-hidden border-t border-white/5 selection:bg-[#BA170D] selection:text-white"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[400px] bg-[#BA170D]/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-blue-900/5 rounded-full blur-[150px] mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.04]"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] pointer-events-none opacity-30"></div>

      <div ref={containerRef} className="container mx-auto relative z-10">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24">
          {/* Brand / CTA */}
          <div className="max-w-xl space-y-8">
            <h3 className="text-4xl md:text-6xl font-light leading-tight tracking-tight">
              Ready to{" "}
              <span className="text-[#BA170D] font-cinzel font-bold">
                ignite
              </span>{" "}
              <br />
              the stage?
            </h3>
            <Link
              href="https://www.graburpass.com/e/S6wHPW"
              target="_blank"
              className="inline-flex items-center gap-4 group"
            >
              <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#BA170D] group-hover:border-[#BA170D] transition-all duration-300 bg-white/5 backdrop-blur-sm shadow-lg group-hover:shadow-[#BA170D]/20">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transform group-hover:-rotate-45 transition-transform duration-300"
                >
                  <path
                    d="M5 12H19"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 5L19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-xl tracking-widest uppercase font-light group-hover:text-[#BA170D] transition-all duration-300">
                Register Now
              </span>
            </Link>
          </div>

          {/* Links Columns */}
          <div className="flex-1 w-full lg:w-auto flex flex-wrap justify-start lg:justify-end gap-16 lg:gap-32">
            {/* Explore */}
            <div className="footer-link-group flex flex-col space-y-6">
              <h4 className="text-gray-500 uppercase tracking-widest text-xs font-bold mb-2">
                Explore
              </h4>
              <div className="flex flex-col space-y-4">
                {["Home", "Events", "Schedule", "Sponsors"].map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors w-fit text-sm tracking-wide hover:translate-x-1 duration-300 inline-block"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div className="footer-link-group flex flex-col space-y-6">
              <h4 className="text-gray-500 uppercase tracking-widest text-xs font-bold mb-2">
                Follow Us
              </h4>
              <div className="flex flex-col space-y-4">
                <Link
                  href="#"
                  className="text-gray-300 hover:text-[#BA170D] transition-colors text-sm flex items-center gap-2 group"
                >
                  Instagram
                  <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    ↗
                  </span>
                </Link>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-[#BA170D] transition-colors text-sm flex items-center gap-2 group"
                >
                  YouTube
                  <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    ↗
                  </span>
                </Link>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-[#BA170D] transition-colors text-sm flex items-center gap-2 group"
                >
                  Twitter
                  <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    ↗
                  </span>
                </Link>
              </div>
            </div>

            {/* Contact - Added for balance */}
            <div className="footer-link-group flex flex-col space-y-6">
              <h4 className="text-gray-500 uppercase tracking-widest text-xs font-bold mb-2">
                Contact
              </h4>
              <div className="flex flex-col space-y-4">
                <a
                  href="mailto:contact@jhalak.com"
                  className="text-gray-300 hover:text-[#BA170D] transition-colors text-sm"
                >
                  contact@jhalak.com
                </a>
                <a
                  href="tel:+919876543210"
                  className="text-gray-300 hover:text-[#BA170D] transition-colors text-sm"
                >
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12"></div>

        {/* Bottom Section: Massive Text */}
        <div className="relative overflow-hidden mb-8 group">
          <h1
            ref={titleRef}
            className="text-[12vw] md:text-[14vw] font-cinzel font-black leading-none text-center tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#333] to-transparent select-none pointer-events-none opacity-50 group-hover:opacity-70 transition-opacity duration-700"
          >
            JHALAK '26
          </h1>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs md:text-sm text-gray-500 uppercase tracking-widest font-mono">
          <span className="order-2 md:order-1">© 2026 Carmel College</span>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="order-1 md:order-2 hover:text-[#BA170D] transition-colors cursor-pointer flex items-center gap-2 group/btn"
          >
            Back to Top
            <div className="p-1 rounded-full border border-white/10 group-hover/btn:border-[#BA170D] transition-colors">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover/btn:-translate-y-0.5 transition-transform"
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </div>
          </button>

          <span className="order-3">
            Made with <span className="text-[#BA170D] animate-pulse">♥</span> by
            404
          </span>
        </div>
      </div>
    </footer>
  );
}
