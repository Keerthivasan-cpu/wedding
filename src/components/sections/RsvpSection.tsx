"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import FlowerDropAnimation from "../ui/FlowerDropAnimation";
import { submitRsvp } from "@/lib/supabase";
import { CheckCircle2, User, Send, Heart } from "lucide-react";

interface RsvpSectionProps {
  onRsvpSuccess?: () => void;
}

export default function RsvpSection({ onRsvpSuccess }: RsvpSectionProps) {
  const [guestName, setGuestName] = useState("");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!message.trim()) {
      setErrorMessage("Please enter your message of blessing.");
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    const res = await submitRsvp({
      guest_name: guestName.trim(),
      attendee_count: 1,
      attending: true,
      side: "groom",
      message: message.trim(),
    });

    setSubmitting(false);

    if (res.success) {
      setSubmitted(true);
      // Trigger golden confetti burst
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#D4AF37", "#FFF3B0", "#E5C158", "#FF6B8B", "#FF8008"],
      });
      if (onRsvpSuccess) onRsvpSuccess();
    } else {
      setErrorMessage(res.error || "Failed to submit blessing. Please try again.");
    }
  };

  return (
    <section id="rsvp" className="relative w-full py-20 px-4 bg-gradient-to-b from-[#2B0A12] via-[#380E18] to-[#23070E] text-[#FFF8E7] overflow-hidden border-t border-[#D4AF37]/30">
      {/* Background Kolam Pattern */}
      <div className="absolute inset-0 bg-kolam-overlay opacity-20 pointer-events-none" />

      {/* Flower Drop Animation (Jasmine, Marigold, Rose & Gold Petals) */}
      <FlowerDropAnimation count={28} />

      {/* Central Golden Light Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto flex flex-col items-center text-center relative z-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Eyebrow in Tamil Script */}
          <span className="text-[#FFF3B0] font-tamil text-base sm:text-lg tracking-[0.25em] uppercase font-bold block mb-1 drop-shadow-[0_2px_8px_rgba(212,175,55,0.6)]">
            வாழ்த்துக்கள்
          </span>

          {/* Large Display Heading */}
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-gold-shimmer drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)] tracking-wide">
            Blessings &amp; Wishes
          </h2>

          {/* Small Ornamental Gold Divider */}
          <div className="flex items-center justify-center gap-3 my-4">
            <div className="h-[1px] w-14 sm:w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-[#D4AF37]" />
            <span className="text-[#FFF3B0] text-sm font-serif select-none drop-shadow">❣</span>
            <div className="h-[1px] w-14 sm:w-24 bg-gradient-to-l from-transparent via-[#D4AF37] to-[#D4AF37]" />
          </div>

          {/* Subtitle */}
          <p className="font-serif italic text-base sm:text-lg text-[#FFF3B0]/95 max-w-xl mx-auto leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
            Leave a wish for the couple. Messages appear here once the family reviews them.
          </p>
        </motion.div>

        {/* Blessing Card Form Container with Vibrant Gold Border Glow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full mt-10 rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-[#4A1422]/90 via-[#3B0F1A]/90 to-[#2A0912]/95 backdrop-blur-md border-2 border-[#D4AF37]/60 shadow-[0_15px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.25)] text-left relative overflow-hidden"
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-950/90 border border-rose-500/60 text-rose-100 text-xs sm:text-sm font-sans font-medium">
                  {errorMessage}
                </div>
              )}

              {/* YOUR NAME */}
              <div>
                <label className="block text-[#F5B041] font-sans text-xs tracking-[0.2em] font-bold uppercase mb-2 drop-shadow">
                  YOUR NAME
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Enter your name or family name"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#1C0409]/95 border-2 border-[#D4AF37]/45 text-[#FFF8E7] placeholder-[#E8D6C0]/50 text-sm sm:text-base font-semibold focus:outline-none focus:border-[#FFF3B0] focus:ring-2 focus:ring-[#D4AF37]/70 transition shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)] font-sans"
                  />
                </div>
              </div>

              {/* YOUR BLESSING */}
              <div>
                <label className="block text-[#F5B041] font-sans text-xs tracking-[0.2em] font-bold uppercase mb-2 drop-shadow">
                  YOUR BLESSING
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your loving blessings and wishes to Vijayalakshmi & Ranjith…"
                  className="w-full p-4 rounded-xl bg-[#1C0409]/95 border-2 border-[#D4AF37]/45 text-[#FFF8E7] placeholder-[#E8D6C0]/50 text-sm sm:text-base font-semibold focus:outline-none focus:border-[#FFF3B0] focus:ring-2 focus:ring-[#D4AF37]/70 transition shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)] font-sans"
                />
              </div>

              {/* Send blessing Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#C9A45C] text-[#1F070E] font-serif font-bold text-base sm:text-lg tracking-wider shadow-[0_8px_30px_rgba(212,175,55,0.45)] hover:shadow-[0_12px_40px_rgba(212,175,55,0.7)] hover:scale-[1.02] active:scale-[0.98] transition duration-300 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
                <span>{submitting ? "Sending Blessing..." : "Send blessing"}</span>
              </button>
            </form>
          ) : (
            /* Success View State */
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-6 space-y-4 relative z-10"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C9A45C] mx-auto flex items-center justify-center text-[#1F070E] shadow-[0_0_30px_rgba(212,175,55,0.8)] animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h3 className="text-3xl font-serif font-bold text-gold-shimmer">
                Dhanyavadham!
              </h3>

              <p className="text-[#FFF3B0] font-sans text-xs uppercase tracking-widest font-bold">
                Your blessing has been sent joyfully
              </p>

              <p className="font-serif italic text-[#FFF8E7]/95 text-base sm:text-lg leading-relaxed max-w-md mx-auto">
                &ldquo;Thank you for showering Vijayalakshmi &amp; Ranjith Raj with your warm wishes. Your blessing has been submitted for review!&rdquo;
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
