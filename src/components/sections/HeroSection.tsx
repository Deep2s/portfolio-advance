"use client";

import dynamic from "next/dynamic";

const ThreeCanvas = dynamic(() => import("@/components/three/WebGPULightsCustom"), {
  ssr: false,
});

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex items-center justify-center overflow-hidden h-full w-full"
      style={{ height: "calc(100vh - 44px)" }}
      aria-label="Hero section"
    >
      {/* Three.js canvas — full viewport background */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
      >
        <ThreeCanvas className="w-full h-full" />
      </div>
    </section>
  );
}
