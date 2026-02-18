"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(TextPlugin);
}

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
      });

      // Initial States
      gsap.set(".glitch-char", { opacity: 0, y: 50, skewX: 20 });
      gsap.set(imageRef.current, { opacity: 0, scale: 1.2, filter: "blur(20px) grayscale(1)" });
      gsap.set(".heading-text", { opacity: 0 });

      // Animation Sequence
      tl.to(".glitch-char", {
        opacity: 0.3,
        y: 0,
        skewX: 0,
        duration: 1.5,
        stagger: 0.2,
      })
      .to(".heading-text", {
        opacity: 1,
        duration: 0.5,
        text: "Lost in the Rhythm?",
        ease: "none",
      }, "-=1")
      .to(imageRef.current, {
        opacity: 0.2,
        scale: 1,
        filter: "blur(5px) grayscale(0.5)",
        duration: 2,
      }, "-=1.5")
      .to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
      }, "-=1");

      // Glitch Animation for 404
      const glitchTl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
      glitchTl.to(".glitch-char", {
        skewX: () => (Math.random() - 0.5) * 40,
        x: () => (Math.random() - 0.5) * 20,
        duration: 0.1,
        stagger: 0.05,
      })
      .to(".glitch-char", {
        skewX: 0,
        x: 0,
        duration: 0.1,
      });

      // Mouse Parallax & Magnetic Button
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5);
        const y = (clientY / window.innerHeight - 0.5);

        gsap.to(titleWrapperRef.current, {
          x: x * 100,
          y: y * 50,
          duration: 1.5,
        });

        gsap.to(imageRef.current, {
          x: x * -50,
          y: y * -30,
          duration: 2,
        });

        if (buttonRef.current) {
          const rect = buttonRef.current.getBoundingClientRect();
          const btnX = rect.left + rect.width / 2;
          const btnY = rect.top + rect.height / 2;
          const dist = Math.sqrt(Math.pow(clientX - btnX, 2) + Math.pow(clientY - btnY, 2));

          if (dist < 150) {
            gsap.to(buttonRef.current, {
              x: (clientX - btnX) * 0.3,
              y: (clientY - btnY) * 0.3,
              duration: 0.5,
            });
          } else {
            gsap.to(buttonRef.current, { x: 0, y: 0, duration: 0.5 });
          }
        }
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[#0A0A0A] text-white selection:bg-[#BA170D] font-sans"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,20,20,1)_0%,rgba(5,5,5,1)_100%)]"></div>
        <div className="absolute top-[10%] left-[-5%] w-[70vw] h-[70vw] bg-[#BA170D]/10 rounded-full blur-[180px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-blue-900/5 rounded-full blur-[150px]"></div>
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.06] mix-blend-overlay"></div>
      </div>

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-size-[80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_90%)] pointer-events-none"></div>

      {/* Ghostly Dancer Silhouette */}
      <div ref={imageRef} className="absolute inset-0 z-0 flex items-center justify-center opacity-0 pointer-events-none">
        <div className="relative w-full h-full max-w-[1000px] max-h-[800px]">
          <Image
            src="/dance.png"
            alt="Broken Rhythm"
            fill
            className="object-contain opacity-40 mix-blend-lighten"
          />
        </div>
      </div>

      {/* Background Large Glitch Text */}
      <div
        ref={titleWrapperRef}
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
      >
        <h1 className="text-[30vw] md:text-[35vw] font-cinzel font-black leading-none tracking-tighter flex select-none">
          {"404".split("").map((char, i) => (
            <span key={i} className="glitch-char inline-block text-transparent bg-clip-text bg-gradient-to-b from-white via-white/50 to-transparent">
              {char}
            </span>
          ))}
        </h1>
      </div>

      {/* Content Container */}
      <div 
        ref={contentRef}
        className="relative z-20 flex flex-col items-center gap-10 px-8 opacity-0 translate-y-10"
      >
        <div className="text-center space-y-6">
          <h2 className="heading-text h-12 md:h-16 text-4xl md:text-7xl font-cinzel font-bold tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            {/* GSAP TextPlugin will fill this */}
          </h2>
          <p className="text-white/50 text-base md:text-xl max-w-lg mx-auto font-light tracking-widest uppercase">
            The beat was lost, the stage is empty.
          </p>
        </div>

        <Link
          ref={buttonRef}
          href="/"
          className="group relative px-12 py-5 rounded-full overflow-hidden transition-all duration-500"
        >
          {/* Button Background with Glassmorphism */}
          <div className="absolute inset-0 bg-[#BA170D] opacity-10 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute inset-0 border border-[#BA170D]/50 group-hover:border-white transition-colors duration-500 rounded-full"></div>
          
          <span className="relative z-10 text-white font-cinzel text-lg tracking-[0.2em] flex items-center gap-4">
            FIND THE RHYTHM
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="group-hover:translate-x-2 transition-transform duration-500"
            >
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </Link>
      </div>

      {/* Decorative Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_0%,rgba(186,23,13,0.03)_50%,transparent_100%)] bg-[length:100%_4px] opacity-20"></div>
    </div>
  );
}
