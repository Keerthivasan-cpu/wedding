"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import GoldDivider from "../ui/GoldDivider";

export default function ClosingSection() {
  return (
    <section className="relative w-full py-32 px-4 bg-[#1C0F0A] text-[#FFF8E8] overflow-hidden select-none">
      {/* Background Darkened Temple Wallpaper */}
      <div className="absolute inset-0 z-0 opacity-25 filter blur-xs pointer-events-none">
        <Image
          src="/images/primary_temple_hero.png"
          alt="Temple Background"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* Atmospheric Overlay */}
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-[#241510]/90 via-[#3D1418]/80 to-[#1C0F0A] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <p className="font-serif italic text-xl sm:text-3xl text-amber-200/90 tracking-wide">
            &ldquo;With love, laughter, and blessings.&rdquo;
          </p>

          <h2 className="text-4xl sm:text-7xl font-serif font-bold text-gold-shimmer drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)] tracking-widest py-2">
            VIJI ♥ KEERTHIVASAN
          </h2>

          <p className="font-serif text-sm sm:text-base text-amber-100/80 uppercase tracking-[0.25em]">
            Thank you for being part of our journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <GoldDivider symbol="🪔" />
        </motion.div>

        {/* Small Temple Bell / Lotus Emblem */}
        <div className="pt-4">
          <div className="w-12 h-12 rounded-full border border-[#C9A24A] bg-[#5A1720]/80 flex items-center justify-center text-gold-shimmer text-xl shadow-lg mx-auto">
            🌸
          </div>
        </div>
      </div>
    </section>
  );
}
