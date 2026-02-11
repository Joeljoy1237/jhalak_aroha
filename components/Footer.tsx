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
          start: "top 60%",
        },
        yPercent: 100,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#050505] text-white pt-32 pb-12 px-6 overflow-hidden border-t border-white/5"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[400px] bg-[#BA170D]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div ref={containerRef} className="container mx-auto relative z-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
          {/* Brand / CTA */}
          <div className="max-w-2xl space-y-8">
            <h3 className="text-4xl md:text-6xl font-light leading-tight">
              Ready to{" "}
              <span className="text-[#BA170D] font-cinzel font-bold">
                ignite
              </span>{" "}
              <br />
              the stage?
            </h3>
            <Link href="#" className="inline-flex items-center gap-4 group">
              <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#BA170D] group-hover:border-[#BA170D] transition-all duration-300">
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
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 5L19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-xl tracking-wide uppercase group-hover:tracking-wider transition-all duration-300">
                Register Now
              </span>
            </Link>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
            {/* Explore */}
            <div className="footer-link-group flex flex-col space-y-6">
              <h4 className="text-gray-500 uppercase tracking-widest text-sm mb-2">
                Explore
              </h4>
              {["Home", "Events", "Schedule", "Sponsors"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-lg hover:text-[#BA170D] transition-colors w-fit group"
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Contact */}
            <div className="footer-link-group flex flex-col space-y-6">
              <h4 className="text-gray-500 uppercase tracking-widest text-sm mb-2">
                Contact
              </h4>
              <a
                href="mailto:jhalak@carmel.ac.in"
                className="text-lg hover:text-[#BA170D] transition-colors break-words"
              >
                jhalak@carmel.ac.in
              </a>
              <p className="text-gray-400 text-sm leading-relaxed">
                CCET, Punnapra <br /> Alappuzha, Kerala
              </p>
            </div>

            {/* Socials - Icons */}
            <div className="footer-link-group flex flex-col space-y-6">
              <h4 className="text-gray-500 uppercase tracking-widest text-sm mb-2">
                Follow Us
              </h4>
              <div className="flex gap-4">
                {/* Instagram */}
                <Link
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#BA170D] hover:text-white transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </Link>
                {/* YouTube */}
                <Link
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#BA170D] hover:text-white transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12"></div>

        {/* Bottom Section: Massive Text */}
        <div className="relative overflow-hidden mb-8">
          <h1
            ref={titleRef}
            className="text-[12vw] md:text-[14vw] font-cinzel font-black leading-none text-center tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent select-none pointer-events-none opacity-50"
          >
            JHALAK '26
          </h1>

          <div className="absolute bottom-2 md:bottom-6 left-0 right-0 flex justify-between items-end px-4 md:px-12 text-[10px] md:text-sm text-gray-500 uppercase tracking-widest font-mono">
            <span>© 2026 Carmel College</span>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-[#BA170D] transition-colors cursor-pointer flex items-center gap-2"
            >
              Back to Top
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>

            <span>
              Made with <span className="text-[#BA170D]">♥</span> by 404
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
