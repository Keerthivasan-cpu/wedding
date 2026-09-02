"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FooterSection() {
  return (
    <footer className="relative w-full py-20 px-4 bg-gradient-to-b from-[#0A2522] via-[#0E2E2B] to-[#071917] text-amber-50 text-center overflow-hidden border-t-2 border-[#D4AF37]/50 select-none">
      {/* Background Kolam Pattern */}
      <div className="absolute inset-0 bg-kolam-overlay opacity-25 pointer-events-none" />

      {/* Subtle Slow-Moving Radial Golden Light Sweep behind Ganesha Icon (8s loop) */}
      <motion.div
        animate={{
          opacity: [0.2, 0.45, 0.2],
          scale: [0.9, 1.15, 0.9],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-12 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10 space-y-6">
        {/* 1. LORD GANESHA GOLD EMBLEM (Silhouette Line-Art SVG in Glowing Circle) */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 18px rgba(212,175,55,0.4), inset 0 0 10px rgba(212,175,55,0.2)",
                "0 0 35px rgba(212,175,55,0.85), inset 0 0 20px rgba(212,175,55,0.4)",
                "0 0 18px rgba(212,175,55,0.4), inset 0 0 10px rgba(212,175,55,0.2)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-[#1E4D45] via-[#0E2E2B] to-[#071917] border-2 border-[#D4AF37] flex items-center justify-center shadow-gold-lg"
          >
            {/* Lord Ganesha Gold Silhouette SVG */}
            <svg viewBox="0 0 100 100" className="w-12 h-12 sm:w-14 sm:h-14 text-[#FFF3B0]">
              <defs>
                <linearGradient id="footerGaneshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF9D2" />
                  <stop offset="50%" stopColor="#F5B041" />
                  <stop offset="100%" stopColor="#D4AF37" />
                </linearGradient>
              </defs>
              <path
                d="M50 12 C42 12 35 19 35 29 C35 35 38 39 42 42 C35 45 30 52 30 62 C30 72 38 79 50 79 C62 79 70 72 70 62 C70 52 65 45 58 42 C62 39 65 35 65 29 C65 19 58 12 50 12 Z"
                fill="url(#footerGaneshGrad)"
                opacity="0.9"
              />
              <circle cx="50" cy="29" r="4.5" fill="#FFF9D2" />
              <path d="M48 42 Q 40 57 52 67 Q 56 70 50 73" fill="none" stroke="#0E2E2B" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </motion.div>
        </motion.div>

        {/* 2. CLOSING BLESSING QUOTE (Soft Ivory/Cream #F5E6C8 for High Contrast) */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-serif italic text-base sm:text-xl text-[#F5E6C8] max-w-xl mx-auto leading-relaxed drop-shadow"
        >
          &ldquo;With the grace of Lord Ganesha, may this divine union be blessed with eternal health, happiness, prosperity, and peace.&rdquo;
        </motion.p>

        {/* 3. DIVIDER LINE WITH GLOWING DIYA LAMP SVG */}
        <div className="w-full flex items-center justify-center gap-3 my-2">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ originX: 1 }}
            className="h-[1px] w-24 sm:w-40 bg-gradient-to-r from-transparent to-[#D4AF37]"
          />

          {/* Diya Lamp SVG with Flickering Flame */}
          <div className="relative flex flex-col items-center">
            {/* Flickering Flame */}
            <motion.div
              animate={{
                opacity: [0.75, 1, 0.8, 1],
                scale: [0.92, 1.08, 0.95, 1.05],
              }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-2.5 h-3.5 bg-gradient-to-t from-[#E67E22] via-[#F39C12] to-[#FFF3B0] rounded-full blur-[0.5px] -mb-1 shadow-[0_0_10px_#F5B041]"
            />
            {/* Lamp Base */}
            <svg viewBox="0 0 40 20" className="w-6 h-4 text-[#D4AF37]">
              <path d="M5 5 Q20 20 35 5 Q20 12 5 5 Z" fill="currentColor" stroke="#FFF3B0" strokeWidth="0.5" />
            </svg>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ originX: 0 }}
            className="h-[1px] w-24 sm:w-40 bg-gradient-to-l from-transparent to-[#D4AF37]"
          />
        </div>

        {/* 4. COUPLE NAMES WITH LETTER-SPACING EXPAND REVEAL */}
        <div className="space-y-1.5 py-1">
          <motion.h3
            initial={{ opacity: 0, letterSpacing: "0.05em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.18em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            className="text-xl sm:text-3xl font-[#FFF3B0] font-serif font-bold text-gold-gradient drop-shadow"
          >
            VIJAYALAKSHMI &amp; RANJITH RAJ
          </motion.h3>

          {/* 5. DATE & LOCATION (Muted Gold #B8935A) */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xs sm:text-sm font-serif text-[#B8935A] tracking-[0.25em] uppercase font-semibold"
          >
            13 SEPTEMBER 2026 · THIRUVERKADU, CHENNAI
          </motion.p>
        </div>

        {/* FOOTNOTE CREDIT */}
        <p className="text-[11px] font-serif text-[#B8935A]/70 pt-1">
          Made with love &amp; devotion for the Wedding of Vijayalakshmi &amp; Ranjith Raj
        </p>

        {/* 6. THANK YOU FOR BLESSINGS BLOCK (NANDRI / THANK YOU) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="w-full max-w-2xl pt-6 border-t border-[#D4AF37]/30 mt-6 space-y-3"
        >
          {/* Folded Hands Namaste Icon with Scale-Bounce Entrance */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: [0, 1.2, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.75, ease: "easeOut" }}
            className="w-10 h-10 rounded-full bg-[#1E4D45]/80 border border-[#D4AF37]/60 mx-auto flex items-center justify-center text-amber-200 text-lg shadow-md"
          >
            🙏
          </motion.div>

          {/* Bilingual Heading */}
          <h4 className="text-lg sm:text-2xl font-serif font-bold text-[#FFF3B0] tracking-widest uppercase">
            நன்றி · THANK YOU
          </h4>

          {/* Thank You Message */}
          <p className="font-serif italic text-sm sm:text-base text-[#F5E6C8] max-w-lg mx-auto leading-relaxed">
            &ldquo;Your presence and blessings mean the world to us. Thank you for being part of our sacred union.&rdquo;
          </p>

          {/* Signature */}
          <p className="font-serif italic text-sm text-[#D4AF37] font-semibold pt-1">
            — Vijayalakshmi &amp; Ranjith Raj
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
