"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const ThreeCanvas = dynamic(() => import("@/components/BirdsBackground"), {
  ssr: false,
});

const HOME_PHRASES = [
  "Building Scalable Full-Stack Apps",
  "Integrating Generative AI Systems",
  "Architecting High-Performance APIs",
  "Crafting Seamless Mobile Journeys"
];

const PHRASE_COLORS = [
  "text-[#b45309]", // Deep Amber/Golden
  "text-neutral-800", // Dark charcoal
  "text-neutral-600", // Muted dark gray
  "text-[#b45309]"  // Deep Amber/Golden
];

const CURSOR_COLORS = [
  "bg-[#b45309]",
  "bg-neutral-800",
  "bg-neutral-600",
  "bg-[#b45309]"
];

function HomeTypewriter() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (subIndex === HOME_PHRASES[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2500);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % HOME_PHRASES.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [subIndex, reverse, index]);

  useEffect(() => {
    const timeout = setTimeout(() => setBlink((prev) => !prev), 500);
    return () => clearTimeout(timeout);
  }, [blink]);

  const currentText = HOME_PHRASES[index].substring(0, subIndex);

  return (
    <div className="h-[40px] sm:h-[48px] flex items-center justify-center select-none font-mono text-base sm:text-lg md:text-xl font-medium tracking-wide">
      <span className={`flex flex-wrap justify-center ${PHRASE_COLORS[index]}`}>
        {currentText.split("").map((char, charIdx) => (
          <motion.span
            key={`${index}-${charIdx}`}
            initial={{ opacity: 0, scale: 0.6, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 350,
            }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
      <span
        className={`inline-block w-[2.5px] h-[0.9em] ml-1.5 rounded-full transition-all duration-150 ${CURSOR_COLORS[index]} ${
          blink ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex items-center justify-center overflow-hidden h-screen w-full"
      style={{
        background: "linear-gradient(to bottom, #7dd3fc 0%, #bae6fd 35%, #e0f2fe 70%, #f0f9ff 100%)"
      }}
      aria-label="Hero section"
    >
      {/* Three.js canvas — full viewport background */}
      <div
        className="absolute inset-0 z-0"
        aria-hidden="true"
      >
        <ThreeCanvas />
      </div>

      {/* Subtle light overlay to make text pop while keeping the background light and sky-themed */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.5) 100%)"
        }}
      />

      {/* Content layer */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 sm:px-12 md:px-20 pointer-events-none select-none">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center"
        >
          <span className="text-[10px] font-bold tracking-widest text-[#b45309] uppercase mb-4">
            Welcome to my space
          </span>
          
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold text-neutral-900 tracking-tight mb-4 drop-shadow-sm">
            Deepak Mittal
          </h1>
        </motion.div>

        {/* Dynamic Typewriter */}
        <HomeTypewriter />

        {/* High-impact description copy to engage visitors */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-neutral-700 font-light text-sm sm:text-base max-w-xl leading-relaxed mt-6 mb-10 drop-shadow px-4"
        >
          Specializing in building robust full-stack applications with modular NestJS architectures, map-driven GIS visualizations, and seamless cross-platform React Native mobile experiences.
        </motion.p>

        {/* Interactive call-to-actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto"
        >
          <a
            href="/projects"
            className="px-6 py-3 rounded-full bg-neutral-950 text-white text-sm font-semibold hover:scale-105 hover:bg-neutral-800 transition-all duration-300 shadow-lg"
          >
            Explore Projects
          </a>
          <a
            href="/profile"
            className="px-6 py-3 rounded-full border border-neutral-200 bg-white/70 backdrop-blur-md text-neutral-800 text-sm font-semibold hover:scale-105 hover:bg-neutral-50 transition-all duration-300 shadow-md"
          >
            About Me
          </a>
        </motion.div>

      </div>
    </section>
  );
}
