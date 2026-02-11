"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const subTextRef = useRef<HTMLParagraphElement>(null);
  const decorativeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Initial State Setups
      gsap.set(".char", { yPercent: 100, opacity: 0 });
      gsap.set(imageRef.current, {
        scale: 1.1,
        opacity: 0,
        filter: "blur(10px)",
      });
      gsap.set(subTextRef.current, { y: 20, opacity: 0 });

      // Animation Sequence
      tl.to(".char", {
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.05,
        ease: "power4.out",
      })
        .to(
          imageRef.current,
          {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "expo.out",
          },
          "-=0.8",
        )
        .to(
          subTextRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
          },
          "-=1",
        )
        .fromTo(
          decorativeRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1 },
          "-=1",
        );

      // Mouse Movement Parallax Effect
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 20; // -10 to 10
        const y = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to(imageRef.current, {
          x: x * -1, // Move opposite to mouse
          y: y * -1,
          duration: 1,
          ease: "power2.out",
        });

        gsap.to(titleWrapperRef.current, {
          x: x * 0.5,
          y: y * 0.5,
          duration: 1,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const titleText = "AROHA";

  return (
    <div
      ref={containerRef}
      className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[#0A0A0A] selection:bg-[#BA170D] selection:text-white"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,30,30,1)_0%,rgba(10,10,10,1)_100%)]"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#BA170D]/5 rounded-full blur-[150px] mix-blend-screen animate-pulse duration-[4s]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-900/5 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.04]"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center">
        {/* Main Title */}
        {/* Main Title - Centered & Huge - MOVED TO BACK (z-0) */}
        <div
          ref={titleWrapperRef}
          className="absolute inset-0 flex items-start pt-28 md:pt-0 md:items-center justify-center z-0 pointer-events-none"
        >
          <div className="relative flex items-center justify-center">
            {/* Main Text Layer - High Contrast - Behind Image */}
            <h1 className="relative text-[20vw] md:text-[22vw] leading-none font-cinzel font-black text-white bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#e2e2e2] to-[#555555] drop-shadow-[0_0_50px_rgba(255,255,255,0.1)] opacity-30 md:opacity-40">
              {titleText.split("").map((char, index) => (
                <span key={index} className="char inline-block origin-bottom">
                  {char}
                </span>
              ))}
            </h1>
          </div>
        </div>

        {/* Hero Image - Interacting with Text - FRONT (z-10) */}
        <div
          ref={imageRef}
          className="absolute inset-0 z-10 flex items-end justify-center pointer-events-none"
        >
          <div className="relative w-full h-[55%] md:h-[90%] max-w-[1200px]">
            <Image
              src="/dance.png"
              alt="AROHA Dancer"
              fill
              className="object-contain object-bottom drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
              priority
            />
            {/* Gradient Overlay at bottom to blend image feet */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent"></div>
          </div>
        </div>

        {/* Subtext - OVERLAY (z-20) */}
        <div className="absolute top-[30vh] md:top-auto bottom-auto md:bottom-[20%] z-20 overflow-hidden flex flex-col items-center gap-6">
          <p
            ref={subTextRef}
            className="text-white text-sm md:text-xl tracking-[0.4em] font-light uppercase text-center drop-shadow-md px-4"
          >
            <span className="text-[#BA170D] font-bold text-lg">"</span> Unleash
            the Rhythm Within{" "}
            <span className="text-[#BA170D] font-bold text-lg">"</span>
          </p>

          <a
            href="https://www.graburpass.com/e/S6wHPW"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full border border-[#BA170D] text-white font-cinzel text-sm tracking-widest hover:bg-[#BA170D] hover:text-white transition-all duration-300 backdrop-blur-sm bg-black/30 group flex items-center gap-2"
          >
            Register Now
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 opacity-60">
          <span className="text-[10px] uppercase tracking-widest text-white/50">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>

        {/* Decorative Circle */}
        <div
          ref={decorativeRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] md:w-[35vw] md:h-[35vw] border border-white/5 rounded-full z-0 pointer-events-none"
        ></div>
      </div>
    </div>
  );
}
