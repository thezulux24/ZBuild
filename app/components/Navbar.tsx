"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useModal } from "../context/ModalContext";

export default function Navbar() {
  const { openModal } = useModal();

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 bg-[#e8e6e1]/80 backdrop-blur-lg border-b border-[#1a1d20]/5"
    >
      <div className="flex items-center">
        <Link href="/" className="text-2xl font-bold tracking-tight text-[#1a1d20] font-heading">
          Zbuilds<span className="text-[#c27041]">.</span>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#5a5f68]">
        <Link href="#portfolio" className="hover:text-[#1a1d20] transition-colors duration-300">Portfolio</Link>
        <Link href="#process" className="hover:text-[#1a1d20] transition-colors duration-300">Process</Link>
        <Link href="#specs" className="hover:text-[#1a1d20] transition-colors duration-300">Specs</Link>
      </div>

      <div className="flex items-center">
        <button 
          onClick={openModal}
          className="px-6 py-2.5 text-sm font-medium text-[#1a1d20] rounded-full border border-[#1a1d20]/20 hover:border-[#c27041] hover:bg-[#c27041] hover:text-white transition-all duration-300 cursor-pointer"
        >
          Let's build
        </button>
      </div>
    </motion.nav>
  );
}
