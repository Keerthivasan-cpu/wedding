"use client";

import React from "react";
import { motion } from "framer-motion";
import GoldDivider from "../ui/GoldDivider";

export default function InvitationSection() {
  return (
    <section id="invitation" className="relative w-full py-24 px-4 bg-[#FFF8E8] text-[#241510] overflow-hidden border-t-2 border-[#C9A24A]/40">
      {/* Background Kolam & Parchment Texture Accent */}
      <div className="absolute inset-0 bg-mandala-pattern opacity-40 pointer-events-none" />

      {/* Traditional Temple Corner Borders */}
      <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#C9A24A] pointer-events-none" />
      <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#C9A24A] pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#C9A24A] pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#C9A24A] pointer-events-none" />

      <div className="max-w-3xl mx-auto flex flex-col items-center text-center relative z-10 py-4">
        {/* Sanskrit Auspicious Header */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-[#8E2C2C] font-serif text-xs sm:text-sm tracking-[0.3em] uppercase block mb-2 font-bold"
        >
          ॥ मङ्गलं भगवान् विष्णुः ॥
        </motion.span>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-3xl sm:text-5xl font-serif font-bold text-[#5A1720] tracking-wide mb-2"
        >
          With the blessings of our families
        </motion.h2>

        {/* Scaled Gold Ornament */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="my-2"
        >
          <GoldDivider symbol="🪔" />
        </motion.div>

        {/* Body Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="font-serif italic text-lg sm:text-2xl text-[#241510]/85 leading-relaxed max-w-xl mx-auto mt-2"
        >
          &ldquo;Two families come together, two hearts begin a new journey, and we invite you to be part of this beautiful celebration.&rdquo;
        </motion.p>
      </div>
    </section>
  );
}
