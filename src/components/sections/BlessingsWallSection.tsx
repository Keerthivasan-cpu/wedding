"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { fetchBlessings, RsvpRecord } from "@/lib/supabase";
import { Sparkles, MessageSquareQuote } from "lucide-react";

interface BlessingsWallSectionProps {
  refreshTrigger?: number;
}

export default function BlessingsWallSection({ refreshTrigger = 0 }: BlessingsWallSectionProps) {
  const [blessings, setBlessings] = useState<RsvpRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBlessings = useCallback(async () => {
    setLoading(true);
    const data = await fetchBlessings();
    setBlessings(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadBlessings();
  }, [loadBlessings, refreshTrigger]);

  return (
    <section className="relative w-full py-16 px-4 bg-gradient-to-b from-[#1f0d10] via-[#240d12] to-[#2b1015] text-[#f0e6dd] overflow-hidden border-t border-[#d4af7a]/15">
      {/* Background Kolam Accent */}
      <div className="absolute inset-0 bg-kolam-overlay opacity-15 pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Blessings List Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {loading ? (
            <div className="col-span-full py-12 text-center font-serif text-[#d4af7a]/60 animate-pulse">
              Loading warm blessings...
            </div>
          ) : blessings.length === 0 ? (
            <div className="col-span-full py-12 text-center font-serif text-[#d4af7a]/80 text-lg italic">
              Be the first to bless the couple.
            </div>
          ) : (
            blessings.map((b, idx) => (
              <motion.div
                key={b.id || idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="rounded-2xl p-6 bg-[#3b151e]/60 backdrop-blur-md border border-[#d4af7a]/25 shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative flex flex-col justify-between hover:border-[#d4af7a]/60 transition duration-300 group"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <MessageSquareQuote className="w-5 h-5 text-[#d4af7a] shrink-0" />
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-[#f0e6dd]">
                      {b.guest_name}
                    </h3>
                  </div>

                  {/* Blessing Quote Message */}
                  <p className="font-serif italic text-sm text-[#f0e6dd]/90 leading-relaxed pl-7 border-l-2 border-[#d4af7a]/40 py-1">
                    &ldquo;{b.message}&rdquo;
                  </p>
                </div>

                {/* Plaque Footer Accent */}
                <div className="mt-5 pt-3 border-t border-[#d4af7a]/15 flex items-center justify-between text-[11px] font-sans text-[#d4af7a]/70">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Sparkles className="w-3 h-3 text-[#d4af7a]" /> Shared with Love
                  </span>
                  <span>
                    {b.created_at
                      ? new Date(b.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric" })
                      : "Recently"}
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
