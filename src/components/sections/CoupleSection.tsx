"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import GoldDivider from "../ui/GoldDivider";

export default function CoupleSection() {
  return (
    <section id="couple" className="relative w-full py-24 px-4 bg-[#241510] text-[#FFF8E8] overflow-hidden border-t border-[#C9A24A]/30">
      {/* Background Kolam Overlay */}
      <div className="absolute inset-0 bg-kolam-overlay opacity-15 pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#C9A24A] font-serif text-xs sm:text-sm tracking-[0.3em] uppercase block mb-1">
            THE BRIDE &amp; GROOM
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-gold-shimmer drop-shadow">
            Meet the Couple
          </h2>
          <GoldDivider symbol="✦" />
        </motion.div>

        {/* 3-Column Desktop / Stacked Mobile Layout */}
        <div className="w-full mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Bride Card (LEFT) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center group cursor-pointer"
          >
            {/* Traditional Arch Photo Frame */}
            <div className="relative w-56 h-72 sm:w-64 sm:h-80 rounded-t-full rounded-b-2xl border-4 border-[#C9A24A] p-2 bg-[#5A1720]/80 shadow-[0_15px_35px_rgba(0,0,0,0.6)] group-hover:border-[#FFF3B0] group-hover:scale-[1.03] transition-all duration-500 overflow-hidden mb-4">
              <div className="relative w-full h-full rounded-t-full rounded-b-xl overflow-hidden bg-gradient-to-b from-[#8E2C2C] to-[#241510] flex items-center justify-center">
                {/* Traditional South Indian Bride Illustration / Image */}
                <div className="text-center p-4">
                  <div className="w-20 h-20 rounded-full bg-[#C9A24A]/20 border border-[#C9A24A] mx-auto flex items-center justify-center text-4xl mb-2">
                    👰🏻‍♀️
                  </div>
                  <span className="text-xs font-serif text-[#FFF3B0]/80 uppercase tracking-widest block">The Bride</span>
                </div>
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFF3B0]">
              VIJI
            </h3>
            <p className="text-sm font-serif italic text-amber-200/80 mt-0.5">
              Vijayalakshmi E., B.Com., MBA.
            </p>
            <p className="text-xs font-serif text-amber-100/60 mt-1">
              Business Analyst · Daughter of D. Baskaran &amp; Smt. B. Gejalakshmi
            </p>
          </motion.div>

          {/* Center Mandap Ornament */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex flex-col items-center justify-center my-4 md:my-0"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#C9A24A] bg-[#5A1720]/90 flex items-center justify-center text-gold-shimmer text-2xl sm:text-3xl font-serif font-bold shadow-[0_0_25px_rgba(201,162,74,0.4)]">
              &amp;
            </div>
            <span className="text-[#C9A24A] font-serif text-xs tracking-[0.25em] uppercase mt-3">
              UNITED IN LOVE
            </span>
          </motion.div>

          {/* Groom Card (RIGHT) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col items-center group cursor-pointer"
          >
            {/* Traditional Arch Photo Frame */}
            <div className="relative w-56 h-72 sm:w-64 sm:h-80 rounded-t-full rounded-b-2xl border-4 border-[#C9A24A] p-2 bg-[#5A1720]/80 shadow-[0_15px_35px_rgba(0,0,0,0.6)] group-hover:border-[#FFF3B0] group-hover:scale-[1.03] transition-all duration-500 overflow-hidden mb-4">
              <div className="relative w-full h-full rounded-t-full rounded-b-xl overflow-hidden bg-gradient-to-b from-[#8E2C2C] to-[#241510] flex items-center justify-center">
                {/* Traditional South Indian Groom Illustration / Image */}
                <div className="text-center p-4">
                  <div className="w-20 h-20 rounded-full bg-[#C9A24A]/20 border border-[#C9A24A] mx-auto flex items-center justify-center text-4xl mb-2">
                    🤵🏻‍♂️
                  </div>
                  <span className="text-xs font-serif text-[#FFF3B0]/80 uppercase tracking-widest block">The Groom</span>
                </div>
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFF3B0]">
              KEERTHIVASAN
            </h3>
            <p className="text-sm font-serif italic text-amber-200/80 mt-0.5">
              Ranjith Raj B. (Keerthivasan), B.E.
            </p>
            <p className="text-xs font-serif text-amber-100/60 mt-1">
              UX Designer II · Son of D. Elumalai &amp; E. Komathi Elumalai
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
