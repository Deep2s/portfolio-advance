"use client";

import dynamic from "next/dynamic";

const ThreeCanvas = dynamic(() => import("@/components/BirdsBackground"), {
  ssr: false,
});

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex items-center justify-center overflow-hidden h-screen w-full"
      aria-label="Hero section"
    >
      {/* Three.js canvas — full viewport background */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
      >
        <ThreeCanvas />
      </div>

      {/* Content layer */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
          Hello Everyone
        </h1>
      </div>
    </section>
  );
}
