"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const rules = [
  "The event is open to all regular students from Colleges affiliated to recognised Universities / Autonomous Colleges/ Deemed Universities/ Polytechnics only.",
  "A valid college ID is required for registration. Only registered participants will be allowed to perform.",
  "Each team must consist of 6-30 participants.",
  "A maximum of 10 extra team members are allowed (not performing on stage).",
  "Teams will be given 6-12 minutes to perform with an additional 3 minutes setup time.",
  "All participants must report by 1:00 PM sharp on the day of the event. Late arrivals will not be permitted to perform.",
  "Green rooms will be provided for teams to prepare before their performance.",
  "The music for your performance must be in MP3 format and should be brought on a pen drive.",
  "Use of fire, water, smoke, poppers, or any breakable items is strictly prohibited for safety reasons.",
  "Performances should maintain modesty and respect for all audience. Vulgar or inappropriate content will not be tolerated and it may lead to immediate disqualification.",
  "Performances must not contain obscene, offensive, or politically provocative content.",
  "The decisions made by the judges will be final and binding. There will be no re-evaluations of scores.",
  "The winning teams will be awarded a total prize pool of ₹60,000.",
  "The distribution of the prize money will be announced at the conclusion of the event.",
  "Misbehavior with judges, organizers, or other participants may lead to immediate disqualification.",
];

export default function ArohaRules() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Headers
      gsap.from(".rules-header", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".rule-item", {
        scrollTrigger: {
          trigger: ".rules-grid",
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: "power2.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#0A0A0A] text-white py-24 px-6 md:px-24 border-t border-white/5 overflow-hidden selection:bg-[#BA170D] selection:text-white"
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(30,30,30,1)_0%,rgba(10,10,10,1)_100%)] opacity-80"></div>
        <div className="absolute top-[20%] left-[-10%] w-[35vw] h-[35vw] bg-blue-900/5 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[35vw] h-[35vw] bg-[#BA170D]/5 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.04]"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] pointer-events-none opacity-40"></div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 rules-header">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-[1px] bg-[#BA170D]"></span>
            <h2 className="text-[#BA170D] font-cinzel font-bold text-lg uppercase tracking-[0.3em]">
              The Guidelines
            </h2>
            <span className="w-8 h-[1px] bg-[#BA170D]"></span>
          </div>

          <h3 className="text-4xl md:text-6xl font-light tracking-tighter">
            Event <span className="font-serif italic text-white/50">Rules</span>
          </h3>
          <p className="max-w-xl mx-auto mt-6 text-gray-400 font-light">
            Compliance ensures a seamless experience for everyone. Please read
            carefully.
          </p>
        </div>

        {/* Rules Grid */}
        <div className="rules-grid grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-6xl mx-auto text-white">
          {rules.map((rule, index) => (
            <div
              key={index}
              className="rule-item flex items-start gap-6 p-6 border-b border-white/5 hover:bg-white/[0.02] transition-colors duration-300 group"
            >
              <span className="text-4xl font-cinzel font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent group-hover:from-[#BA170D]/50 group-hover:to-transparent transition-all duration-500">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-gray-300 group-hover:text-white transition-colors pt-2 leading-relaxed font-light">
                {rule}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-20 flex justify-center">
          <a
            href="https://www.graburpass.com/e/S6wHPW"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-12 py-4 bg-[#BA170D] hover:bg-[#900000] text-white font-cinzel font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(186,23,13,0.3)] hover:shadow-[0_0_40px_rgba(186,23,13,0.6)] overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-4">
              Register for Aroha
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="group-hover:translate-x-1 transition-transform"
              >
                <path
                  d="M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 5L19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
          </a>
        </div>

        <div className="mt-28 text-center space-y-8">
          <div className="inline-block p-[1px] rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent">
            <div className="px-8 py-2 bg-[#0A0A0A] rounded-full">
              <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">
                For Clarifications Contact
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-16 justify-center items-center">
            <div className="flex flex-col items-center group">
              <span className="font-cinzel font-bold text-white text-xl mb-1 group-hover:text-[#BA170D] transition-colors">
                AADHITH
              </span>
              <a
                href="tel:9495268368"
                className="text-gray-400 font-mono hover:text-white transition-colors"
              >
                +91 94952 68368
              </a>
            </div>
            <div className="hidden md:block w-[1px] h-12 bg-white/10"></div>
            <div className="flex flex-col items-center group">
              <span className="font-cinzel font-bold text-white text-xl mb-1 group-hover:text-[#BA170D] transition-colors">
                MANASA
              </span>
              <a
                href="tel:7012769492"
                className="text-gray-400 font-mono hover:text-white transition-colors"
              >
                +91 70127 69492
              </a>
            </div>
            <div className="hidden md:block w-[1px] h-12 bg-white/10"></div>
            <div className="flex flex-col items-center group">
              <span className="font-cinzel font-bold text-white text-xl mb-1 group-hover:text-[#BA170D] transition-colors">
                STEEVE
              </span>
              <a
                href="tel:6235834190"
                className="text-gray-400 font-mono hover:text-white transition-colors"
              >
                +91 62358 34190
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
