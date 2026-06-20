/* eslint-disable */
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SnowEffectProps {
  intensity: number;
}

export default function SnowEffect({ intensity }: SnowEffectProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const snowCount = Math.floor(intensity * 8000) + 1000;

  const [positions, phases] = useMemo(() => {
    const pos = new Float32Array(snowCount * 3);
    const phs = new Float32Array(snowCount);

    for (let i = 0; i < snowCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;     // x
      pos[i * 3 + 1] = Math.random() * 20;         // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40; // z
      phs[i] = Math.random() * Math.PI * 2;        // phase for gentle swaying
    }

    return [pos, phs];
  }, [snowCount]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const posAttribute = pointsRef.current.geometry.getAttribute("position");
    
    for (let i = 0; i < snowCount; i++) {
      const xIndex = i * 3;
      const yIndex = i * 3 + 1;
      
      // Gentle fall
      posAttribute.array[yIndex] -= delta * 2; 
      
      // Gentle swaying
      phases[i] += delta;
      posAttribute.array[xIndex] += Math.sin(phases[i]) * delta * 0.5;

      // Reset snow that falls below ground
      if (posAttribute.array[yIndex] < -2) {
        posAttribute.array[yIndex] = 20;
        posAttribute.array[xIndex] = (Math.random() - 0.5) * 40;
      }
    }

    posAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
