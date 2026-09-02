"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import GoldDivider from "../ui/GoldDivider";
import ScratchSealCard from "../ui/ScratchSealCard";
import Particles from "../ui/Particles";
import FoilRibbonShower from "../ui/FoilRibbonShower";

// Mangala Muhurtham Target: Sunday, 13 September 2026, 06:30:00 AM IST (Asia/Kolkata, UTC+05:30)
// Absolute Timezone-Safe UTC Target: 13 September 2026, 01:00:00 AM UTC (Month 8 = Sept 0-indexed)
const TARGET_TIMESTAMP_MS = Date.UTC(2026, 8, 13, 1, 0, 0);

// Helper function to calculate exact remaining time from actual current timestamp
function calculateRemainingTime() {
  const now = Date.now();
  const diffMs = TARGET_TIMESTAMP_MS - now;

  if (diffMs <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isArrived: true,
    };
  }

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    isArrived: false,
  };
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState(calculateRemainingTime);
  const [revealedMap, setRevealedMap] = useState<Record<string, boolean>>({});
  const [showPaperFall, setShowPaperFall] = useState(false);
  const hasTriggeredRef = useRef(false);

  const handleRevealChange = useCallback((label: string, revealed: boolean) => {
    setRevealedMap((prev) => {
      const next = { ...prev, [label]: revealed };
      
      const allRevealed =
        next["Days"] && next["Hours"] && next["Minutes"] && next["Seconds"];

      if (allRevealed && !hasTriggeredRef.current) {
        hasTriggeredRef.current = true;
        setShowPaperFall(true);

        setTimeout(() => {
          setShowPaperFall(false);
        }, 5500);
      }

      return next;
    });
  }, []);

  useEffect(() => {
    const updateCountdown = () => {
      const next = calculateRemainingTime();
      setTimeLeft(next);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full py-24 px-4 bg-gradient-to-b from-[#0A2522] via-[#0F2A1E] to-[#14332A] text-amber-50 overflow-hidden border-t border-[#D4AF37]/30 select-none">
      {/* Soft Gold Dot Overlay Pattern */}
      <div className="absolute inset-0 bg-kolam-overlay opacity-25 pointer-events-none" />

      {/* 60fps High-Density Foil Ribbon Shower across full section on 4th reveal */}
      {showPaperFall && <FoilRibbonShower durationMs={5500} />}

      {/* Background Soft Gold Particles */}
      <Particles count={14} />

      {/* --- AMBIENT PEACOCK FEATHER ILLUSTATION ACCENTS --- */}

      {/* Top-Left Peacock Feather SVG Illustration */}
      <div className="absolute top-2 left-2 sm:top-6 sm:left-6 w-32 sm:w-48 pointer-events-none opacity-30 z-0">
        <svg viewBox="0 0 120 180" className="w-full text-[#D4AF37]">
          <path d="M60 180 Q 40 100 60 10" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="60" cy="25" rx="18" ry="14" fill="none" stroke="#0D6E5E" strokeWidth="1.5" />
          <circle cx="60" cy="25" r="8" fill="#1E4D6B" />
          <circle cx="60" cy="25" r="3.5" fill="#FFF3B0" />
          {Array.from({ length: 14 }).map((_, i) => (
            <path
              key={i}
              d={`M60 ${40 + i * 9} Q ${i % 2 === 0 ? 30 : 90} ${45 + i * 9} ${i % 2 === 0 ? 10 : 110} ${35 + i * 9}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
            />
          ))}
        </svg>
      </div>

      {/* Bottom-Right Peacock Feather SVG Illustration (Rotated) */}
      <div className="absolute bottom-2 right-2 sm:bottom-6 sm:right-6 w-32 sm:w-48 pointer-events-none opacity-30 z-0 transform rotate-180">
        <svg viewBox="0 0 120 180" className="w-full text-[#D4AF37]">
          <path d="M60 180 Q 40 100 60 10" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="60" cy="25" rx="18" ry="14" fill="none" stroke="#0D6E5E" strokeWidth="1.5" />
          <circle cx="60" cy="25" r="8" fill="#1E4D6B" />
          <circle cx="60" cy="25" r="3.5" fill="#FFF3B0" />
          {Array.from({ length: 14 }).map((_, i) => (
            <path
              key={i}
              d={`M60 ${40 + i * 9} Q ${i % 2 === 0 ? 30 : 90} ${45 + i * 9} ${i % 2 === 0 ? 10 : 110} ${35 + i * 9}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
            />
          ))}
        </svg>
      </div>

      {/* --- IDLE FLOATING PEACOCK FEATHER PARTICLES (15-20% Opacity Infinite Loop) --- */}
      <motion.div
        animate={{ y: [0, -18, 0], rotate: [-6, 6, -6] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[30%] left-[15%] w-10 sm:w-14 pointer-events-none opacity-20 z-0"
      >
        <svg viewBox="0 0 60 90" className="w-full text-[#D4AF37]">
          <path d="M30 90 Q 20 50 30 5" fill="none" stroke="currentColor" strokeWidth="1" />
          <ellipse cx="30" cy="12" rx="9" ry="7" fill="#0D6E5E" />
          <circle cx="30" cy="12" r="3" fill="#FFF3B0" />
        </svg>
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0], rotate: [8, -8, 8] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[25%] right-[18%] w-10 sm:w-14 pointer-events-none opacity-20 z-0"
      >
        <svg viewBox="0 0 60 90" className="w-full text-[#D4AF37]">
          <path d="M30 90 Q 20 50 30 5" fill="none" stroke="currentColor" strokeWidth="1" />
          <ellipse cx="30" cy="12" rx="9" ry="7" fill="#0D6E5E" />
          <circle cx="30" cy="12" r="3" fill="#FFF3B0" />
        </svg>
      </motion.div>

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* --- DRIFTING FEATHER ENTRANCE ANIMATION ON SCROLL --- */}
        <motion.div
          initial={{ opacity: 0, y: -35, rotate: -15 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-2 w-8 h-12 text-[#D4AF37]"
        >
          <svg viewBox="0 0 40 60" className="w-full h-full filter drop-shadow">
            <path d="M20 60 Q 15 30 20 5" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <ellipse cx="20" cy="10" rx="7" ry="5" fill="#0D6E5E" stroke="#D4AF37" strokeWidth="0.5" />
            <circle cx="20" cy="10" r="2.5" fill="#FFF3B0" />
          </svg>
        </motion.div>

        {/* Section Heading Container */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <span className="text-[#D4AF37] font-serif text-xs sm:text-sm tracking-[0.3em] uppercase block mb-1 font-semibold">
            SHUBHA MUHURTHAM
          </span>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-gold-gradient drop-shadow mb-2">
            The Auspicious Countdown
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
            <GoldDivider symbol="🪶" />
          </motion.div>

          {/* Soft Ivory Quote Text (#F5E6C8 for High Contrast on Green) */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="font-serif italic text-base sm:text-xl text-[#F5E6C8] max-w-2xl mx-auto mt-2 leading-relaxed drop-shadow"
          >
            &ldquo;Under the divine canopy of stars, we count down the moments leading to a beautiful lifetime together.&rdquo;
          </motion.p>
        </motion.div>

        {/* Arrival Banner when Target Time is Reached */}
        {timeLeft.isArrived ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mt-8 mb-10 px-8 py-4 rounded-full bg-gradient-to-r from-[#146B5C] via-[#1E4D45] to-[#146B5C] border-2 border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.5)] flex flex-col items-center text-center"
          >
            <span className="text-[#FFF3B0] font-serif text-lg sm:text-2xl font-bold tracking-widest uppercase">
              THE MOMENT HAS ARRIVED
            </span>
            <span className="text-amber-200 text-xs sm:text-sm font-serif tracking-widest mt-1">
              TODAY IS THE DAY · சுபமுகூர்த்த நன்னாள்
            </span>
          </motion.div>
        ) : (
          /* Scratch Instruction Pill */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-8 mb-10 px-5 py-2.5 rounded-full bg-[#1C3D30] border border-[#D4AF37]/40 backdrop-blur-md inline-flex items-center gap-2.5 shadow-md"
          >
            <span className="w-2 h-2 rounded-full bg-[#FFF3B0] animate-ping" />
            <p className="text-xs sm:text-sm text-[#FFF3B0] font-serif tracking-wide font-medium">
              Gently scratch the golden seals to reveal the time
            </p>
          </motion.div>
        )}

        {/* 4 Circular Peacock Scratch Seals Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 w-full max-w-3xl justify-items-center"
        >
          <ScratchSealCard
            label="Days"
            value={timeLeft.days}
            onRevealChange={(revealed) => handleRevealChange("Days", revealed)}
          />
          <ScratchSealCard
            label="Hours"
            value={timeLeft.hours}
            onRevealChange={(revealed) => handleRevealChange("Hours", revealed)}
          />
          <ScratchSealCard
            label="Minutes"
            value={timeLeft.minutes}
            onRevealChange={(revealed) => handleRevealChange("Minutes", revealed)}
          />
          <ScratchSealCard
            label="Seconds"
            value={timeLeft.seconds}
            onRevealChange={(revealed) => handleRevealChange("Seconds", revealed)}
          />
        </motion.div>
      </div>
    </section>
  );
}
