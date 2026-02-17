"use client";

import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  jhalakGeneralRules,
  scoringData,
  negativeMarkingData,
  groupEventCodes,
  screeningInfo,
  groupEventInfo,
} from "@/data/jhalakRulesData";

gsap.registerPlugin(ScrollTrigger);

export default function JhalakRules() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"general" | "scoring" | "codes">(
    "general",
  );

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".jh-rules-header", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Content Animation
      gsap.fromTo(
        ".jh-rules-content",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".jh-rules-tabs",
            start: "top 85%",
          },
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, [activeTab]);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#0A0A0A] text-white py-24 px-6 md:px-24 border-t border-white/5 overflow-hidden selection:bg-[#BA170D] selection:text-white"
    >
      <div className="container mx-auto relative z-10 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 jh-rules-header">
          <h2 className="text-[#BA170D] font-cinzel font-bold text-lg uppercase tracking-[0.3em] mb-4">
            House Policies
          </h2>
          <h3 className="text-4xl md:text-5xl font-light tracking-tighter mb-6">
            JHALAK{" "}
            <span className="font-serif italic text-white/50">Rulebook</span>
          </h3>
          <p className="max-w-2xl mx-auto text-gray-400 font-light leading-relaxed">
            Essential guidelines for a fair and spectacular competition.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 jh-rules-tabs">
          {[
            { id: "general", label: "General Rules" },
            { id: "scoring", label: "Scoring & Negative Marks" },
            { id: "codes", label: "Start Codes" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-2 rounded-full text-sm uppercase tracking-wider font-bold transition-all duration-300 border border-white/10 ${
                activeTab === tab.id
                  ? "bg-[#BA170D] text-white border-[#BA170D] shadow-[0_0_15px_rgba(186,23,13,0.4)]"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="jh-rules-content bg-white/[0.02] border border-white/5 rounded-2xl p-8 md:p-12 min-h-[400px]">
          {activeTab === "general" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {jhalakGeneralRules.map((rule, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="text-[#BA170D] font-mono text-sm mt-1">
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                    <p className="text-gray-300 font-light leading-relaxed text-sm md:text-base">
                      {rule}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-[#BA170D]/5 border border-[#BA170D]/20 rounded-lg">
                <h4 className="text-[#BA170D] font-cinzel font-bold mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#BA170D] rounded-full"></span>
                  Screening Protocol
                </h4>
                <p className="text-gray-300 font-light leading-relaxed text-sm">
                  {screeningInfo}
                </p>
              </div>
            </div>
          )}

          {activeTab === "scoring" && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Scoring Table */}
              <div>
                <h4 className="text-white font-cinzel text-xl mb-6 border-l-4 border-[#BA170D] pl-4">
                  Points Distribution
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="py-4 px-4 text-[#BA170D] font-mono text-sm uppercase">
                          Place
                        </th>
                        <th className="py-4 px-4 text-gray-400 font-mono text-sm uppercase">
                          Single Event
                        </th>
                        <th className="py-4 px-4 text-gray-400 font-mono text-sm uppercase">
                          Group Event
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {scoringData.map((row, i) => (
                        <tr
                          key={i}
                          className="hover:bg-white/[0.02] transition-colors"
                        >
                          <td className="py-4 px-4 font-bold text-white">
                            {row.place}
                          </td>
                          <td className="py-4 px-4 text-gray-300">
                            {row.single}
                          </td>
                          <td className="py-4 px-4 text-gray-300">
                            {row.group}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Negative Marking Table */}
              <div>
                <h4 className="text-white font-cinzel text-xl mb-6 border-l-4 border-red-500 pl-4">
                  Negative Markings
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="py-4 px-4 text-white font-mono text-sm uppercase">
                          Offense
                        </th>
                        <th className="py-4 px-4 text-red-500 font-mono text-sm uppercase">
                          Negative Marks
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {negativeMarkingData.map((row, i) => (
                        <tr
                          key={i}
                          className="hover:bg-white/[0.02] transition-colors"
                        >
                          <td className="py-4 px-4 text-gray-300">
                            {row.offense}
                          </td>
                          <td className="py-4 px-4 text-red-400 font-bold">
                            -{row.marks}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "codes" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-8">
                <p className="text-gray-300 font-light leading-relaxed mb-4">
                  {groupEventInfo}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupEventCodes.map((event, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/5 rounded-lg hover:border-[#BA170D]/30 transition-colors"
                  >
                    <div>
                      <span className="block text-xs text-[#BA170D] font-mono mb-1">
                        {event.type}
                      </span>
                      <span className="text-gray-200 font-medium">
                        {event.name}
                      </span>
                    </div>
                    <div className="bg-[#BA170D]/10 text-[#BA170D] font-mono font-bold px-3 py-1 rounded text-sm border border-[#BA170D]/20">
                      {event.code}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
