"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Menu, X, Music } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const audioContextRef = React.useRef<AudioContext | null>(null);
  const oscIntervalRef = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Web Audio Synthesized Temple Nadaswaram & Bell Ambient Sound Generator
  const toggleMusic = () => {
    if (isPlaying) {
      if (oscIntervalRef.current) clearInterval(oscIntervalRef.current);
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      setIsPlaying(false);
    } else {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        // Pentatonic Raga notes frequencies (Hz) for temple ambient tune
        const ragamNotes = [293.66, 329.63, 369.99, 440.0, 493.88, 587.33];
        let noteIdx = 0;

        const playNote = () => {
          if (!audioContextRef.current) return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = "triangle";
          const freq = ragamNotes[noteIdx % ragamNotes.length];
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          gain.gain.setValueAtTime(0.08, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + 1.8);
          noteIdx++;
        };

        playNote();
        oscIntervalRef.current = setInterval(playNote, 1200);
        setIsPlaying(true);
      } catch (e) {
        console.warn("Audio toggle error:", e);
      }
    }
  };

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Our Story", href: "#couple" },
    { name: "Events", href: "#events" },
    { name: "Venue", href: "#venue" },
    { name: "Gallery", href: "#gallery" },
    { name: "RSVP", href: "#rsvp" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-[#241510]/85 backdrop-blur-md border-b border-[#D4AF37]/30 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo / Monogram */}
          <a href="#hero" className="flex items-center gap-2 font-serif text-lg sm:text-xl font-bold text-gold-gradient tracking-widest">
            <span className="text-[#D4AF37]">V</span>
            <span className="text-amber-200/60 font-serif italic text-sm">♥</span>
            <span className="text-[#D4AF37]">K</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 font-serif text-sm tracking-widest text-[#FFF8E8]/90">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#D4AF37] transition duration-300 relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action: Music Toggle & Mobile Menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMusic}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-serif tracking-wider transition-all duration-300 cursor-pointer ${
                isPlaying
                  ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#FFF3B0] shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                  : "bg-[#241510]/60 border-[#D4AF37]/30 text-[#FFF8E8]/70 hover:border-[#D4AF37]/60"
              }`}
              aria-label="Toggle Temple Music"
            >
              <Music className={`w-3.5 h-3.5 ${isPlaying ? "animate-spin text-[#D4AF37]" : ""}`} />
              <span>{isPlaying ? "♪ Playing" : "♪ Music"}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#FFF8E8] hover:text-[#D4AF37] transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[60px] z-30 bg-[#241510]/95 backdrop-blur-xl border-b border-[#D4AF37]/40 py-6 px-6 md:hidden shadow-2xl flex flex-col items-center text-center space-y-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-serif text-[#FFF8E8] hover:text-[#D4AF37] tracking-widest py-1 border-b border-transparent hover:border-[#D4AF37] transition"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
