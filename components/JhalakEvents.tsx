"use client";

import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const offstageEvents = [
  "Essay Writing",
  "Story Writing",
  "Poem Writing",
  "Drawing: Pencil Sketching",
  "Drawing: Water Colour",
  "Digital Painting",
  "Poster Designing",
  "Collage",
  "Calligraphy",
  "Cartoon",
  "Debate",
  "Quiz",
  "Extempore",
  "Logo Making",
  "Glass Painting",
  "Face Painting",
  "Mehendi Designing",
  "Art from Waste",
  "Caption Writing",
];

const onstageEvents = [
  "Mime",
  "Group Dance",
  "Nostalgia Dance",
  "Light Music",
  "Karaoke",
  "Step n Synchro",
  "Group Song",
  "Recitation",
  "Fancy Dress",
  "Monoact",
  "Thiruvathira",
  "Instrumental Solo",
  "Dance Solo",
  "RJying",
  "Oppana",
  "Margam Kali",
  "Fashion Show",
];

export default function JhalakEvents() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"onstage" | "offstage">("onstage");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate lists on tab change
      gsap.fromTo(
        ".event-item",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.5, ease: "power2.out" },
      );
    }, containerRef);
    return () => ctx.revert();
  }, [activeTab]);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#0A0A0A] text-white py-24 px-6 md:px-24 min-h-screen border-t border-white/5"
    >
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-[#BA170D] font-cinzel font-bold text-xl uppercase tracking-widest mb-2">
              Internal Events
            </h2>
            <p className="text-5xl md:text-7xl font-light tracking-tighter text-white/90">
              JHALAK{" "}
              <span className="font-serif italic text-white/50">Originals</span>
            </p>
          </div>

          {/* Custom Tab Switcher */}
          <div className="flex gap-4 p-1 bg-white/5 rounded-full border border-white/10">
            <button
              onClick={() => setActiveTab("onstage")}
              className={`px-8 py-3 rounded-full text-lg transition-all duration-300 ${activeTab === "onstage" ? "bg-[#BA170D] text-white shadow-[0_0_20px_rgba(186,23,13,0.3)]" : "text-gray-400 hover:text-white"}`}
            >
              On-Stage
            </button>
            <button
              onClick={() => setActiveTab("offstage")}
              className={`px-8 py-3 rounded-full text-lg transition-all duration-300 ${activeTab === "offstage" ? "bg-[#BA170D] text-white shadow-[0_0_20px_rgba(186,23,13,0.3)]" : "text-gray-400 hover:text-white"}`}
            >
              Off-Stage
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Description / Image */}
          <div className="relative h-[400px] lg:h-auto rounded-2xl overflow-hidden border border-white/10 group">
            <div
              className={`absolute inset-0 bg-cover bg-center transition-all duration-700 transform scale-100 group-hover:scale-105 ${activeTab === "onstage" ? "bg-[url('/dance.png')]" : "bg-[url('/ash_bg.png')]"}`}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

            <div className="absolute bottom-10 left-10 right-10 p-6 border-l-4 border-[#BA170D]">
              <h3 className="text-4xl font-cinzel font-bold mb-4">
                {activeTab === "onstage"
                  ? "The Spotlight Awaits"
                  : "Creativity Beyond Boundaries"}
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                {activeTab === "onstage"
                  ? "Step into the limelight and let your talent shine. From dance to drama, the stage is yours to conquer."
                  : "Art, literature, and intellect converge. express yourself through strokes, words, and ideas."}
              </p>
            </div>
          </div>

          {/* Right: Event List */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10 max-h-[600px] overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(activeTab === "onstage" ? onstageEvents : offstageEvents).map(
                (event, i) => (
                  <div
                    key={`${activeTab}-${i}`}
                    className="event-item group flex items-center gap-4 p-4 rounded-lg hover:bg-white/5 transition-all cursor-default border border-transparent hover:border-white/10"
                  >
                    <span className="text-[#BA170D] font-mono text-sm opacity-50 group-hover:opacity-100">
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="text-lg font-light text-gray-300 group-hover:text-white transition-colors">
                      {event}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
