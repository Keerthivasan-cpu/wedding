"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import UnlockScreen from "@/components/sections/UnlockScreen";
import HeroSection from "@/components/sections/HeroSection";
import CountdownSection from "@/components/sections/CountdownSection";
import FamilySection from "@/components/sections/FamilySection";
import TimelineSection from "@/components/sections/TimelineSection";
import RsvpSection from "@/components/sections/RsvpSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Lock page scroll completely until the bell is tapped on the entry screen
  useEffect(() => {
    if (!isUnlocked) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isUnlocked]);

  return (
    <main className="relative min-h-screen bg-[#3B0F1A] text-amber-50 overflow-x-hidden">
      {/* 1. Entry / Unlock Screen */}
      <UnlockScreen onUnlock={() => setIsUnlocked(true)} />

      {/* Main Wedding Invitation Microsite (Reachable ONLY after the bell is tapped) */}
      {isUnlocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
        >
          {/* 2. Hero Section */}
          <HeroSection />

          {/* 3. Auspicious Countdown Section */}
          <CountdownSection />

          {/* 4. Family & Blessings Section */}
          <FamilySection />

          {/* 5. Ceremony Timeline Section */}
          <TimelineSection />

          {/* 6. Blessings & Wishes Section */}
          <RsvpSection />

          {/* 7. Footer Section */}
          <FooterSection />
        </motion.div>
      )}
    </main>
  );
}
