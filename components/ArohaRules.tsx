"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const rules = [
  "A valid college ID is required for registration. Only registered participants will be allowed to perform.",
  "Each team must consist of 6-25 participants.",
  "A maximum of 10 extra team members are allowed (not performing on stage).",
  "Teams will be given 6-10 minutes to perform. This includes setup time.",
  "All participants must report by 2:30 PM sharp on the day of the event.",
  "The music for your performance must be in MP3 format and should be brought on a pen drive.",
  "Use of fire, water, smoke, poppers, or any breakable items is strictly prohibited for safety reasons.",
  "Performances should maintain modesty and respect for all audiences. Vulgar or inappropriate content will not be tolerated.",
  "Green rooms will be provided for teams to prepare before their performance.",
  "The decisions made by the judges will be final and binding.",
  "The winning team will be awarded a total prize pool of ₹60,000.",
  "The distribution of the prize money will be announced at the conclusion of the event.",
];

export default function ArohaRules() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".rule-item", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#050505] text-white py-24 px-6 md:px-24 border-t border-white/5"
    >
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[#BA170D] font-cinzel font-bold text-xl uppercase tracking-widest mb-4">
            The Guidelines
          </h2>
          <h3 className="text-4xl md:text-6xl font-light tracking-tighter">
            Event <span className="font-serif italic text-gray-500">Rules</span>
          </h3>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl mx-auto text-white">
          {rules.map((rule, index) => (
            <div
              key={index}
              className="rule-item flex gap-6 p-6 border border-white/10 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 hover:border-[#BA170D]/50 hover:shadow-[0_0_20px_rgba(186,23,13,0.1)] group"
            >
              <span className="text-white font-cinzel font-bold text-2xl opacity-80 group-hover:opacity-100 transition-opacity">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-white font-light leading-relaxed group-hover:text-white transition-colors">
                {rule}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-20 text-center space-y-4">
          <p className="text-gray-400 uppercase tracking-widest text-sm">
            For Clarifications Contact
          </p>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center text-xl">
            <div className="flex gap-2">
              <span className="font-bold text-white">ADITH:</span>
              <a
                href="tel:9495268368"
                className="text-[#BA170D] hover:underline"
              >
                9495268368
              </a>
            </div>
            <div className="hidden md:block w-2 h-2 rounded-full bg-white/20"></div>
            <div className="flex gap-2">
              <span className="font-bold text-white">MANASA:</span>
              <a
                href="tel:7012769492"
                className="text-[#BA170D] hover:underline"
              >
                7012769492
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
