"use client";

import React, { useEffect, useState } from "react";

interface Ribbon {
  id: number;
  x: number; // percentage (0 - 100)
  width: number;
  height: number;
  color: string;
  duration: number;
  delay: number;
  animationType: "swayA" | "swayB" | "swayC";
}

const RIBBON_COLORS = [
  "#FFF3B0", // Light Gold
  "#E5C158", // Bright Gold
  "#D4AF37", // Metallic Gold
  "#F5B041", // Warm Saffron Gold
  "#FFFDF0", // Cream Ribbon
  "#FAF0CA", // Light Champagne
];

export default function PaperFallAnimation({ count = 40 }: { count?: number }) {
  const [ribbons, setRibbons] = useState<Ribbon[]>([]);

  useEffect(() => {
    const items: Ribbon[] = Array.from({ length: count }).map((_, i) => {
      const types: ("swayA" | "swayB" | "swayC")[] = ["swayA", "swayB", "swayC"];
      return {
        id: i,
        x: Math.random() * 94 + 3,
        width: Math.random() * 4 + 4, // 4px to 8px
        height: Math.random() * 12 + 10, // 10px to 22px
        color: RIBBON_COLORS[i % RIBBON_COLORS.length],
        duration: Math.random() * 1.2 + 2.4, // 2.4s to 3.6s
        delay: Math.random() * 1.1, // 0s to 1.1s
        animationType: types[i % 3],
      };
    });
    setRibbons(items);
  }, [count]);

  return (
    <div className="absolute top-0 left-0 right-0 h-[240px] pointer-events-none overflow-hidden z-20">
      {ribbons.map((r) => (
        <div
          key={r.id}
          className="absolute top-0 opacity-0"
          style={{
            left: `${r.x}%`,
            width: `${r.width}px`,
            height: `${r.height}px`,
            backgroundColor: r.color,
            borderRadius: "1px",
            boxShadow: `0 2px 6px ${r.color}55`,
            willChange: "transform, opacity",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            animationName: r.animationType,
            animationDuration: `${r.duration}s`,
            animationTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            animationDelay: `${r.delay}s`,
            animationFillMode: "forwards",
          }}
        />
      ))}
      <style jsx global>{`
        @keyframes swayA {
          0% {
            transform: translate3d(0, -20px, 0) rotate3d(1, 0.5, 0, 0deg);
            opacity: 0;
          }
          15% {
            opacity: 0.95;
          }
          35% {
            transform: translate3d(-18px, 60px, 0) rotate3d(0.8, 1, 0.3, 140deg);
          }
          65% {
            transform: translate3d(15px, 125px, 0) rotate3d(1, 0.6, 0.8, 280deg);
            opacity: 0.85;
          }
          100% {
            transform: translate3d(-10px, 195px, 0) rotate3d(0.5, 1, 1, 420deg);
            opacity: 0;
          }
        }

        @keyframes swayB {
          0% {
            transform: translate3d(0, -20px, 0) rotate3d(0.5, 1, 0, 0deg);
            opacity: 0;
          }
          15% {
            opacity: 0.95;
          }
          40% {
            transform: translate3d(20px, 70px, 0) rotate3d(1, 0.4, 0.6, 160deg);
          }
          70% {
            transform: translate3d(-14px, 135px, 0) rotate3d(0.6, 1, 0.5, 310deg);
            opacity: 0.8;
          }
          100% {
            transform: translate3d(12px, 200px, 0) rotate3d(1, 0.8, 0.8, 460deg);
            opacity: 0;
          }
        }

        @keyframes swayC {
          0% {
            transform: translate3d(0, -20px, 0) rotate3d(1, 1, 0.2, 0deg);
            opacity: 0;
          }
          20% {
            opacity: 0.95;
            transform: translate3d(10px, 40px, 0) rotate3d(0.6, 1, 0.8, 100deg);
          }
          55% {
            transform: translate3d(-22px, 110px, 0) rotate3d(1, 0.5, 0.4, 240deg);
            opacity: 0.85;
          }
          100% {
            transform: translate3d(8px, 190px, 0) rotate3d(0.4, 1, 0.9, 390deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
