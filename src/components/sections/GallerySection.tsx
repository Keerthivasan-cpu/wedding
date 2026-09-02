"use client";

import React from "react";
import { motion } from "framer-motion";
import GoldDivider from "../ui/GoldDivider";
import { Heart, Sparkles } from "lucide-react";

export default function GallerySection() {
  const galleryItems = [
    { title: "Sacred Moments", subtitle: "Mandapam Blessing", emoji: "🪔", span: "md:col-span-2 md:row-span-2" },
    { title: "Rituals & Joy", subtitle: "Pre-wedding Celebrations", emoji: "🌸", span: "" },
    { title: "Eternal Vows", subtitle: "Mangala Sutra Tying", emoji: "💍", span: "" },
    { title: "Garland Exchange", subtitle: "Maalai Maatral", emoji: "🌺", span: "md:col-span-2" },
    { title: "Feast & Festivities", subtitle: "Grand Celebration", emoji: "✨", span: "" },
  ];

  return (
    <section id="gallery" className="relative w-full py-24 px-4 bg-[#241510] text-[#FFF8E8] overflow-hidden border-t border-[#C9A24A]/30">
      {/* Background Kolam Overlay */}
      <div className="absolute inset-0 bg-kolam-overlay opacity-15 pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#C9A24A] font-serif text-xs sm:text-sm tracking-[0.3em] uppercase block mb-1">
            SACRED MEMORIES
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-gold-shimmer drop-shadow">
            Wedding Gallery
          </h2>
          <GoldDivider symbol="📷" />
        </motion.div>

        {/* Luxury Editorial Masonry Grid */}
        <div className="w-full mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
          {galleryItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`relative min-h-[220px] rounded-2xl overflow-hidden border-2 border-[#C9A24A]/40 bg-gradient-to-b from-[#5A1720] to-[#241510] p-6 flex flex-col justify-end shadow-lg group hover:border-[#FFF3B0] transition-all duration-500 cursor-pointer ${item.span}`}
            >
              {/* Decorative Accent Symbol */}
              <div className="absolute top-4 right-4 text-3xl opacity-80 group-hover:scale-125 transition-transform duration-300">
                {item.emoji}
              </div>

              {/* Golden Glow Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#241510] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition duration-300" />

              <div className="relative z-10">
                <span className="text-xs font-serif text-[#C9A24A] tracking-widest uppercase block mb-1">
                  {item.subtitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FFF3B0] group-hover:translate-x-1 transition-transform">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
