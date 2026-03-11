"use client";

import { useRef } from "react";
import Image from "next/image";
import ArchitectureScrollPlayer from "./components/ArchitectureScrollPlayer";
import LateralIndicator from "./components/LateralIndicator";
import PinnacleAnimation from "./components/PinnacleAnimation";
import { motion, useScroll, useTransform } from "framer-motion";
import { useModal } from "./context/ModalContext";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { openModal } = useModal();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

  const opacity2 = useTransform(scrollYProgress, [0.35, 0.45, 0.65, 0.75], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.35, 0.45, 0.75], [50, 0, -50]);

  const opacity3 = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);
  const y3 = useTransform(scrollYProgress, [0.8, 0.9], [50, 0]);

  return (
    <main className="bg-[#e8e6e1] min-h-screen text-[#1a1d20] relative font-sans selection:bg-[#c27041]/20 selection:text-[#c27041]">
      <LateralIndicator containerRef={containerRef} />

      {/* Hero / Animation Sequence */}
      <div id="process" ref={containerRef} className="h-[300vh] w-full relative flex flex-col md:flex-row">

        {/* Left Side: Text Content (Sticky) */}
        <div className="w-full md:w-5/12 lg:w-4/12 h-[50vh] md:h-screen sticky top-0 flex flex-col justify-center px-8 md:px-16 lg:px-24 z-20 pointer-events-none pt-24 pb-8 md:pt-0 md:pb-0">

          <div className="relative w-full h-[60vh] md:h-[40vh]">
            {/* Phase 01 Introduction */}
            <motion.div
              className="absolute inset-0 flex flex-col justify-center pointer-events-auto will-change-transform will-change-opacity"
              style={{ opacity: opacity1, y: y1 }}
            >
              <div className="mb-6 inline-flex items-center gap-3">
                <span className="w-10 h-[2px] bg-[#c27041]"></span>
                <span className="text-[#c27041] text-[10px] font-bold uppercase tracking-[0.25em]">Phase 01</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-heading leading-[1.1] mb-6 text-[#1a1d20]">
                Modular<br />Luxury<br /><span className="text-[#5a5f68]">Redefined.</span>
              </h1>
              <p className="text-[#5a5f68] text-sm md:text-base max-w-sm mb-10 leading-relaxed font-medium">
                Experience unparalleled precision. Our component-based construction system delivers high-end design with engineered perfection.
              </p>
              <button onClick={openModal} className="group relative self-start overflow-hidden rounded-full bg-[#1a1d20] px-8 py-3.5 font-bold tracking-widest text-white text-xs uppercase shadow-lg shadow-[#1a1d20]/20 hover:shadow-xl hover:shadow-[#c27041]/30 transition-all duration-500 cursor-pointer">
                <span className="relative z-10 transition-colors duration-500">Explore System</span>
                <div className="absolute inset-0 bg-[#c27041] transition-transform duration-500 ease-out translate-y-full group-hover:translate-y-0" />
              </button>
            </motion.div>

            {/* Phase 02 Disassembly */}
            <motion.div
              className="absolute inset-0 flex flex-col justify-center pointer-events-auto will-change-transform will-change-opacity"
              style={{ opacity: opacity2, y: y2 }}
            >
              <div className="mb-6 inline-flex items-center gap-3">
                <span className="w-10 h-[2px] bg-[#c27041]"></span>
                <span className="text-[#c27041] text-[10px] font-bold uppercase tracking-[0.25em]">Phase 02</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold font-heading leading-[1.1] mb-6 text-[#1a1d20]">
                Engineered<br /><span className="text-[#5a5f68]">Precision.</span>
              </h2>
              <p className="text-[#5a5f68] text-sm md:text-base max-w-sm mb-8 leading-relaxed font-medium">
                Every structural component—from the cantilevered concrete wings to the warm cedar wood entrance—is masterfully crafted off-site. They ascend seamlessly along strict X/Y vectors, embodying hyper-clean mechanical motion.
              </p>
            </motion.div>

            {/* Phase 03 Exploded View */}
            <motion.div
              className="absolute inset-0 flex flex-col justify-center pointer-events-auto will-change-transform will-change-opacity"
              style={{ opacity: opacity3, y: y3 }}
            >
              <div className="mb-6 inline-flex items-center gap-3">
                <span className="w-10 h-[2px] bg-[#c27041]"></span>
                <span className="text-[#c27041] text-[10px] font-bold uppercase tracking-[0.25em]">Phase 03</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold font-heading leading-[1.1] mb-6 text-[#1a1d20]">
                Flawless<br />Anatomy.
              </h2>
              <p className="text-[#5a5f68] text-sm md:text-base max-w-sm mb-10 leading-relaxed font-medium">
                Behold the internal steel framework and modular interior walls. Revealed without morphing or jitter, bathed in the neutral studio lighting of an architect's pure vision.
              </p>
              <a href="#specs" className="group self-start px-8 py-3.5 focus:outline-none text-[#1a1d20] font-bold tracking-widest text-xs uppercase border border-[#1a1d20]/30 rounded-full hover:border-[#c27041] hover:text-[#c27041] hover:bg-[#c27041]/5 transition-all duration-300 flex items-center gap-3 cursor-pointer">
                View Specs
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
            </motion.div>
          </div>

        </div>

        {/* Right Side: Canvas Animation (Sticky) */}
        <div className="w-full md:w-7/12 lg:w-8/12 h-[50vh] md:h-screen sticky top-[50vh] md:top-0 z-10 flex items-center justify-center overflow-hidden">
          <div
            className="w-full h-full relative group"
          >
            <ArchitectureScrollPlayer scrollContainerRef={containerRef} />
          </div>
        </div>

      </div>

      {/* Portfolio / Final Image Section */}
      <PinnacleAnimation />

      {/* Product Specifications / Call to action */}
      <section id="specs" className="min-h-[80vh] bg-[#1a1d20] flex flex-col items-center justify-center relative z-30 overflow-hidden text-center py-24">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="mb-6 inline-flex items-center gap-3">
          <span className="w-10 h-[2px] bg-[#c27041]"></span>
          <span className="text-[#c27041] text-[10px] font-bold uppercase tracking-[0.25em]">Ready to Build?</span>
        </div>

        <h3 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-6 text-white text-center">Ready to elevate your vision?</h3>
        <p className="text-[#94a3b8] text-center max-w-2xl mb-12 text-lg px-6 leading-relaxed">We redefine the boundaries of what is possible in residential construction. Seamless modularity. Hyper-clean design.</p>

        <button onClick={openModal} className="group relative overflow-hidden px-12 py-5 bg-[#c27041] text-white font-bold uppercase tracking-[0.2em] text-sm shadow-[0_0_20px_rgba(194,112,65,0.3)] hover:shadow-[0_0_40px_rgba(194,112,65,0.6)] transition-all duration-300 rounded-full cursor-pointer">
          <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1 block">Start Project</span>
        </button>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="bg-[#111316] text-[#94a3b8] py-12 border-t border-white/5 relative z-40">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h4 className="text-white text-xl font-heading font-bold mb-1">Zbuilds.</h4>
            <p className="text-sm">Modular Luxury Redefined</p>
          </div>

          <div className="text-center md:text-right text-xs md:text-sm space-y-2 font-mono text-[#5a5f68]">
            <p>made with <span className="text-[#c27041]">&lt;3</span> by: <span className="text-white">Brayan Zuluaga</span></p>
            <p>using <span className="text-white font-bold">Veo</span> for animation</p>
            <p>portafolio: <a href="https://bzuluaga.site" target="_blank" rel="noopener noreferrer" className="text-[#c27041] hover:text-white transition-colors underline decoration-white/20 underline-offset-4">bzuluaga.site</a></p>
          </div>
        </div>
      </footer>

    </main>
  );
}
