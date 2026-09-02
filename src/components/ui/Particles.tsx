"use client";

import React, { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  type: "petal" | "sparkle" | "diya";
}

export default function Particles({ count = 20 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const items: Particle[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      size: Math.random() * 14 + 10,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 8,
      rotation: Math.random() * 360,
      type: i % 3 === 0 ? "petal" : i % 3 === 1 ? "sparkle" : "diya",
    }));
    setParticles(items);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bottom-0 animate-float-up opacity-0"
          style={{
            left: `${p.x}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `floatUp ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.type === "petal" ? (
            <svg
              viewBox="0 0 24 24"
              fill="#E89BA7"
              className="opacity-60 drop-shadow-[0_0_8px_rgba(232,155,167,0.5)] transform hover:scale-110 transition-transform"
              style={{ transform: `rotate(${p.rotation}deg)` }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : p.type === "sparkle" ? (
            <svg
              viewBox="0 0 24 24"
              fill="#F7E096"
              className="opacity-70 drop-shadow-[0_0_10px_rgba(247,224,150,0.8)]"
            >
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2z" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="#D4AF37"
              className="opacity-50 drop-shadow-[0_0_12px_rgba(212,175,55,0.7)]"
            >
              <circle cx="12" cy="12" r="5" fill="#FFF3B0" />
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" opacity="0.4" />
            </svg>
          )}
        </div>
      ))}
      <style jsx global>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg) scale(0.6);
            opacity: 0;
          }
          15% {
            opacity: 0.8;
          }
          85% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-105vh) rotate(360deg) scale(1.1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
