"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on desktop (hover capable pointer)
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    setIsVisible(true);

    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("clickable")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", updateCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Golden Glow Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#D4AF37] pointer-events-none z-50 mix-blend-difference hidden md:block"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isHovered ? 1.6 : 1,
          borderColor: isHovered ? "#FFF3B0" : "#D4AF37",
        }}
        transition={{ type: "spring", damping: 28, stiffness: 250, mass: 0.5 }}
      />
      {/* Inner Solid Gold Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#D4AF37] pointer-events-none z-50 hidden md:block"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isHovered ? 0.5 : 1,
        }}
        transition={{ type: "spring", damping: 35, stiffness: 350, mass: 0.2 }}
      />
    </>
  );
}
