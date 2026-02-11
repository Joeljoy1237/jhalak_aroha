"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    id: 1,
    title: "Solo",
    description: "One Soul, One Stage",
    image: "/dance.png", // Placeholder, reusing existing assets for now
  },
  {
    id: 2,
    title: "Duet",
    description: "Two Hearts, One Rhythm",
    image: "/dance.png",
  },
  {
    id: 3,
    title: "Group",
    description: "Unity in Motion",
    image: "/dance.png",
  },
];

export default function ArohaEvents() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".event-card");

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: scrollRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + scrollRef.current!.offsetWidth,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#0A0A0A] overflow-hidden"
    >
      {/* Section Header */}
      <div className="absolute top-10 left-6 md:left-24 z-20 pointer-events-none">
        <h2 className="text-[#BA170D] font-cinzel font-bold text-xl uppercase tracking-widest mb-2">
          The Main Event
        </h2>
        <p className="text-4xl md:text-6xl font-light tracking-tighter text-white">
          AROHA{" "}
          <span className="font-serif italic text-gray-500 text-2xl md:text-4xl">
            Inter-College
          </span>
        </p>
      </div>

      <div ref={scrollRef} className="flex h-screen w-[300%]">
        {events.map((event, index) => (
          <div
            key={event.id}
            className="event-card w-screen h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-24 relative border-r border-white/5 last:border-r-0"
          >
            {/* Background Number */}
            <div className="absolute top-10 left-10 md:top-20 md:left-20 text-[20vw] font-black text-white/5 font-cinzel leading-none select-none z-0">
              0{event.id}
            </div>

            <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row items-center gap-12">
              {/* Text Info */}
              <div className="flex-1 space-y-6">
                <h3 className="text-6xl md:text-8xl font-cinzel font-bold text-white uppercase tracking-tighter">
                  {event.title}
                </h3>
                <div className="h-1 w-20 bg-[#BA170D] rounded-full"></div>
                <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide">
                  {event.description}
                </p>
                <button className="mt-8 px-8 py-3 border border-white/20 rounded-full text-white hover:bg-[#BA170D] hover:border-[#BA170D] transition-all duration-300 uppercase tracking-widest text-sm">
                  View Details
                </button>
              </div>

              {/* Visual Representation */}
              <div className="flex-1 relative h-[400px] w-full md:h-[600px] bg-white/5 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10 group">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#BA170D]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white/20 font-cinzel text-xl">
                  Image Placeholder
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-10 right-10 flex items-center gap-4 text-white/50 z-20">
        <span className="uppercase tracking-widest text-xs">
          Swipe to Explore
        </span>
        <div className="w-12 h-[1px] bg-white/50"></div>
      </div>
    </section>
  );
}
