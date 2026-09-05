"use client";

import React from "react";
import { motion } from "framer-motion";
import GoldDivider from "../ui/GoldDivider";
import BananaThoranam from "../ui/BananaThoranam";
import { HeartHandshake, ShieldCheck } from "lucide-react";

export default function FamilySection() {
  return (
    <section className="relative w-full py-20 px-4 bg-gradient-to-b from-[#123A34] via-[#0E2E2B] to-[#0A2522] text-amber-50 overflow-hidden border-t border-[#D4AF37]/20">
      {/* Background Kolam Overlay Lines */}
      <div className="absolute inset-0 bg-kolam-overlay opacity-40 pointer-events-none" />

      {/* BANANA LEAF THORANAM (Decorative Garland Draped Across TOP of Section) */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <BananaThoranam count={14} />
      </div>

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10 pt-6">
        {/* Header Container with Staggered Entrance Animations */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Eyebrow Kicker */}
          <span className="text-[#D4AF37] font-serif text-xs sm:text-sm tracking-[0.3em] uppercase block mb-1 font-semibold">
            MANGALA SHUBH
          </span>

          {/* Section Title */}
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-gold-gradient drop-shadow mb-2">
            Family &amp; Blessings
          </h2>

          {/* Animated Center-Outward Drawing Divider Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
            style={{ originX: 0.5 }}
            className="w-full flex justify-center my-1"
          >
            <GoldDivider symbol="❖" />
          </motion.div>

          {/* Subtitle Line (Staggered Fade In) */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="font-serif italic text-sm sm:text-lg text-amber-200/80 max-w-xl mx-auto mt-1"
          >
            With the divine blessings of our ancestors &amp; almighty
          </motion.p>
        </motion.div>

        {/* Two Column Grid — Groom Side (LEFT) & Bride Side (RIGHT) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-12 mb-14 text-center">
          {/* 1. PARENTS OF THE GROOM CARD (LEFT CARD — Baskaran details with Heart icon) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="glass-temple-card rounded-2xl p-8 flex flex-col items-center shadow-temple-card relative group hover:border-[#D4AF37]/60 transition-all duration-300 overflow-hidden"
          >
            {/* Mini Thoranam Accent along Top Card Edge */}
            <div className="absolute top-0 left-0 right-0 z-10">
              <BananaThoranam count={7} isMini={true} />
            </div>

            {/* Heart Bond Icon with Spring Scale Bounce & Glow Pulse */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 18,
                delay: 0.4,
              }}
              className="relative mt-3 mb-4"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 15px rgba(212,175,55,0.3)",
                    "0 0 30px rgba(212,175,55,0.7)",
                    "0 0 15px rgba(212,175,55,0.3)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1E4D45] to-[#0E2E2B] border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-gold-lg"
              >
                <HeartHandshake className="w-8 h-8" />
              </motion.div>
            </motion.div>

            {/* Card Label */}
            <span className="text-[#D4AF37] font-serif text-xs tracking-widest uppercase mb-2 font-semibold">
              PARENTS OF THE GROOM
            </span>

            {/* Parents Names */}
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFF3B0] mb-1">
              D. Baskaran &amp; Smt. B. Gejalakshmi Baskaran
            </h3>

            {/* Blessing Quote (Reveals slightly after names) */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="font-serif italic text-sm text-amber-200/90 mt-3 leading-relaxed"
            >
              &ldquo;Showering endless blessings for a lifetime of prospering harmony.&rdquo;
            </motion.p>

            {/* Groom Details Line */}
            <div className="mt-6 pt-4 border-t border-[#D4AF37]/20 w-full text-center">
              <span className="font-serif text-xs text-amber-300/80 tracking-wider">
                Groom:{" "}
                <span className="text-base sm:text-lg text-amber-100 font-bold">Ranjith Raj</span>{" "}
                <strong className="text-amber-100 font-semibold">B., B.E.</strong> (UX Designer II)
              </span>
            </div>
          </motion.div>

          {/* 2. PARENTS OF THE BRIDE CARD (RIGHT CARD — Ezhumalai details with Shield icon) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            className="glass-temple-card rounded-2xl p-8 flex flex-col items-center shadow-temple-card relative group hover:border-[#D4AF37]/60 transition-all duration-300 overflow-hidden"
          >
            {/* Mini Thoranam Accent along Top Card Edge */}
            <div className="absolute top-0 left-0 right-0 z-10">
              <BananaThoranam count={7} isMini={true} />
            </div>

            {/* Protection Shield Icon with Spring Scale Bounce & Glow Pulse */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 18,
                delay: 0.5,
              }}
              className="relative mt-3 mb-4"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 15px rgba(212,175,55,0.3)",
                    "0 0 30px rgba(212,175,55,0.7)",
                    "0 0 15px rgba(212,175,55,0.3)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1E4D45] to-[#0E2E2B] border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-gold-lg"
              >
                <ShieldCheck className="w-8 h-8" />
              </motion.div>
            </motion.div>

            {/* Card Label */}
            <span className="text-[#D4AF37] font-serif text-xs tracking-widest uppercase mb-2 font-semibold">
              PARENTS OF THE BRIDE
            </span>

            {/* Parents Names */}
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFF3B0] mb-1">
              D. Ezhumalai &amp; E. Gomathi Ezhumalai
            </h3>

            {/* Blessing Quote (Reveals slightly after names) */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="font-serif italic text-sm text-amber-200/90 mt-3 leading-relaxed"
            >
              &ldquo;Embracing this sacred bond with joy, love, and traditional warmth.&rdquo;
            </motion.p>

            {/* Bride Details Line */}
            <div className="mt-6 pt-4 border-t border-[#D4AF37]/20 w-full text-center">
              <span className="font-serif text-xs text-amber-300/80 tracking-wider">
                Bride:{" "}
                <span className="text-base sm:text-lg text-amber-100 font-bold">Vijayalakshmi</span>{" "}
                <strong className="text-amber-100 font-semibold">E., B.Com., MBA.</strong> (Business Analyst)
              </span>
            </div>
          </motion.div>
        </div>

        {/* Formal Invitation Statement Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="w-full max-w-3xl glass-temple-card rounded-3xl p-8 sm:p-12 border-2 border-[#D4AF37]/40 shadow-gold-lg relative overflow-hidden"
        >
          {/* Ornate Corner Accents */}
          <div className="absolute top-2 left-2 text-[#D4AF37]/40 text-xl font-serif">
            ✦
          </div>
          <div className="absolute top-2 right-2 text-[#D4AF37]/40 text-xl font-serif">
            ✦
          </div>
          <div className="absolute bottom-2 left-2 text-[#D4AF37]/40 text-xl font-serif">
            ✦
          </div>
          <div className="absolute bottom-2 right-2 text-[#D4AF37]/40 text-xl font-serif">
            ✦
          </div>

          <p className="font-serif italic text-base sm:text-xl text-amber-100/90 leading-relaxed">
            &ldquo;Cordially request the honour of your esteemed presence to celebrate the auspicious wedding of their beloved children&rdquo;
          </p>

          <div className="my-6">
            <h3 className="text-3xl sm:text-5xl font-serif font-bold text-gold-gradient tracking-wide">
              Vijayalakshmi &amp; Ranjith Raj
            </h3>
          </div>

          <p className="font-serif text-amber-200/80 text-sm sm:text-base tracking-widest uppercase">
            Thiruverkadu, Chennai · Saturday &amp; Sunday
          </p>
        </motion.div>
      </div>
    </section>
  );
}
