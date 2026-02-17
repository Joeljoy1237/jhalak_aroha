"use client";

import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import {
  jhalakEvents,
  EventRule,
  EventCategory,
} from "@/data/jhalakEventsData";

gsap.registerPlugin(ScrollTrigger);

export default function JhalakEvents() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<EventCategory>("onstage");
  const [selectedEvent, setSelectedEvent] = useState<EventRule | null>(null);

  const filteredEvents = jhalakEvents.filter(
    (event) => event.category === activeTab,
  );

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Section Header Animation
      gsap.from(".events-header", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Animate lists on tab change
      gsap.fromTo(
        ".event-item",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.03, duration: 0.4, ease: "power2.out" },
      );
    }, containerRef);
    return () => ctx.revert();
  }, [activeTab]);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#0A0A0A] text-white py-24 px-6 md:px-24 min-h-screen border-t border-white/5 overflow-hidden selection:bg-[#BA170D] selection:text-white"
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(30,30,30,1)_0%,rgba(10,10,10,1)_100%)] opacity-80"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-[#BA170D]/5 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[30vw] h-[30vw] bg-blue-900/5 rounded-full blur-[100px] mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.04]"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] pointer-events-none opacity-30"></div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 events-header">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-6 h-[1px] bg-[#BA170D]"></span>
              <div className="flex items-center gap-6">
                <h2 className="text-[#BA170D] font-cinzel font-bold text-lg uppercase tracking-widest">
                  Internal
                </h2>
                <h2 className="text-[#BA170D] font-cinzel font-bold text-lg uppercase tracking-widest">
                  Events
                </h2>
              </div>
            </div>

            <p className="text-5xl md:text-7xl font-light tracking-tighter text-white/90">
              JHALAK{" "}
              <span className="font-serif italic text-white/40">Originals</span>
            </p>
          </div>

          {/* Custom Tab Switcher */}
          <div className="flex gap-2 p-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm overflow-x-auto">
            {(["onstage", "offstage", "online"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-full text-sm uppercase tracking-wider font-bold transition-all duration-300 relative overflow-hidden whitespace-nowrap ${
                  activeTab === tab
                    ? "text-white shadow-[0_0_20px_rgba(186,23,13,0.3)] bg-[#BA170D]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab === "online"
                  ? "Online / Special"
                  : tab === "onstage"
                    ? "On-Stage"
                    : "Off-Stage"}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Description / Image (Span 5) */}
          <div className="lg:col-span-5 relative h-[500px] lg:h-[600px] rounded-sm overflow-hidden border border-white/10 group">
            {/* Dynamic Background Image */}
            <div className="absolute inset-0 transition-opacity duration-700">
              <Image
                src={activeTab === "onstage" ? "/dance.png" : "/ash_bg.png"}
                alt="Event Category"
                fill
                className="object-cover object-center opacity-60 group-hover:scale-105 transition-transform duration-1000"
              />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent"></div>

            <div className="absolute bottom-10 left-8 right-8">
              <div className="w-12 h-1 bg-[#BA170D] mb-6"></div>
              <h3 className="text-4xl font-cinzel font-bold mb-4 leading-tight">
                {activeTab === "onstage"
                  ? "The Spotlight Awaits"
                  : activeTab === "offstage"
                    ? "Creativity Beyond Boundaries"
                    : "Digital Expressions"}
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg font-light">
                {activeTab === "onstage"
                  ? "Step into the limelight and let your talent shine. From dance to drama, the stage is yours to conquer."
                  : activeTab === "offstage"
                    ? "Art, literature, and intellect converge. Express yourself through strokes, words, and ideas."
                    : "Showcase your creativity through the lens. Recreate, innovate, and captivate from anywhere."}
              </p>
            </div>
          </div>

          {/* Right: Event List (Span 7) */}
          <div className="lg:col-span-7 bg-white/[0.02] rounded-sm border border-white/5 p-8 md:p-12 relative overflow-hidden h-[600px]">
            {/* Decorative Number */}
            <div className="absolute -top-10 -right-10 text-[200px] font-black text-white/[0.02] pointer-events-none select-none font-cinzel">
              {activeTab === "onstage"
                ? "01"
                : activeTab === "offstage"
                  ? "02"
                  : "03"}
            </div>

            <div className="h-full overflow-y-auto custom-scrollbar pr-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {filteredEvents.map((event, i) => (
                  <button
                    key={`${activeTab}-${i}`}
                    onClick={() => setSelectedEvent(event)}
                    className="event-item group flex items-center gap-4 p-4 border-b border-white/5 hover:border-[#BA170D]/30 hover:bg-white/[0.02] transition-all cursor-pointer text-left w-full"
                  >
                    <span className="text-[#BA170D] font-mono text-xs opacity-50 group-hover:opacity-100">
                      / {(i + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="text-lg font-light text-gray-400 group-hover:text-white transition-colors">
                      {event.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-[#111] border border-white/10 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-start bg-[#BA170D]/10">
              <div>
                <span className="text-[#BA170D] font-mono text-xs uppercase tracking-wider mb-2 block">
                  {selectedEvent.category === "online"
                    ? "Online / Special"
                    : selectedEvent.category === "onstage"
                      ? "On-Stage Event"
                      : "Off-Stage Event"}
                </span>
                <h3 className="text-2xl md:text-3xl font-cinzel font-bold text-white">
                  {selectedEvent.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-white/50 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 18 18" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-[#BA170D] rounded-full"></span>
                Rules & Regulations
              </h4>
              <ul className="space-y-3">
                {selectedEvent.rules.map((rule, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-gray-300 font-light leading-relaxed"
                  >
                    <span className="text-[#BA170D] mt-1.5">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-white/10 bg-[#0A0A0A]">
              <p className="text-white/30 text-xs text-center font-mono">
                * Judges' decision will be final and binding.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
