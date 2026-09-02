"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Eye, Sparkles } from "lucide-react";

interface ScratchSealCardProps {
  label: string;
  value: number;
  onRevealChange?: (revealed: boolean) => void;
}

export default function ScratchSealCard({ label, value, onRevealChange }: ScratchSealCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showSparkleFlourish, setShowSparkleFlourish] = useState(false);
  const isDrawingRef = useRef(false);

  const markRevealed = useCallback(() => {
    if (isRevealed) return;
    setIsRevealed(true);
    setShowSparkleFlourish(true);
    if (onRevealChange) {
      onRevealChange(true);
    }
    setTimeout(() => {
      setShowSparkleFlourish(false);
    }, 600);
  }, [isRevealed, onRevealChange]);

  const formattedValue = String(Math.max(0, value)).padStart(2, "0");

  // Draw peacock-feather-eye gold canvas seal
  const drawFoil = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;

    ctx.globalCompositeOperation = "source-over";

    // 1. Metallic Gold Outer Gradient
    const goldGrad = ctx.createRadialGradient(cx, cy, 5, cx, cy, width / 2);
    goldGrad.addColorStop(0, "#FFF9D2");
    goldGrad.addColorStop(0.35, "#F5B041");
    goldGrad.addColorStop(0.7, "#D4AF37");
    goldGrad.addColorStop(1, "#8B6B15");

    ctx.fillStyle = goldGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Peacock Feather Eye Ring Concentric Circles
    // Outer Emerald/Teal Ring
    ctx.strokeStyle = "#0D6E5E";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, width * 0.42, 0, Math.PI * 2);
    ctx.stroke();

    // Sapphire Blue Ring
    ctx.strokeStyle = "#1E4D6B";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cx, cy, width * 0.32, 0, Math.PI * 2);
    ctx.stroke();

    // Peacock Feather Eye Center Motif Gradient
    const eyeGrad = ctx.createRadialGradient(cx, cy - 2, 2, cx, cy - 2, width * 0.22);
    eyeGrad.addColorStop(0, "#FFF3B0");
    eyeGrad.addColorStop(0.4, "#146B5C");
    eyeGrad.addColorStop(0.8, "#1E4D6B");
    eyeGrad.addColorStop(1, "#0A2522");

    ctx.fillStyle = eyeGrad;
    ctx.beginPath();
    ctx.ellipse(cx, cy - 4, width * 0.2, width * 0.16, 0, 0, Math.PI * 2);
    ctx.fill();

    // Etched Feather Rays
    ctx.strokeStyle = "rgba(212, 175, 55, 0.45)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI) / 6;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * (width * 0.22), cy + Math.sin(angle) * (width * 0.22));
      ctx.lineTo(cx + Math.cos(angle) * (width * 0.4), cy + Math.sin(angle) * (width * 0.4));
      ctx.stroke();
    }

    // Seal Labels
    ctx.fillStyle = "#FFF3B0";
    ctx.shadowColor = "rgba(0,0,0,0.8)";
    ctx.shadowBlur = 3;
    ctx.font = "bold 10px Georgia, serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("SCRATCH", cx, cy + 18);
    ctx.fillText("SEAL", cx, cy + 29);
  }, []);

  useEffect(() => {
    drawFoil();
  }, [drawFoil]);

  const checkScratchPercentage = useCallback(() => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparentPixels = 0;

      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) {
          transparentPixels++;
        }
      }

      const totalPixels = pixels.length / 4;
      const percentage = (transparentPixels / totalPixels) * 100;

      if (percentage >= 38) {
        markRevealed();
      }
    } catch (e) {
      // Ignore ctx read error
    }
  }, [isRevealed, markRevealed]);

  const scratch = (clientX: number, clientY: number) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 16, 0, Math.PI * 2);
    ctx.fill();

    checkScratchPercentage();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDrawingRef.current = true;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDrawingRef.current) {
      scratch(e.clientX, e.clientY);
    }
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDrawingRef.current = true;
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDrawingRef.current && e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    isDrawingRef.current = false;
  };

  const forceReveal = () => {
    markRevealed();
  };

  return (
    <div className="flex flex-col items-center group">
      {/* Peacock Medallion Coin Outer Ring */}
      <motion.div
        whileTap={{ scale: 1.05 }}
        className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-[#146B5C] via-[#0E2E2B] to-[#0A2522] p-1 shadow-[0_10px_25px_rgba(0,0,0,0.6)] border-2 border-[#D4AF37]/60 flex items-center justify-center select-none overflow-hidden"
      >
        {/* Underlying Revealed Number View */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full h-full rounded-full bg-gradient-to-br from-[#0E2E2B] via-[#123A34] to-[#071917] flex flex-col items-center justify-center p-2 text-center border border-[#D4AF37]/40 shadow-inner"
        >
          <motion.span
            key={formattedValue}
            initial={{ opacity: 0.5, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="font-serif font-bold text-3xl sm:text-4xl text-gold-gradient drop-shadow-[0_2px_8px_rgba(212,175,55,0.5)] inline-block"
          >
            {formattedValue}
          </motion.span>
          <span className="font-serif tracking-widest text-[10px] sm:text-xs text-amber-200/90 uppercase mt-0.5 font-semibold">
            {label}
          </span>
        </motion.div>

        {/* Scratch Canvas Overlay with Peacock Eye Medallion */}
        {!isRevealed && (
          <canvas
            ref={canvasRef}
            width={140}
            height={140}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="absolute inset-0 w-full h-full rounded-full cursor-pointer touch-none z-10 transition-opacity duration-500"
          />
        )}

        {/* Decorative Peacock Sparkle Flourish on Reveal */}
        {showSparkleFlourish && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 z-20 pointer-events-none rounded-full bg-gradient-to-r from-[#146B5C]/50 via-[#FFF3B0]/80 to-[#D4AF37]/50 blur-sm"
          />
        )}

        {/* Revealed Corner Sparkle */}
        {isRevealed && (
          <div className="absolute top-2 right-2 text-[#FFF3B0] animate-pulse pointer-events-none z-20">
            <Sparkles className="w-4 h-4" />
          </div>
        )}
      </motion.div>

      {/* Tap Fallback Button */}
      {!isRevealed ? (
        <button
          onClick={forceReveal}
          className="mt-2.5 inline-flex items-center gap-1 text-[11px] text-[#D4AF37] hover:text-[#FFF3B0] font-serif tracking-wide transition-colors"
          title="Click to reveal without scratching"
        >
          <Eye className="w-3 h-3" />
          <span>Tap to reveal</span>
        </button>
      ) : (
        <span className="mt-2.5 text-[11px] text-[#D4AF37]/90 font-serif tracking-widest uppercase font-semibold">
          Revealed
        </span>
      )}
    </div>
  );
}
