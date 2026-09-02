"use client";

import React, { useEffect, useState } from "react";

interface Lantern {
  id: number;
  left: number; // percentage
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
  swayDuration: number; // seconds
  rotation: number; // deg
  glowColor: string;
}

export default function FloatingLanterns({ count = 16 }: { count?: number }) {
  const [lanterns, setLanterns] = useState<Lantern[]>([]);

  useEffect(() => {
    const glows = [
      "rgba(255, 180, 120, 0.9)",
      "rgba(255, 140, 90, 0.9)",
      "rgba(255, 200, 110, 0.9)",
      "rgba(255, 160, 100, 0.9)",
    ];

    const items: Lantern[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 92 + 4,
      size: Math.random() * 22 + 24, // 24px - 46px
      duration: Math.random() * 10 + 12, // 12s - 22s
      delay: Math.random() * 8,
      swayDuration: Math.random() * 3 + 3,
      rotation: Math.random() * 20 - 10,
      glowColor: glows[i % glows.length],
    }));

    setLanterns(items);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      {lanterns.map((l) => (
        <div
          key={l.id}
          className="absolute bottom-[-60px] pointer-events-none"
          style={{
            left: `${l.left}%`,
            width: `${l.size}px`,
            height: `${l.size * 1.3}px`,
            animation: `lanternRise ${l.duration}s linear infinite, lanternSway ${l.swayDuration}s ease-in-out infinite alternate`,
            animationDelay: `${l.delay}s, ${l.delay}s`,
          }}
        >
          {/* Glowing Translucent Paper Lantern SVG */}
          <div
            className="w-full h-full relative"
            style={{
              transform: `rotate(${l.rotation}deg)`,
              filter: `drop-shadow(0 0 14px ${l.glowColor}) drop-shadow(0 0 25px rgba(255, 160, 80, 0.5))`,
            }}
          >
            <svg viewBox="0 0 40 52" fill="none" className="w-full h-full">
              <defs>
                <linearGradient id={`lanternBody-${l.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF3B0" stopOpacity="0.95" />
                  <stop offset="40%" stopColor="#FF9A76" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#E64A19" stopOpacity="0.85" />
                </linearGradient>
                <radialGradient id={`flameGlow-${l.id}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                  <stop offset="50%" stopColor="#FFEE58" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#FF9800" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Top Wooden Rim */}
              <rect x="8" y="2" width="24" height="3" rx="1.5" fill="#D4AF37" />

              {/* Cylindrical Paper Body */}
              <path
                d="M8 5 Q 4 25 8 45 L 32 45 Q 36 25 32 5 Z"
                fill={`url(#lanternBody-${l.id})`}
                stroke="#D4AF37"
                strokeWidth="0.8"
              />

              {/* Horizontal Paper Rib Lines */}
              <line x1="7" y1="15" x2="33" y2="15" stroke="#D4AF37" strokeWidth="0.5" opacity="0.6" />
              <line x1="6" y1="25" x2="34" y2="25" stroke="#D4AF37" strokeWidth="0.5" opacity="0.6" />
              <line x1="7" y1="35" x2="33" y2="35" stroke="#D4AF37" strokeWidth="0.5" opacity="0.6" />

              {/* Inner Candle Flame Glow */}
              <circle cx="20" cy="27" r="7" fill={`url(#flameGlow-${l.id})`} className="animate-pulse" />

              {/* Bottom Wooden Rim */}
              <rect x="8" y="45" width="24" height="3" rx="1.5" fill="#D4AF37" />

              {/* Tassel Threads */}
              <line x1="14" y1="48" x2="14" y2="52" stroke="#FFD54F" strokeWidth="0.8" />
              <line x1="20" y1="48" x2="20" y2="52" stroke="#FFD54F" strokeWidth="0.8" />
              <line x1="26" y1="48" x2="26" y2="52" stroke="#FFD54F" strokeWidth="0.8" />
            </svg>
          </div>
        </div>
      ))}

      <style jsx global>{`
        @keyframes lanternRise {
          0% {
            transform: translateY(0) scale(0.85);
            opacity: 0;
          }
          10% {
            opacity: 0.95;
          }
          90% {
            opacity: 0.85;
          }
          100% {
            transform: translateY(-112vh) scale(1.1);
            opacity: 0;
          }
        }

        @keyframes lanternSway {
          0% {
            margin-left: -20px;
          }
          100% {
            margin-left: 20px;
          }
        }
      `}</style>
    </div>
  );
}
