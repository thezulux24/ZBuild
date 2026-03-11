"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "../context/ModalContext";

export default function ContactModal() {
  const { isModalOpen, closeModal } = useModal();
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    
    // Simulate API call
    setTimeout(() => {
      setFormState("success");
      setTimeout(() => {
        closeModal();
        // Reset after close
        setTimeout(() => {
          setFormState("idle");
          setEmail("");
        }, 500);
      }, 3000);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-[#1a1d20]/50 backdrop-blur-md z-[100]"
          />
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#e8e6e1] w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl p-8 relative pointer-events-auto border border-white/20"
            >
              {formState !== "success" ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div>
                    <div className="mb-4 inline-flex items-center gap-3">
                      <span className="w-8 h-[2px] bg-[#c27041]"></span>
                      <span className="text-[#c27041] text-[10px] font-bold uppercase tracking-[0.25em]">Start the Process</span>
                    </div>
                    <h3 className="text-3xl font-heading font-bold text-[#1a1d20]">Let's Build It.</h3>
                    <p className="text-[#5a5f68] mt-2 text-sm leading-relaxed">
                      Provide your details and we'll reach out to discuss the blueprint of your vision.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#1a1d20]">Full Name</label>
                      <input required type="text" className="w-full bg-white/50 border border-[#1a1d20]/10 rounded-xl px-4 py-3 outline-none focus:border-[#c27041] focus:ring-1 focus:ring-[#c27041] transition-all text-[#1a1d20] placeholder-[#1a1d20]/30" placeholder="John Architect" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#1a1d20]">Email Address</label>
                      <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/50 border border-[#1a1d20]/10 rounded-xl px-4 py-3 outline-none focus:border-[#c27041] focus:ring-1 focus:ring-[#c27041] transition-all text-[#1a1d20] placeholder-[#1a1d20]/30" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#1a1d20]">Project Details</label>
                      <textarea required rows={3} className="w-full bg-white/50 border border-[#1a1d20]/10 rounded-xl px-4 py-3 outline-none focus:border-[#c27041] focus:ring-1 focus:ring-[#c27041] transition-all text-[#1a1d20] placeholder-[#1a1d20]/30 resize-none" placeholder="Tell us about the scope..."></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={formState === "submitting"}
                      className="w-full relative overflow-hidden bg-[#1a1d20] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#c27041] hover:shadow-[0_0_20px_rgba(194,112,65,0.4)] transition-all duration-300 disabled:opacity-70"
                    >
                      {formState === "submitting" ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </div>
                      ) : (
                        <span>Send Request</span>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12 space-y-4"
                >
                  <div className="w-20 h-20 rounded-full bg-[#c27041]/10 flex items-center justify-center mb-4 text-[#c27041]">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-[#1a1d20]">Request Received</h3>
                  <p className="text-[#5a5f68] text-sm max-w-[250px]">
                    Thank you. We will contact you at {email || "your provided email"} shortly to discuss the project.
                  </p>
                </motion.div>
              )}

              <button 
                onClick={closeModal}
                className="absolute top-6 right-6 text-[#1a1d20]/40 hover:text-[#1a1d20] transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
