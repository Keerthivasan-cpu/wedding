"use client";

import React from "react";

interface GoldDividerProps {
  symbol?: string;
  className?: string;
}

export default function GoldDivider({ symbol = "✦", className = "" }: GoldDividerProps) {
  return (
    <div className={`flex items-center justify-center gap-3 my-4 ${className}`}>
      <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#D4AF37] to-[#D4AF37] opacity-80" />
      <span className="text-[#D4AF37] text-xs sm:text-sm font-serif select-none drop-shadow-[0_0_6px_rgba(212,175,55,0.6)]">
        {symbol}
      </span>
      <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent via-[#D4AF37] to-[#D4AF37] opacity-80" />
    </div>
  );
}
