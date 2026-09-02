"use client";

import React, { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number; // percentage
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
  swayDuration: number; // seconds
  rotation: number; // deg
  type: "rose" | "jasmine" | "marigold" | "gold";
}

export default function FlowerDropAnimation({ count = 28 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const types: Petal["type"][] = ["rose", "jasmine", "marigold", "gold"];
    const items: Petal[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 96 + 2,
      size: Math.random() * 16 + 14,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * 7,
      swayDuration: Math.random() * 3 + 2.5,
      rotation: Math.random() * 360,
      type: types[i % types.length],
    }));
    setPetals(items);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {petals.map((p) => {
        let petalSvg;

        if (p.type === "rose") {
          // Pink/Red Rose Petal
          petalSvg = (
            <svg viewBox="0 0 30 30" fill="none" className="w-full h-full filter drop-shadow-[0_2px_6px_rgba(180,30,60,0.5)]">
              <path
                d="M15 3 C 22 3, 27 10, 26 18 C 25 25, 17 28, 15 28 C 13 28, 5 25, 4 18 C 3 10, 8 3, 15 3 Z"
                fill="url(#roseGrad)"
                opacity="0.88"
              />
              <defs>
                <linearGradient id="roseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF6B8B" />
                  <stop offset="60%" stopColor="#D92B4B" />
                  <stop offset="100%" stopColor="#9E122C" />
                </linearGradient>
              </defs>
            </svg>
          );
        } else if (p.type === "jasmine") {
          // White/Cream Sacred Jasmine Petal
          petalSvg = (
            <svg viewBox="0 0 30 30" fill="none" className="w-full h-full filter drop-shadow-[0_2px_6px_rgba(255,245,215,0.6)]">
              <path
                d="M15 2 C 20 8, 24 14, 21 21 C 18 27, 12 27, 9 21 C 6 14, 10 8, 15 2 Z"
                fill="url(#jasGrad)"
                opacity="0.9"
              />
              <defs>
                <linearGradient id="jasGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="70%" stopColor="#FFF4D0" />
                  <stop offset="100%" stopColor="#F5D77F" />
                </linearGradient>
              </defs>
            </svg>
          );
        } else if (p.type === "marigold") {
          // Warm Golden Marigold Petal
          petalSvg = (
            <svg viewBox="0 0 30 30" fill="none" className="w-full h-full filter drop-shadow-[0_2px_6px_rgba(230,150,20,0.6)]">
              <path
                d="M15 3 C 24 6, 26 16, 20 24 C 15 28, 11 25, 7 20 C 3 13, 8 4, 15 3 Z"
                fill="url(#mariGrad)"
                opacity="0.88"
              />
              <defs>
                <linearGradient id="mariGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFC837" />
                  <stop offset="60%" stopColor="#FF8008" />
                  <stop offset="100%" stopColor="#D45500" />
                </linearGradient>
              </defs>
            </svg>
          );
        } else {
          // Metallic Gold Foil Sparkle Petal
          petalSvg = (
            <svg viewBox="0 0 30 30" fill="none" className="w-full h-full filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.7)]">
              <path
                d="M15 2 C 22 7, 26 16, 20 24 C 15 28, 10 26, 6 19 C 2 12, 8 4, 15 2 Z"
                fill="url(#goldPetalGrad)"
                opacity="0.95"
              />
              <defs>
                <linearGradient id="goldPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF9D2" />
                  <stop offset="50%" stopColor="#F5B041" />
                  <stop offset="100%" stopColor="#B8860B" />
                </linearGradient>
              </defs>
            </svg>
          );
        }

        return (
          <div
            key={p.id}
            className="absolute top-[-40px] pointer-events-none"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `flowerFall ${p.duration}s linear infinite, flowerSway ${p.swayDuration}s ease-in-out infinite alternate`,
              animationDelay: `${p.delay}s, ${p.delay}s`,
            }}
          >
            <div
              className="w-full h-full"
              style={{
                transform: `rotate(${p.rotation}deg)`,
                animation: `flowerSpin ${p.duration * 0.8}s ease-in-out infinite alternate`,
              }}
            >
              {petalSvg}
            </div>
          </div>
        );
      })}

      <style jsx global>{`
        @keyframes flowerFall {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 0.95;
          }
          90% {
            opacity: 0.85;
          }
          100% {
            transform: translateY(115vh);
            opacity: 0;
          }
        }

        @keyframes flowerSway {
          0% {
            margin-left: -25px;
          }
          100% {
            margin-left: 25px;
          }
        }

        @keyframes flowerSpin {
          0% {
            transform: rotate(0deg) rotateY(0deg) scale(0.85);
          }
          100% {
            transform: rotate(360deg) rotateY(180deg) scale(1.15);
          }
        }
      `}</style>
    </div>
  );
}
