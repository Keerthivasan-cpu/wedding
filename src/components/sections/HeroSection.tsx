"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Calendar, ChevronDown, Sparkles } from "lucide-react";
import Particles from "../ui/Particles";
import GoldDivider from "../ui/GoldDivider";
import { getGoogleCalendarLink } from "@/lib/calendar";

export default function HeroSection() {
  const calendarUrl = getGoogleCalendarLink();

  // Stagger Container Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const bellVariants: Variants = {
    hidden: { opacity: 0, rotate: -15 },
    show: {
      opacity: 0.9,
      rotate: [ -15, 7, -3, 0 ],
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  return (
    <section id="hero" className="relative min-h-screen w-full flex flex-col items-center justify-between bg-gradient-to-b from-[#2D0913] via-[#3B0F1A] to-[#4A1422] text-amber-50 px-4 py-12 overflow-hidden">
      {/* Background Kolam Pattern with Subtle Opacity Breathing */}
      <motion.div
        animate={{ opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-kolam-overlay pointer-events-none"
      />

      {/* Floating Sparkles & Petals */}
      <Particles count={18} />

      {/* Golden Central Ambient Breathing Glow */}
      <motion.div
        animate={{ opacity: [0.15, 0.28, 0.15], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[680px] h-[380px] sm:h-[680px] bg-amber-500/15 rounded-full blur-3xl pointer-events-none"
      />

      {/* --- CORNER ORNAMENTS --- */}

      {/* Top-Left: Filigree Curl + Hanging Bell */}
      <motion.div
        variants={bellVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        style={{ transformOrigin: "top center" }}
        className="absolute top-0 left-2 sm:left-8 w-28 sm:w-40 pointer-events-none z-10"
      >
        <svg viewBox="0 0 120 220" className="w-full text-[#D4AF37]">
          <path
            d="M5 5 C 40 5, 60 25, 60 60 C 60 95, 20 110, 35 140 Q 45 160 70 170"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.4"
          />
          <path
            d="M5 25 C 25 25, 45 35, 45 60 Q 45 80 20 90"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.3"
          />
          <line x1="60" y1="0" x2="60" y2="100" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
          <path d="M60 25 Q 40 45 60 75 Q 80 45 60 25 Z" fill="#1B4D3E" opacity="0.6" stroke="currentColor" strokeWidth="1" />
          <g transform="translate(40, 100)">
            <path d="M20 0 L20 10 M10 10 C10 10 5 25 0 32 C-2 34 0 38 4 38 L36 38 C40 38 42 34 40 32 C35 25 30 10 30 10 Z" fill="#D4AF37" />
            <circle cx="20" cy="42" r="4" fill="#FFF3B0" />
          </g>
        </svg>
      </motion.div>

      {/* Top-Right: Filigree Curl + Hanging Bell */}
      <motion.div
        variants={bellVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        style={{ transformOrigin: "top center" }}
        className="absolute top-0 right-2 sm:right-8 w-28 sm:w-40 pointer-events-none z-10"
      >
        <svg viewBox="0 0 120 220" className="w-full text-[#D4AF37]">
          <path
            d="M115 5 C 80 5, 60 25, 60 60 C 60 95, 100 110, 85 140 Q 75 160 50 170"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.4"
          />
          <path
            d="M115 25 C 95 25, 75 35, 75 60 Q 75 80 100 90"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.3"
          />
          <line x1="60" y1="0" x2="60" y2="100" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
          <path d="M60 25 Q 40 45 60 75 Q 80 45 60 25 Z" fill="#1B4D3E" opacity="0.6" stroke="currentColor" strokeWidth="1" />
          <g transform="translate(40, 100)">
            <path d="M20 0 L20 10 M10 10 C10 10 5 25 0 32 C-2 34 0 38 4 38 L36 38 C40 38 42 34 40 32 C35 25 30 10 30 10 Z" fill="#D4AF37" />
            <circle cx="20" cy="42" r="4" fill="#FFF3B0" />
          </g>
        </svg>
      </motion.div>

      {/* Bottom-Left: Lotus Peacock Corner Flourish */}
      <div className="absolute bottom-2 left-2 sm:bottom-6 sm:left-6 w-24 sm:w-36 pointer-events-none z-10 opacity-45">
        <svg viewBox="0 0 100 100" className="w-full text-[#D4AF37]">
          <path d="M0 100 L0 50 Q 0 0 50 0 L100 0" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <path d="M15 100 Q 15 30 70 15" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 2" />
          <path d="M30 70 Q40 50 30 30 Q20 50 30 70 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <path d="M30 45 Q45 40 55 50 Q45 60 30 50 Z" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="30" cy="50" r="3" fill="currentColor" opacity="0.6" />
        </svg>
      </div>

      {/* Bottom-Right: Lotus Peacock Corner Flourish */}
      <div className="absolute bottom-2 right-2 sm:bottom-6 sm:right-6 w-24 sm:w-36 pointer-events-none z-10 opacity-50 transform scale-x-[-1]">
        <svg viewBox="0 0 100 100" className="w-full text-[#D4AF37]">
          <path d="M0 100 L0 50 Q 0 0 50 0 L100 0" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <path d="M15 100 Q 15 30 70 15" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 2" />
          <path d="M30 70 Q40 50 30 30 Q20 50 30 70 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <path d="M30 45 Q45 40 55 50 Q45 60 30 50 Z" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="30" cy="50" r="3" fill="currentColor" opacity="0.6" />
        </svg>
      </div>

      {/* Top Auspicious Header Banner & Ganesha Invocation Line */}
      <motion.div
        initial={{ y: -18, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center mt-4 sm:mt-6 flex flex-col items-center gap-1"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-[#D4AF37]/30 text-[#FFF3B0] text-xs font-serif tracking-widest uppercase">
          <span className="text-sm">🕉️</span>
          <span>விநாயகர் துணை · VINAYAGAR THUNAI</span>
        </div>
        <p className="font-tamil text-amber-300/80 text-xs sm:text-sm tracking-widest uppercase mt-1">
          SACRED UNION · சுப திருமணம்
        </p>
      </motion.div>

      {/* Center Staggered Content Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative z-10 my-auto flex flex-col items-center text-center max-w-4xl px-2"
      >
        {/* Background Slowly Rotating Mandala Medallion */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[580px] h-[340px] sm:h-[580px] opacity-15 pointer-events-none"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full text-[#D4AF37]">
            <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 2" />
            <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.6" />
            {Array.from({ length: 12 }).map((_, i) => (
              <path
                key={i}
                d="M100 15 C110 40 110 60 100 70 C90 60 90 40 100 15 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
                transform={`rotate(${i * 30} 100 100)`}
              />
            ))}
            {Array.from({ length: 24 }).map((_, i) => (
              <circle
                key={i}
                cx="100"
                cy="18"
                r="2"
                fill="currentColor"
                transform={`rotate(${i * 15} 100 100)`}
              />
            ))}
          </svg>
        </motion.div>

        {/* Main Names Banner */}
        <motion.div variants={itemVariants} className="space-y-1 sm:space-y-3">
          <h1 className="text-4xl sm:text-7xl md:text-8xl font-serif font-bold text-gold-shimmer drop-shadow-[0_4px_25px_rgba(0,0,0,0.6)] leading-tight tracking-tight">
            Vijayalakshmi
          </h1>

          <div className="flex items-center justify-center gap-4 py-1">
            <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            <span className="font-serif italic text-2xl sm:text-4xl text-amber-200/90">&amp;</span>
            <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          </div>

          <h1 className="text-4xl sm:text-7xl md:text-8xl font-serif font-bold text-gold-shimmer drop-shadow-[0_4px_25px_rgba(0,0,0,0.6)] leading-tight tracking-tight">
            Ranjith Raj
          </h1>
        </motion.div>

        {/* Tagline Quote */}
        <motion.p
          variants={itemVariants}
          className="font-serif italic text-lg sm:text-2xl text-amber-100/90 mt-6 max-w-xl leading-relaxed"
        >
          &ldquo;Two hearts, one beautiful journey under the divine canopy of eternal love.&rdquo;
        </motion.p>

        {/* Ornate Divider */}
        <motion.div variants={itemVariants}>
          <GoldDivider />
        </motion.div>

        {/* Date & Venue Container */}
        <motion.div variants={itemVariants} className="flex flex-col items-center mt-2">
          <span className="text-[#D4AF37] text-xs sm:text-sm font-serif tracking-[0.3em] uppercase mb-1">
            SAVE THE DATE
          </span>
          <div className="text-2xl sm:text-4xl font-serif font-semibold text-[#FFF3B0] tracking-widest drop-shadow">
            13 · SEPTEMBER · 2026
          </div>
          <p className="text-amber-200/90 text-xs sm:text-sm font-serif mt-1">
            Ramalaya Kalyana Mandapam, Thiruverkadu, Chennai
          </p>
          <p className="text-amber-200/70 text-xs font-serif mt-0.5">
            Sunday · Mangala Muhurtham (6:30 AM – 8:00 AM)
          </p>
        </motion.div>

        {/* Add to Google Calendar Button */}
        <motion.div variants={itemVariants} className="mt-8">
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gold-gradient text-neutral-950 font-serif font-bold text-sm sm:text-base tracking-wide shadow-gold-lg hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 group cursor-pointer hover:shadow-[0_10px_35px_rgba(212,175,55,0.45)]"
          >
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-900 group-hover:rotate-12 transition-transform" />
            <span>Add to Google Calendar</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom Bouncing Scroll to Explore Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="z-10 flex flex-col items-center mt-6"
      >
        <span className="text-[#D4AF37]/80 text-xs font-serif tracking-widest uppercase mb-1">
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-[#D4AF37]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
