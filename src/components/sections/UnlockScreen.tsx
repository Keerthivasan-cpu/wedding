"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Particles from "../ui/Particles";

interface UnlockScreenProps {
  onUnlock: () => void;
}

export default function UnlockScreen({ onUnlock }: UnlockScreenProps) {
  const [isRinging, setIsRinging] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showRipple, setShowRipple] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Parallax Motion Values
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  // Smooth Springs
  const springConfig = { damping: 35, stiffness: 100 };
  const smoothX = useSpring(rawMouseX, springConfig);
  const smoothY = useSpring(rawMouseY, springConfig);

  // Parallax Layer Offsets (Hardware Accelerated Transforms)
  const bgX = useTransform(smoothX, [-400, 400], [-5, 5]);
  const bgY = useTransform(smoothY, [-400, 400], [-5, 5]);

  const templeX = useTransform(smoothX, [-400, 400], [-10, 10]);
  const templeY = useTransform(smoothY, [-400, 400], [-10, 10]);

  const frontX = useTransform(smoothX, [-400, 400], [22, -22]);
  const frontY = useTransform(smoothY, [-400, 400], [22, -22]);

  const autoDriftRef = useRef<number | null>(null);

  // Preload audio on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/sounds/temple-bell.mp3");
      audioRef.current.preload = "auto";
    }
  }, []);

  // Lock touch scrolling specifically on mobile Safari/Chrome while entry screen is active
  useEffect(() => {
    if (isUnlocked) return;

    const preventTouch = (e: TouchEvent) => {
      e.preventDefault();
    };

    window.addEventListener("touchmove", preventTouch, { passive: false });
    return () => {
      window.removeEventListener("touchmove", preventTouch);
    };
  }, [isUnlocked]);

  useEffect(() => {
    let hasGyroscope = false;

    // Desktop MouseMove Listener
    const handleMouseMove = (e: MouseEvent) => {
      if (hasGyroscope) return;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      rawMouseX.set(e.clientX - centerX);
      rawMouseY.set(e.clientY - centerY);
    };

    // Mobile Device Orientation Gyroscope Listener
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        hasGyroscope = true;
        const tiltX = Math.min(Math.max(e.gamma * 6, -300), 300);
        const tiltY = Math.min(Math.max((e.beta - 45) * 6, -300), 300);
        rawMouseX.set(tiltX);
        rawMouseY.set(tiltY);
      }
    };

    // Autonomous Fallback Drift for Mobile
    let startTime = performance.now();
    const autonomousDrift = (now: number) => {
      if (!hasGyroscope && window.innerWidth <= 768) {
        const elapsed = (now - startTime) / 1000;
        const driftX = Math.sin(elapsed * 0.7) * 90;
        const driftY = Math.cos(elapsed * 0.5) * 60;
        rawMouseX.set(driftX);
        rawMouseY.set(driftY);
      }
      autoDriftRef.current = requestAnimationFrame(autonomousDrift);
    };

    window.addEventListener("mousemove", handleMouseMove);

    if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", handleDeviceOrientation);
    }

    autoDriftRef.current = requestAnimationFrame(autonomousDrift);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
        window.removeEventListener("deviceorientation", handleDeviceOrientation);
      }
      if (autoDriftRef.current) cancelAnimationFrame(autoDriftRef.current);
    };
  }, [rawMouseX, rawMouseY]);

  const playBellSound = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Ensure AudioContext is resumed instantly on user gesture
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const now = ctx.currentTime;

      // Resonant South Indian Temple Bell Frequencies (D5 fundamental + metallic harmonics)
      const frequencies = [587.33, 1174.66, 1762.0, 2349.32, 2936.65];
      const gains = [0.65, 0.38, 0.22, 0.14, 0.09];
      const decayTimes = [3.0, 2.4, 1.8, 1.2, 0.8];

      frequencies.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = i === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, now);

        // Subtle bell strike pitch bend
        osc.frequency.exponentialRampToValueAtTime(freq * 0.98, now + decayTimes[i]);

        gainNode.gain.setValueAtTime(gains[i], now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + decayTimes[i]);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + decayTimes[i]);
      });
    } catch (e) {
      console.warn("Audio synthesis error:", e);
    }
  };

  const handleBellClick = () => {
    if (isUnlocked) return;

    setIsRinging(true);
    setShowRipple(true);

    // Reset + play audio file if loaded, with Web Audio API synthesis fallback
    if (audioRef.current) {
      try {
        audioRef.current.currentTime = 0;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            playBellSound();
          });
        }
      } catch {
        playBellSound();
      }
    }

    playBellSound();

    setTimeout(() => {
      setIsUnlocked(true);
      setTimeout(() => {
        onUnlock();
      }, 700);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {!isUnlocked && (
        <motion.div
          key="unlock-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.08 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 w-screen h-screen min-h-[100dvh] max-h-[100dvh] overflow-hidden m-0 p-0 bg-[#2A0912] select-none"
        >
          {/* Layer 0: True Full-Bleed Temple Wallpaper */}
          <motion.div
            style={{ x: templeX, y: templeY }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <motion.div
              animate={{ scale: [1.0, 1.03, 1.0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full"
            >
              <Image
                src="/images/temple_hero_bg.png"
                alt="South Indian Temple Gopuram"
                fill
                priority
                className="object-cover object-top sm:object-center"
              />
            </motion.div>
          </motion.div>

          {/* Layer 1: Rotating Sunburst Rays Radial Overlay */}
          <motion.div
            style={{ x: bgX, y: bgY }}
            className="absolute inset-0 z-1 pointer-events-none overflow-hidden"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
              className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] sm:w-[1200px] h-[800px] sm:h-[1200px] opacity-25 mix-blend-overlay"
            >
              <svg viewBox="0 0 200 200" className="w-full h-full text-[#FFF3B0]">
                {Array.from({ length: 24 }).map((_, i) => (
                  <path
                    key={i}
                    d="M100 100 L93 0 L107 0 Z"
                    fill="currentColor"
                    opacity="0.35"
                    transform={`rotate(${i * 15} 100 100)`}
                  />
                ))}
              </svg>
            </motion.div>
          </motion.div>

          {/* Layer 2: Top Title & Sacred Union Kicker */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute top-6 sm:top-8 left-0 right-0 z-20 text-center flex flex-col items-center pointer-events-none px-4"
          >
            <span className="text-[#FFF3B0] font-serif text-[10px] sm:text-xs tracking-[0.35em] uppercase font-bold mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              SACRED UNION
            </span>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-gold-gradient drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
              சுப திருமணம்
            </h1>
          </motion.div>

          {/* Layer 3: Floating Rose Petals & Gold Sparkles Particles */}
          <motion.div style={{ x: frontX, y: frontY }} className="absolute inset-0 z-20 pointer-events-none">
            <Particles count={22} />
          </motion.div>

          {/* Layer 4: Dark Maroon Atmospheric Bottom Gradient Overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-[52%] z-25 pointer-events-none bg-gradient-to-b from-transparent via-[#370C1B]/50 via-75% to-[#2A0816]/95 to-100%" />

          {/* Layer 5: Bell Button & TAP TO OPEN Text */}
          <motion.div
            style={{ x: frontX, y: frontY }}
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute bottom-10 sm:bottom-14 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center text-center px-4 w-full"
          >
            {/* Soft Gold Glow Burst around Bell Button on Tap */}
            {showRipple && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0.95 }}
                animate={{ scale: 3.5, opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-[#FFF3B0] via-[#D4AF37] to-[#B8860B] blur-md pointer-events-none shadow-[0_0_40px_rgba(255,243,176,0.8)]"
              />
            )}

            {/* Circular Maroon Bell Button with Bell-Swing & Scale-Pulse Animations */}
            <motion.button
              onClick={handleBellClick}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              animate={
                isRinging
                  ? {
                      rotate: [0, -15, 15, -8, 8, 0],
                      scale: [1, 1.08, 1],
                    }
                  : {
                      y: [0, -4, 0],
                    }
              }
              transition={
                isRinging
                  ? { duration: 1.2, ease: "easeInOut" }
                  : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
              }
              className="relative group cursor-pointer outline-none focus:outline-none mb-3"
              aria-label="Tap to open the invitation"
            >
              {/* Soft Golden Breathing Glow */}
              <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#B8860B] opacity-75 blur-md group-hover:opacity-100 transition duration-300 animate-pulse shadow-[0_0_24px_rgba(201,161,75,0.55)]" />

              {/* Maroon Circle Button */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#A91B2C] via-[#8B1D2C] to-[#5C101A] p-[3px] shadow-[0_8px_25px_rgba(0,0,0,0.6)] flex items-center justify-center border-2 border-[#FFF3B0] group-hover:border-amber-200 transition-colors">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#9E1B32] to-[#6A121E] flex items-center justify-center">
                  {/* Gold Bell Icon */}
                  <svg
                    viewBox="0 0 100 100"
                    className="w-8 h-8 sm:w-10 sm:h-10 text-[#FFF3B0] filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
                  >
                    <defs>
                      <linearGradient id="bellIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFF9D2" />
                        <stop offset="50%" stopColor="#F5B041" />
                        <stop offset="100%" stopColor="#D4AF37" />
                      </linearGradient>
                    </defs>
                    <circle cx="50" cy="18" r="6" fill="none" stroke="url(#bellIconGrad)" strokeWidth="4" />
                    <path
                      d="M36 32 C36 32 32 58 20 68 C18 70 20 74 24 74 L76 74 C80 74 82 70 80 68 C68 58 64 32 64 32 Z"
                      fill="url(#bellIconGrad)"
                    />
                    <rect x="18" y="74" width="64" height="5" rx="2.5" fill="#FFF9D2" />
                    <circle cx="50" cy="85" r="6" fill="url(#bellIconGrad)" />
                  </svg>
                </div>
              </div>
            </motion.button>

            {/* TAP TO OPEN THE INVITATION Text */}
            <p className="font-serif font-bold text-[11px] sm:text-xs text-[#FFF3B0] tracking-[0.25em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] opacity-95 transition-opacity hover:opacity-100">
              TAP TO OPEN THE INVITATION
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
