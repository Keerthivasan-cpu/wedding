"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, ExternalLink } from "lucide-react";
import GoldDivider from "../ui/GoldDivider";

export default function VenueSection() {
  const mapsUrl =
    "https://www.google.com/maps/search/?api=1&query=Ramalaya+Kalyana+Mandapam+Koladi+Road+Thiruverkadu+Chennai";

  return (
    <section id="venue" className="relative w-full py-24 px-4 bg-gradient-to-b from-[#241510] via-[#3D1418] to-[#241510] text-[#FFF8E8] overflow-hidden border-t border-[#C9A24A]/30">
      {/* Background Kolam Overlay */}
      <div className="absolute inset-0 bg-kolam-overlay opacity-15 pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#C9A24A] font-serif text-xs sm:text-sm tracking-[0.3em] uppercase block mb-1">
            SACRED DESTINATION
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-gold-shimmer drop-shadow">
            The Wedding Venue
          </h2>
          <GoldDivider symbol="🛕" />
        </motion.div>

        {/* Venue Card Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full mt-10 rounded-3xl overflow-hidden border-2 border-[#C9A24A]/50 bg-[#5A1720]/80 shadow-[0_20px_50px_rgba(0,0,0,0.7)] text-left relative"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Content Column */}
            <div className="p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[#C9A24A] font-serif text-xs tracking-[0.25em] uppercase font-bold block mb-2">
                  THE VENUE
                </span>
                <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#FFF3B0]">
                  Ramalaya Kalyana Mandapam
                </h3>
                <p className="text-sm font-serif italic text-amber-200/80 mt-1">
                  KNV Nagar, Koladi Road, Thiruverkadu, Chennai – 600 077
                </p>
              </div>

              <div className="space-y-3 py-4 border-y border-[#C9A24A]/25 text-xs sm:text-sm font-serif text-amber-100/90">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#C9A24A] shrink-0" />
                  <span>Landmark: Koladi Road, Near Thiruverkadu Devi Karumariamman Temple</span>
                </div>
                <div className="flex items-center gap-3">
                  <Navigation className="w-5 h-5 text-[#C9A24A] shrink-0" />
                  <span>Subamuhurtham Timing: Sunday, Sept 13, 2026 (6:30 AM – 8:00 AM)</span>
                </div>
              </div>

              <div>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gold-gradient text-neutral-950 font-serif font-bold text-sm tracking-wide shadow-gold-lg hover:scale-105 transition-all duration-300 group cursor-pointer"
                >
                  <Navigation className="w-4 h-4 text-neutral-900 group-hover:rotate-45 transition-transform" />
                  <span>View Location on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right Map Placeholder Column */}
            <div className="relative min-h-[280px] bg-gradient-to-br from-[#1C0F0A] to-[#3D1418] flex items-center justify-center p-8 border-t lg:border-t-0 lg:border-l border-[#C9A24A]/30">
              <div className="text-center space-y-3 z-10">
                <div className="w-16 h-16 rounded-full bg-[#C9A24A]/20 border border-[#C9A24A] mx-auto flex items-center justify-center text-[#D4AF37] shadow-lg animate-bounce">
                  <MapPin className="w-8 h-8" />
                </div>
                <h4 className="font-serif font-bold text-xl text-[#FFF3B0]">Thiruverkadu, Chennai</h4>
                <p className="font-serif italic text-xs text-amber-200/70 max-w-xs mx-auto">
                  Click the button to open directions directly in Google Maps.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
