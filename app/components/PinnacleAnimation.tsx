"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function PinnacleAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Background Image Animation
  const bgScale = useTransform(scrollYProgress, [0, 0.4], [0.6, 1]);
  const bgRotateX = useTransform(scrollYProgress, [0, 0.4], [60, 0]);
  const bgY = useTransform(scrollYProgress, [0, 0.4], [150, 0]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // Text Animations
  // "The Finished Vision"
  const overlineOpacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);
  const overlineY = useTransform(scrollYProgress, [0.35, 0.5], [50, 0]);

  // "ARCHITECTURAL"
  const word1RotateX = useTransform(scrollYProgress, [0.4, 0.6], [90, 0]);
  const word1Y = useTransform(scrollYProgress, [0.4, 0.6], [100, 0]);
  const word1Opacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  // "PINNACLE"
  const word2RotateX = useTransform(scrollYProgress, [0.5, 0.7], [90, 0]);
  const word2Y = useTransform(scrollYProgress, [0.5, 0.7], [100, 0]);
  const word2Opacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

  // Paragraph
  const paragraphOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const paragraphY = useTransform(scrollYProgress, [0.6, 0.8], [50, 0]);

  return (
    <section id="portfolio" ref={containerRef} className="relative h-[300vh] bg-[#e8e6e1]">
      <div 
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#1a1d20]"
        style={{ perspective: "2000px" }}
      >
        
        {/* Full screen Image Background */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            scale: bgScale,
            rotateX: bgRotateX,
            y: bgY,
            opacity: bgOpacity,
            transformStyle: "preserve-3d",
            transformOrigin: "center bottom",
          }}
        >
          <Image
            src="/assets/house/end1.png"
            alt="Finished Vision"
            fill
            className="object-cover"
            priority /* Since it initially shows on scroll */
            unoptimized /* Prevents weird scaling on next/image local assets sometimes */
          />
          {/* Dark Overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        {/* 3D Animated Text Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 w-full max-w-6xl pointer-events-none">
          
          <motion.div 
            className="inline-flex items-center gap-3 mb-6 md:mb-10"
            style={{ opacity: overlineOpacity, y: overlineY }}
          >
            <span className="w-10 h-[2px] bg-[#c27041]"></span>
            <span className="text-[#c27041] text-[10px] md:text-sm font-bold uppercase tracking-[0.25em] drop-shadow-md">The Finished Vision</span>
            <span className="w-10 h-[2px] bg-[#c27041]"></span>
          </motion.div>

          {/* 3D text part */}
          <h2 className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-heading font-bold leading-[0.9] uppercase flex flex-col items-center pointer-events-auto">
             <motion.span 
               className="text-white block drop-shadow-2xl"
               style={{ 
                 rotateX: word1RotateX, 
                 y: word1Y, 
                 opacity: word1Opacity,
                 transformOrigin: "bottom center"
               }}
             >
               Architectural
             </motion.span>
             
             <motion.span 
               className="text-transparent bg-clip-text bg-gradient-to-r from-[#c27041] to-[#f3bd99] block mt-1 md:mt-4 drop-shadow-lg p-2"
               style={{ 
                 rotateX: word2RotateX, 
                 y: word2Y, 
                 opacity: word2Opacity,
                 transformOrigin: "center top"
               }}
             >
               Pinnacle
             </motion.span>
          </h2>

          <motion.p 
            className="mt-8 md:mt-12 text-[#e8e6e1] font-medium leading-relaxed max-w-2xl text-sm sm:text-base md:text-xl drop-shadow-xl"
            style={{ opacity: paragraphOpacity, y: paragraphY }}
          >
            Every component locks perfectly into place, creating an unbreakable bond. Our luxury homes are not just built; they are precisely assembled to stand the test of time, reflecting both elegance and structural superiority.
          </motion.p>
        </div>

      </div>
    </section>
  );
}
