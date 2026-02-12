"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function SplashScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsMounted(false);
          onComplete();
        },
      });

      // Initial States
      gsap.set(logoRef.current, {
        scale: 0.5,
        opacity: 0,
        filter: "blur(20px)",
      });
      gsap.set(glowRef.current, { scale: 0.5, opacity: 0 });
      gsap.set(shimmerRef.current, { xPercent: -100 });

      // Animation Sequence
      tl
        // 1. Reveal Logo & Glow
        .to(logoRef.current, {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "expo.out",
        })
        .to(
          glowRef.current,
          {
            scale: 1.5,
            opacity: 0.6,
            duration: 1.5,
            ease: "power2.out",
          },
          "<",
        )
        // 2. Shimmer Effect
        .to(
          shimmerRef.current,
          {
            xPercent: 100,
            duration: 0.8,
            ease: "power2.inOut",
          },
          "-=0.5",
        )
        // 3. Pulse / Hold
        .to(
          logoRef.current,
          {
            scale: 1.05,
            duration: 1.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: 1,
          },
          "-=0.5",
        )
        // 4. Exit
        .to(logoRef.current, {
          scale: 0.8,
          opacity: 0,
          filter: "blur(10px)",
          duration: 0.8,
          ease: "power3.in",
        })
        .to(
          glowRef.current,
          {
            opacity: 0,
            duration: 0.5,
          },
          "<",
        )
        .to(containerRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "expo.inOut",
        });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (!isMounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A0A0A] overflow-hidden"
    >
      {/* Background Glow */}
      <div
        ref={glowRef}
        className="absolute w-[500px] h-[500px] bg-[#BA170D]/20 rounded-full blur-[100px] pointer-events-none"
      />

      {/* Decorative Particles (Static CSS for performance) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('/noise.svg')] mix-blend-overlay"></div>

      {/* Logo Container */}
      <div ref={logoRef} className="relative w-64 h-64 md:w-96 md:h-96 z-10">
        <Image
          src="/Logo.png"
          alt="Jhalak Aroha Logo"
          fill
          className="object-contain drop-shadow-[0_0_25px_rgba(186,23,13,0.5)]"
          priority
        />

        {/* Shimmer Overlay (Masked by parent if needed, but here simple overlay) */}
        <div
          ref={shimmerRef}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none mix-blend-overlay"
        ></div>
      </div>
    </div>
  );
}
