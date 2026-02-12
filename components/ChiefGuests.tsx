"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const guests = [
  {
    name: "DILSHA PRASANNAN",
    role: "Actress & Dancer",
    image: "/dilsha.jpg",
    description:
      "Indian television actress and dancer known for her graceful performances and screen presence.",
  },
  {
    name: "SHALJIN JS",
    role: "Dancer & Choreographer",
    image: "/shaljin_js.jpg",
    description:
      "Professional dancer and instructor, dedicated to inspiring through dance. A contestant in the Zee Keralam 'DANCE KERALA DANCE' reality show.",
  },
];

export default function ChiefGuests() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".guest-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Cards Animation
      gsap.from(".guest-card", {
        scrollTrigger: {
          trigger: ".guest-grid",
          start: "top 75%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0A0A0A] text-white py-24 px-6 md:px-24 overflow-hidden selection:bg-[#BA170D] selection:text-white border-t border-white/5"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#BA170D]/5 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-blue-900/5 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.04]"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] pointer-events-none opacity-40"></div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 guest-header">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-[1px] bg-[#BA170D]"></span>
            <h2 className="text-[#BA170D] font-cinzel font-bold text-lg uppercase tracking-[0.3em]">
              Special Guests
            </h2>
            <span className="w-8 h-[1px] bg-[#BA170D]"></span>
          </div>

          <h3 className="text-4xl md:text-6xl font-light tracking-tighter">
            Judges &{" "}
            <span className="font-serif italic text-white/50">Guests</span>
          </h3>
        </div>

        {/* Guests Grid */}
        <div className="guest-grid grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 max-w-5xl mx-auto">
          {guests.map((guest, index) => (
            <div
              key={index}
              className="guest-card group relative flex flex-col items-center text-center"
            >
              {/* Image Container */}
              <div className="relative w-64 h-80 md:w-80 md:h-96 mb-8 rounded-sm overflow-hidden border border-white/10 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                <Image
                  src={guest.image}
                  alt={guest.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  unoptimized
                />
                {/* Decorative Frame */}
                <div className="absolute inset-4 border border-white/20 z-20 pointer-events-none transition-all duration-500 group-hover:inset-2 group-hover:border-[#BA170D]/50"></div>
              </div>

              {/* Text Content */}
              <div className="relative z-10 max-w-sm">
                <h4 className="text-2xl md:text-3xl font-cinzel font-bold text-white mb-2 group-hover:text-[#BA170D] transition-colors duration-300">
                  {guest.name}
                </h4>
                <p className="text-[#BA170D] font-mono text-xs tracking-widest uppercase mb-4 font-bold">
                  {guest.role}
                </p>
                <p className="text-gray-400 font-light text-sm leading-relaxed">
                  {guest.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
