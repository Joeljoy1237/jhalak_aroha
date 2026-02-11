"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const decorativeRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Background Parallax (Blobs)
      gsap.to(decorativeRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        y: 100, // Increased movement for mobile feel
        rotation: 20,
        ease: "none",
      });

      // 2. Text Reveal (Staggered Lines)
      const lines = gsap.utils.toArray(".about-text-line");
      gsap.from(lines, {
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%", // Earlier trigger for mobile
          end: "bottom 80%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        stagger: 0.15, // Slower stagger for drama
        duration: 1.2,
        ease: "power4.out",
      });

      // 3. Image Parallax & Reveal
      gsap.fromTo(
        imageRef.current,
        { scale: 1.3, filter: "grayscale(100%)", opacity: 0.5 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom top",
            scrub: 1.5, // Smooth scrub
          },
          scale: 1,
          filter: "grayscale(0%)",
          opacity: 1,
          ease: "none",
        },
      );

      // 4. Floating Badge Rotation on Scroll
      gsap.to(badgeRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        rotation: 360,
        ease: "none",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-[#0A0A0A] text-white py-16 md:py-24 px-6 md:px-24 overflow-hidden selection:bg-[#BA170D] selection:text-white"
    >
      {/* Background Ambience (Same as Hero) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,30,30,1)_0%,rgba(10,10,10,1)_100%)] opacity-80"></div>
        <div
          ref={decorativeRef}
          className="absolute top-[10%] right-[-5%] w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-[#BA170D]/10 rounded-full blur-[100px] mix-blend-screen opacity-60"
        ></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] md:w-[40vw] md:h-[40vw] bg-blue-900/10 rounded-full blur-[100px] mix-blend-screen opacity-60"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.04]"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[40px_40px] md:bg-size-[60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] pointer-events-none opacity-50"></div>

      <div className="relative z-10 container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center h-full">
        {/* Text Content */}
        <div className="order-2 md:order-1 flex flex-col justify-center">
          <h2 className="text-[#BA170D] font-cinzel text-lg md:text-2xl mb-6 md:mb-8 tracking-[0.2em] uppercase flex items-center gap-4">
            <span className="w-8 md:w-12 h-[1px] bg-[#BA170D]"></span> The
            Vision
          </h2>

          <div
            ref={textRef}
            className="text-3xl md:text-5xl font-light leading-tight space-y-2"
          >
            <div className="overflow-hidden">
              <p className="about-text-line block">Ignite the stage with</p>
            </div>
            <div className="overflow-hidden">
              <p className="about-text-line block">passion and precision.</p>
            </div>
            <div className="overflow-hidden">
              <p className="about-text-line block text-[#BA170D] font-cinzel font-bold">
                AROHA
              </p>
            </div>
            <div className="overflow-hidden">
              <p className="about-text-line block">
                is not just a dance event;
              </p>
            </div>
            <div className="overflow-hidden">
              <p className="about-text-line block">it is a celebration of</p>
            </div>
            <div className="overflow-hidden">
              <p className="about-text-line block">movement and soul.</p>
            </div>
          </div>

          <p className="mt-8 md:mt-12 text-gray-400 max-w-lg leading-relaxed text-base md:text-lg border-l-2 border-[#BA170D]/30 pl-6">
            Join the most anticipated cultural phenomenon of Jhalak 2026.
            Detailed choreography, electrifying beats, and a stage waiting for
            your story.
          </p>
        </div>

        {/* Image / Graphic */}
        <div className="relative h-[50vh] md:h-[80vh] w-full order-1 md:order-2 flex items-center justify-center">
          <div
            ref={imageRef}
            className="relative w-full h-full md:w-[90%] md:h-[90%] overflow-hidden rounded-sm border border-white/10"
          >
            <Image
              src="/aroha.png"
              alt="Dance Silhouette"
              fill
              className="object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/50 via-transparent to-transparent opacity-60"></div>

            {/* Inner frame decoration */}
            <div className="absolute inset-4 border border-white/5 pointer-events-none"></div>
          </div>

          {/* Floating Badge (Updated style) */}
          <div
            ref={badgeRef}
            className="absolute -bottom-6 -right-6 md:bottom-10 md:left-0 md:right-auto w-28 h-28 md:w-40 md:h-40 border border-[#BA170D]/30 rounded-full flex items-center justify-center bg-[#0A0A0A]/80 backdrop-blur-md z-20 shadow-2xl"
          >
            <div className="absolute inset-2 border border-dashed border-white/20 rounded-full"></div>
            <div className="text-[10px] md:text-xs text-white uppercase tracking-widest text-center font-cinzel">
              Jhalak 2026 <br />{" "}
              <span className="text-[#BA170D] font-bold">Official Event</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
