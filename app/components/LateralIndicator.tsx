"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function LateralIndicator({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const dotPosition = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="fixed right-6 md:right-12 top-1/2 -translate-y-1/2 h-[30vh] w-1.5 flex-col items-center justify-between z-40 hidden md:flex">
      {/* Track */}
      <div className="absolute top-0 bottom-0 w-[1px] bg-[#1a1d20]/10" />
      
      {/* Moving dot */}
      <motion.div 
        className="absolute w-2 h-2 rounded-full bg-[#c27041] shadow-[0_0_8px_rgba(194,112,65,0.6)] -ml-[0.5px]"
        style={{ top: dotPosition, y: "-50%" }}
      />

      {/* Nodes */}
      <div className="w-2 h-[1px] bg-[#1a1d20]/20 z-10" />
      <div className="w-2 h-[1px] bg-[#1a1d20]/20 z-10 absolute top-1/2 -translate-y-1/2" />
      <div className="w-2 h-[1px] bg-[#1a1d20]/20 z-10 mt-auto" />
    </div>
  );
}
