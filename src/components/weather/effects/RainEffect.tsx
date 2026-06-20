/* eslint-disable */
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface RainEffectProps {
  intensity: number;
  windSpeed: number;
}

export default function RainEffect({ intensity, windSpeed }: RainEffectProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const rainCount = Math.floor(intensity * 15000) + 2000;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(rainCount * 3);
    const vel = new Float32Array(rainCount);

    for (let i = 0; i < rainCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;     // x
      pos[i * 3 + 1] = Math.random() * 40;         // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40; // z
      vel[i] = 0.8 + Math.random() * 0.5;          // speed variation
    }

    return [pos, vel];
  }, [rainCount]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const posAttribute = pointsRef.current.geometry.getAttribute("position");
    
    // Wind affects x-axis, gravity affects y-axis
    const horizontalWind = windSpeed * 0.5;

    for (let i = 0; i < rainCount; i++) {
      const yIndex = i * 3 + 1;
      const xIndex = i * 3;

      posAttribute.array[yIndex] -= velocities[i] * delta * 40; // Fall much faster
      posAttribute.array[xIndex] -= horizontalWind * delta * 2; // Blow sideways harder

      // Reset drops that fall below the ground or drift too far
      if (posAttribute.array[yIndex] < -2) {
        posAttribute.array[yIndex] = 40;
        posAttribute.array[xIndex] = (Math.random() - 0.5) * 60 + (horizontalWind > 0 ? 15 : -15);
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
        color="#caddf0"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
