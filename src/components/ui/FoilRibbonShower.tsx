"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  speedY: number;
  speedX: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
  opacity: number;
}

const METALLIC_COLORS = [
  "#FFE89C", // Light Gold Shimmer
  "#E5C158", // Bright Gold
  "#D4AF37", // Pure Gold
  "#F5B041", // Saffron Gold
  "#FFFDF0", // Champagne White
  "#997A15", // Deep Gold
  "#5DADE2", // Subtle Diamond Sparkle
];

export default function FoilRibbonShower({ durationMs = 5000 }: { durationMs?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let startTime = performance.now();

    // Set canvas dimensions to match container
    const updateSize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    const particleCount = 160;
    const particles: Particle[] = [];

    // Initialize particles starting above top edge
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: -Math.random() * canvas.height * 0.8 - 20, // Distributed above top
        width: Math.random() * 5 + 4, // 4px to 9px
        height: Math.random() * 10 + 8, // 8px to 18px
        color: METALLIC_COLORS[Math.floor(Math.random() * METALLIC_COLORS.length)],
        speedY: Math.random() * 2.5 + 2.0, // 2.0 to 4.5 px/frame
        speedX: (Math.random() - 0.5) * 1.2, // Subtle horizontal sway
        rotationX: Math.random() * Math.PI * 2,
        rotationY: Math.random() * Math.PI * 2,
        rotationZ: Math.random() * Math.PI * 2,
        rotSpeedX: (Math.random() - 0.5) * 0.1,
        rotSpeedY: (Math.random() - 0.5) * 0.1,
        rotSpeedZ: (Math.random() - 0.5) * 0.08,
        opacity: 1,
      });
    }

    const render = (now: number) => {
      const elapsed = now - startTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Global fade out near the end of duration
      let globalAlpha = 1;
      if (elapsed > durationMs - 1200) {
        globalAlpha = Math.max(0, (durationMs - elapsed) / 1200);
      }

      particles.forEach((p) => {
        // Update physics position
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.02) * 0.8 + p.speedX;
        p.rotationX += p.rotSpeedX;
        p.rotationY += p.rotSpeedY;
        p.rotationZ += p.rotSpeedZ;

        // Reset to top if still early in animation
        if (p.y > canvas.height + 20) {
          if (elapsed < durationMs - 1500) {
            p.y = -20;
            p.x = Math.random() * canvas.width;
          } else {
            return; // Don't reset when ending
          }
        }

        // Draw metallic ribbon particle with 3D projection flip
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotationZ);

        // 3D scale flip for metallic flutter
        const scaleX = Math.cos(p.rotationY);
        const scaleY = Math.sin(p.rotationX);
        ctx.scale(scaleX, scaleY);

        ctx.globalAlpha = globalAlpha * Math.abs(scaleX * scaleY * 0.5 + 0.5);
        ctx.fillStyle = p.color;

        // Shiny metallic foil shadow
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 4;

        ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
        ctx.restore();
      });

      if (elapsed < durationMs) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", updateSize);
    };
  }, [durationMs]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-30"
    />
  );
}
