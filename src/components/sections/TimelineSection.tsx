"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, Variants } from "framer-motion";
import { Calendar, Clock, MapPin, ExternalLink, Sparkles } from "lucide-react";

interface CeremonyEvent {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapsUrl: string;
  isMain?: boolean;
}

const EVENTS: CeremonyEvent[] = [
  {
    id: "panthakaalam",
    number: "01",
    title: "Panthakaalam",
    subtitle: "Auspicious Pole Erection Ceremony",
    description: "Invoking divine blessings of Lord Ganesha and ancestral deities to safeguard and sanctify the wedding venue.",
    date: "Friday, 11 September 2026",
    time: "4:30 PM – 6:00 PM",
    venue: "Ramalaya Kalyana Mandapam",
    address: "KNV Nagar, Koladi Road, Thiruverkadu, Chennai – 600 077",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Ramalaya+Kalyana+Mandapam+Koladi+Road+Thiruverkadu+Chennai",
  },
  {
    id: "azhaippu",
    number: "02",
    title: "Manamakal Azhaippu",
    subtitle: "Bride's Welcoming Ceremony",
    description: "Traditional welcoming of the bride and groom's families with music, garlands, and sacred rituals.",
    date: "Saturday, 12 September 2026",
    time: "6:30 PM",
    venue: "Ramalaya Kalyana Mandapam",
    address: "KNV Nagar, Koladi Road, Thiruverkadu, Chennai – 600 077",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Ramalaya+Kalyana+Mandapam+Koladi+Road+Thiruverkadu+Chennai",
  },
  {
    id: "reception",
    number: "03",
    title: "Reception / Varaverpu",
    subtitle: "Grand Evening Celebration",
    description: "Join us for an enchanting evening filled with music, feast, warmth, and joyous blessings for the couple.",
    date: "Saturday, 12 September 2026",
    time: "7:00 PM onwards",
    venue: "Ramalaya Kalyana Mandapam",
    address: "KNV Nagar, Koladi Road, Thiruverkadu, Chennai – 600 077",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Ramalaya+Kalyana+Mandapam+Koladi+Road+Thiruverkadu+Chennai",
  },
  {
    id: "muhurtham",
    number: "04",
    title: "Mangala Muhurtham",
    subtitle: "The Sacred Wedding Knot",
    description: "The divine knot tying (Thirumangalyam) during the auspicious Subamuhurtham window.",
    date: "Sunday, 13 September 2026",
    time: "6:30 AM – 8:00 AM (Subamuhurtham Window)",
    venue: "Ramalaya Kalyana Mandapam",
    address: "KNV Nagar, Koladi Road, Thiruverkadu, Chennai – 600 077",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Ramalaya+Kalyana+Mandapam+Koladi+Road+Thiruverkadu+Chennai",
    isMain: true,
  },
];

// Staggered Container Variants for Internal Card Elements (60-100ms stagger)
const cardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll Progress tied to vertical line growth
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end end"],
  });

  const smoothLineScale = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    damping: 30,
    stiffness: 100,
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 px-4 bg-gradient-to-b from-[#2b1015] via-[#240d12] to-[#1f0d10] text-[#f0e6dd] overflow-hidden border-t border-[#d4af7a]/20 select-none"
    >
      {/* Background Kolam Accent */}
      <div className="absolute inset-0 bg-kolam-overlay opacity-15 pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* SECTION HEADER ANIMATIONS */}
        <div className="flex flex-col items-center">
          {/* 1. "AUSPICIOUS SCHEDULE" label: softly fade in */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center justify-center gap-3 mb-2"
          >
            <div className="h-[1px] w-8 sm:w-16 bg-[#d4af7a]/40" />
            <span className="text-[#d4af7a] font-sans text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold">
              — AUSPICIOUS SCHEDULE —
            </span>
            <div className="h-[1px] w-8 sm:w-16 bg-[#d4af7a]/40" />
          </motion.div>

          {/* 2. "WEDDING CEREMONIES" heading: upward reveal right after label */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="text-3xl sm:text-5xl font-serif font-bold text-[#f0e6dd] drop-shadow-md tracking-wide uppercase"
          >
            WEDDING CEREMONIES
          </motion.h2>

          {/* 3. Decorative gold lines extend smoothly from center outward */}
          <div className="flex items-center justify-center gap-3 my-4">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              style={{ originX: 1 }}
              className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#d4af7a] to-[#d4af7a]"
            />
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-[#d4af7a] text-xs font-serif select-none"
            >
              ✦
            </motion.span>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              style={{ originX: 0 }}
              className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent via-[#d4af7a] to-[#d4af7a]"
            />
          </div>

          {/* 4. Subtitle quote: fades in slightly after heading */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            className="font-serif italic text-base sm:text-lg text-[#d4af7a]/90 max-w-xl mx-auto leading-relaxed drop-shadow"
          >
            &ldquo;Every ritual marks a sacred step toward eternal togetherness.&rdquo;
          </motion.p>
        </div>

        {/* TIMELINE CONTAINER */}
        <div className="relative w-full mt-14 mb-6">
          {/* Scroll-Linked Progressively Revealed Vertical Dashed Gold Line */}
          <motion.div
            style={{ scaleY: smoothLineScale, originY: 0 }}
            className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0 border-l-2 border-dashed border-[#d4af7a]/50 -translate-x-1/2"
          />

          {/* Alternating Cards Stack */}
          <div className="space-y-12 sm:space-y-16">
            {EVENTS.map((evt, index) => {
              const isEven = index % 2 === 0;
              // Desktop: Left (-80px) for Card 1 & 3, Right (80px) for Card 2 & 4. Mobile: Bottom (40px).
              const initialX = isMobile ? 0 : isEven ? -80 : 80;
              const initialY = isMobile ? 40 : 0;

              return (
                <div key={evt.id} className="relative flex flex-col md:flex-row items-center w-full">
                  {/* Timeline Number Node (01, 02, 03, 04) - Single Pulse & Glow on Activation */}
                  <div className="absolute left-6 md:left-1/2 top-6 -translate-x-1/2 z-20 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: [0.6, 1.08, 1], opacity: 1 }}
                      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                      className="relative"
                    >
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-[#d4af7a] bg-[#2b1015] text-[#d4af7a] font-sans text-xs font-bold flex items-center justify-center transition-transform hover:scale-110 ${
                          evt.isMain
                            ? "shadow-[0_0_18px_rgba(212,175,122,0.6)] border-[#c9a45c] bg-[#3b151e] text-[#FFF3B0]"
                            : "shadow-[0_0_10px_rgba(212,175,122,0.3)]"
                        }`}
                      >
                        {evt.number}
                      </div>
                    </motion.div>
                  </div>

                  {/* CEREMONY CARD ANIMATION */}
                  <motion.div
                    initial={{ opacity: 0, x: initialX, y: initialY, scale: 0.97 }}
                    whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
                    transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                    className={`w-full md:w-[46%] pl-14 md:pl-0 text-left ${
                      isEven
                        ? "md:mr-auto md:pr-8 md:text-right"
                        : "md:ml-auto md:pl-8 md:text-left"
                    }`}
                  >
                    {/* Desktop Hover Lift (translateY(-5px)) & Soft Gold Glow */}
                    <motion.div
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className={`rounded-2xl p-6 sm:p-8 bg-[#3b151e]/60 backdrop-blur-md border border-[#d4af7a]/25 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-[#d4af7a]/70 hover:shadow-[0_15px_35px_rgba(212,175,122,0.2)] relative overflow-hidden group ${
                        evt.isMain ? "border-2 border-[#d4af7a]/70 shadow-[0_12px_35px_rgba(212,175,122,0.15)]" : ""
                      }`}
                    >
                      {/* CARD CONTENT STAGGER (Sequence: Label → Title → Description → Date → Time → Venue → Map Button) */}
                      <motion.div
                        variants={cardContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {/* Main Muhurtham Tag */}
                        {evt.isMain && (
                          <motion.div
                            variants={cardItemVariants}
                            className={`absolute top-4 ${isEven ? "md:left-4 right-4 md:right-auto" : "right-4"} px-3 py-0.5 rounded-full bg-gradient-to-r from-[#d4af7a] to-[#c9a45c] text-[#1f0d10] text-[10px] font-sans font-bold tracking-widest uppercase shadow-md flex items-center gap-1`}
                          >
                            <Sparkles className="w-3 h-3 text-[#1f0d10]" />
                            <span>MAIN MUHURTHAM</span>
                          </motion.div>
                        )}

                        {/* 1. Ceremony Label */}
                        <motion.span
                          variants={cardItemVariants}
                          className="text-[#d4af7a] font-sans text-xs tracking-[0.2em] font-bold uppercase block mb-1"
                        >
                          CEREMONY · {evt.number}
                        </motion.span>

                        {/* 2. Ceremony Title */}
                        <motion.h3
                          variants={cardItemVariants}
                          className="text-2xl sm:text-3xl font-serif font-bold text-[#f0e6dd] mb-1 group-hover:text-[#FFF3B0] transition-colors"
                        >
                          {evt.title}
                        </motion.h3>

                        {/* 3. Description Quote */}
                        <motion.p
                          variants={cardItemVariants}
                          className="text-[#d4af7a]/90 font-serif italic text-sm mb-4"
                        >
                          &ldquo;{evt.description}&rdquo;
                        </motion.p>

                        {/* 4, 5, 6. Date, Time, Venue Details Box */}
                        <motion.div
                          variants={cardItemVariants}
                          className="space-y-2.5 text-xs sm:text-sm text-[#f0e6dd] py-3.5 px-4 rounded-xl bg-[#240d12]/70 border border-[#d4af7a]/15 mb-6 font-sans"
                        >
                          {/* 4. Date */}
                          <div className={`flex items-center gap-2.5 ${isEven ? "md:justify-end" : "justify-start"}`}>
                            <Calendar className="w-4 h-4 text-[#d4af7a] shrink-0" />
                            <span className="font-medium text-[#f0e6dd]">{evt.date}</span>
                          </div>

                          {/* 5. Time */}
                          <div className={`flex items-center gap-2.5 ${isEven ? "md:justify-end" : "justify-start"}`}>
                            <Clock className="w-4 h-4 text-[#d4af7a] shrink-0" />
                            <span className="font-medium text-[#f0e6dd]">{evt.time}</span>
                          </div>

                          {/* 6. Venue */}
                          <div className={`flex items-start gap-2.5 ${isEven ? "md:justify-end" : "justify-start"}`}>
                            <MapPin className="w-4 h-4 text-[#d4af7a] shrink-0 mt-0.5" />
                            <div>
                              <p className="font-bold text-[#f0e6dd]">{evt.venue}</p>
                              <p className="text-[11px] text-[#f0e6dd]/65 mt-0.5">{evt.address}</p>
                            </div>
                          </div>
                        </motion.div>

                        {/* 7. Google Map Location Button Microinteraction */}
                        <motion.div
                          variants={cardItemVariants}
                          className={`flex ${isEven ? "md:justify-end" : "justify-start"}`}
                        >
                          <a
                            href={evt.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#d4af7a] bg-[#d4af7a]/10 hover:bg-[#d4af7a] hover:text-[#1f0d10] text-[#f0e6dd] font-sans text-xs font-semibold tracking-wide transition-all duration-300 group/btn cursor-pointer shadow-sm"
                          >
                            <span>Google Map Location</span>
                            <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-250" />
                          </a>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
