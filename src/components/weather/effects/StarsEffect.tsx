import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function StarsEffect() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 3000;

  const [positions, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const phase = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Create a massive dome of stars
      const r = 40 + Math.random() * 60;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = Math.abs(r * Math.sin(phi) * Math.sin(theta)); // Keep them above ground
      pos[i * 3 + 2] = r * Math.cos(phi);
      
      phase[i] = Math.random() * Math.PI * 2;
    }

    return [pos, phase];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    // Slow rotation of the starfield
    pointsRef.current.rotation.y += delta * 0.02;
    
    // Twinkle animation could be done via a custom shader, but to keep it simple and performant
    // we let the slow camera float and rotation handle the alive feeling.
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
