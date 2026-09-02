"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import FloatingLanterns from "../ui/FloatingLanterns";

export default function SacredJourneySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll progress across the 300vh section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Smooth scroll spring for scrub physics
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 100,
  });

  // Temple Gopuram vertical pan transform (descending past temple tower)
  const templeY = useTransform(smoothProgress, [0, 0.70], ["0%", "-42%"]);

  // Header copy fade out as scroll descends
  const headerOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0]);

  // Rotated Diamond Blessing Card reveal transforms
  const cardOpacity = useTransform(smoothProgress, [0.55, 0.85], [0, 1]);
  const cardScale = useTransform(smoothProgress, [0.55, 0.85], [0.75, 1]);
  const cardY = useTransform(smoothProgress, [0.55, 0.85], [40, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[300vh] w-full bg-[#08101E] text-[#FFF8E7] select-none"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between relative">
        
        {/* Layer 0: Painterly Twilight Blue Sky Background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#060D1A] via-[#0F1F38] via-65% to-[#1D0A14] pointer-events-none">
          {/* Subtle horizontal brush-stroke wave texture overlay */}
          <div className="absolute inset-0 bg-kolam-overlay opacity-15" />
        </div>

        {/* Layer 1: Scroll-Linked Temple Gopuram Pan (Core Parallax Effect) */}
        <motion.div
          style={{ y: templeY }}
          className="absolute inset-x-0 top-0 h-[175vh] sm:h-[195vh] pointer-events-none z-10"
        >
          <div className="relative w-full h-full">
            <Image
              src="/images/temple_gopuram_tall.png"
              alt="Sacred South Indian Temple Gopuram"
              fill
              priority
              className="object-cover object-top sm:object-center filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            />
          </div>
        </motion.div>

        {/* Layer 2: Floating Glowing Paper Lanterns (Continuous Time-Based Particle Loop) */}
        <FloatingLanterns count={18} />

        {/* Layer 3: Top Couple Names Header (Fades out on scroll descent) */}
        <motion.div
          style={{ opacity: headerOpacity }}
          className="absolute top-8 sm:top-12 left-0 right-0 z-30 text-center flex flex-col items-center pointer-events-none px-4"
        >
          <span className="text-[#FFF3B0] font-serif text-[10px] sm:text-xs tracking-[0.35em] uppercase font-bold mb-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            SACRED JOURNEY
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-gold-shimmer drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)] tracking-wide">
            VIJAYALAKSHMI &amp; RANJITH RAJ
          </h2>
        </motion.div>

        {/* Layer 4: Dark Gradient Overlay Blend at Bottom of Viewport */}
        <div className="absolute bottom-0 left-0 right-0 h-[45%] z-25 pointer-events-none bg-gradient-to-b from-transparent via-[#23070E]/60 to-[#1F070E]/95" />

        {/* Layer 5: Ending Rotated Diamond Blessing Card Reveal */}
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none px-4">
          <motion.div
            style={{
              opacity: cardOpacity,
              scale: cardScale,
              y: cardY,
            }}
            className="pointer-events-auto"
          >
            {/* Diamond/Kite Outer Container (Square rotated 45deg) */}
            <div className="w-72 h-72 sm:w-96 sm:h-96 rotate-45 bg-gradient-to-br from-[#0F382C] via-[#144738] to-[#0A2920] border-2 border-[#D4AF37] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(212,175,55,0.4)] flex items-center justify-center p-6 transition-transform hover:scale-[1.02] duration-300">
              
              {/* Inner Content Container (Counter-rotated -45deg so text is upright) */}
              <div className="-rotate-45 flex flex-col items-center justify-center text-center space-y-2 text-[#FFF8E7] w-full">
                
                {/* Gold Ganesha Emblem Icon */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#C9A45C] flex items-center justify-center text-[#0A2920] shadow-md mb-0.5">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 sm:w-7 sm:h-7">
                    <path d="M12 2C10.5 2 9 3.5 9 5C9 6 9.5 7 10 7.5C8 8.5 7 10.5 7 13C7 14.5 7.5 16 8.5 17C7.5 18 7 19.5 7 21H17C17 19.5 16.5 18 15.5 17C16.5 16 17 14.5 17 13C17 10.5 16 8.5 14 7.5C14.5 7 15 6 15 5C15 3.5 13.5 2 12 2Z" opacity="0.9" />
                  </svg>
                </div>

                {/* Sanskrit Invocation Line */}
                <p className="text-[#D4AF37] font-serif text-sm sm:text-base font-bold tracking-widest drop-shadow">
                  ॐ श्री गणेशाय नमः
                </p>

                {/* Heavenly Blessings Kicker */}
                <p className="text-[#FFF3B0]/80 font-serif text-[10px] sm:text-xs tracking-[0.25em] uppercase font-semibold">
                  With the heavenly blessings of
                </p>

                {/* Couple Names */}
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-gold-shimmer drop-shadow-md">
                  Vijayalakshmi &amp; Ranjith Raj
                </h3>

                {/* Date / Subtitle */}
                <p className="text-[#D4AF37] font-serif italic text-xs sm:text-sm">
                  Sunday, September 13, 2026
                </p>
              </div>

            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
