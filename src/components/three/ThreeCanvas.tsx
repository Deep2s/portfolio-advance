"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

// FloatingGeometry uses Three.js hooks — must be dynamically imported
const FloatingGeometry = dynamic(
  () => import("./FloatingGeometry"),
  { ssr: false }
);

interface ThreeCanvasProps {
  className?: string;
}

export default function ThreeCanvas({ className }: ThreeCanvasProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <FloatingGeometry />
        </Suspense>
      </Canvas>
    </div>
  );
}
