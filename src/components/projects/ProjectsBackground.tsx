"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ParticleWave({ color = "#8ab4f8" }: { color?: string }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Create a grid of points for the wave
  const count = 10000;
  const sep = 1.5;
  
  const [positions, phases] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    
    let i = 0;
    let iPhase = 0;
    
    // Create a 100x100 grid
    for (let ix = 0; ix < 100; ix++) {
      for (let iz = 0; iz < 100; iz++) {
        // x, y, z
        positions[i] = ix * sep - (100 * sep) / 2;
        positions[i + 1] = 0; // y will be animated
        positions[i + 2] = iz * sep - (100 * sep) / 2;
        
        // Randomize the phase slightly for a more organic look
        phases[iPhase] = Math.random() * Math.PI * 2;
        
        i += 3;
        iPhase += 1;
      }
    }
    
    return [positions, phases];
  }, [count, sep]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const positionsAttr = pointsRef.current.geometry.attributes.position;
    
    let i = 0;
    let iPhase = 0;
    
    for (let ix = 0; ix < 100; ix++) {
      for (let iz = 0; iz < 100; iz++) {
        const x = positionsAttr.getX(i);
        const z = positionsAttr.getZ(i);
        
        // Math based wave calculation
        const waveX = Math.sin((ix + time * 1.5) * 0.1) * 3;
        const waveZ = Math.cos((iz + time * 1.0) * 0.1) * 3;
        const organic = Math.sin(phases[iPhase] + time * 0.5) * 1;
        
        positionsAttr.setY(i, waveX + waveZ + organic);
        
        i += 1;
        iPhase += 1;
      }
    }
    
    positionsAttr.needsUpdate = true;
    
    // Slowly rotate the entire field
    pointsRef.current.rotation.y = time * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]} // Fixed for R3F v8 typing
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color={color}
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ProjectsBackground({ themeColor = "#8ab4f8" }: { themeColor?: string }) {
  return (
    <div className="absolute inset-0 z-0 w-full h-full bg-[#050505] overflow-hidden pointer-events-none">
      <Canvas camera={{ position: [0, 15, 30], fov: 60 }}>
        <fog attach="fog" args={["#050505", 10, 50]} />
        <ParticleWave color={themeColor} />
      </Canvas>
      {/* Soft overlay gradient to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]" />
    </div>
  );
}
