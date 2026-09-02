"use client";

import React from "react";
import { motion } from "framer-motion";

interface BananaThoranamProps {
  className?: string;
  count?: number;
  isMini?: boolean;
}

export default function BananaThoranam({ className = "", count = 12, isMini = false }: BananaThoranamProps) {
  const leaves = Array.from({ length: count });

  return (
    <div className={`relative w-full overflow-hidden pointer-events-none select-none ${className}`}>
      {/* Golden Thread / Rope Line */}
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] via-50% to-transparent shadow-[0_0_8px_rgba(212,175,55,0.6)]" />

      {/* Hanging Leaf & Marigold Clusters */}
      <div className="flex justify-between items-start px-2 relative -mt-[1px]">
        {leaves.map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -15, scale: 0.7, rotate: -8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: i * 0.05,
              ease: "easeOut",
            }}
            className="flex flex-col items-center origin-top"
          >
            {/* Idle Swaying Animation Container */}
            <motion.div
              animate={{ rotate: i % 2 === 0 ? [-2, 2, -2] : [2, -2, 2] }}
              transition={{
                duration: 3.8 + (i % 3) * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center origin-top"
            >
              {/* Marigold Flower Cluster (Orange/Mustard Yellow) */}
              <div className={`rounded-full bg-gradient-to-r from-[#F5B041] via-[#E67E22] to-[#F39C12] border border-[#FFF3B0]/60 shadow-[0_2px_6px_rgba(0,0,0,0.4)] ${isMini ? "w-2.5 h-2.5 -mb-1" : "w-4 h-4 sm:w-5 sm:h-5 -mb-1.5"}`} />

              {/* Mango Leaf Accent (Dark Emerald) */}
              <svg
                viewBox="0 0 40 70"
                className={`filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] ${isMini ? "w-3 h-5" : "w-5 h-8 sm:w-7 sm:h-12"}`}
              >
                <defs>
                  <linearGradient id={`bananaLeafGrad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2E8B57" />
                    <stop offset="50%" stopColor="#1B4D3E" />
                    <stop offset="100%" stopColor="#0E2E2B" />
                  </linearGradient>
                </defs>

                {/* Triangular Glossy Banana Leaf */}
                <path
                  d="M20 0 Q 38 30 20 70 Q 2 30 20 0 Z"
                  fill={`url(#bananaLeafGrad-${i})`}
                  stroke="#D4AF37"
                  strokeWidth="0.75"
                />

                {/* Leaf Vein Center Lines */}
                <line x1="20" y1="0" x2="20" y2="65" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="2 1" opacity="0.7" />
                <line x1="20" y1="20" x2="32" y2="30" stroke="#D4AF37" strokeWidth="0.4" opacity="0.5" />
                <line x1="20" y1="20" x2="8" y2="30" stroke="#D4AF37" strokeWidth="0.4" opacity="0.5" />
                <line x1="20" y1="40" x2="33" y2="50" stroke="#D4AF37" strokeWidth="0.4" opacity="0.5" />
                <line x1="20" y1="40" x2="7" y2="50" stroke="#D4AF37" strokeWidth="0.4" opacity="0.5" />
              </svg>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
