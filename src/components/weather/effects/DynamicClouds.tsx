/* eslint-disable */
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DynamicCloudsProps {
  density: number; // 0 to 1
  windSpeed: number;
}

function CloudGroup({ position, scale }: { position: [number, number, number], scale: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Apple Weather style soft clouds
  // Using multiple thin, overlapping translucent spheres for volumetric-like softness
  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh position={[-2, 0, 0]}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.6} roughness={1} depthWrite={false} />
      </mesh>
      <mesh position={[2, -0.5, 1]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color="#f8f9fa" transparent opacity={0.5} roughness={1} depthWrite={false} />
      </mesh>
      <mesh position={[0, 1.5, -1]}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.7} roughness={1} depthWrite={false} />
      </mesh>
      <mesh position={[3, 0.5, -2]}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshStandardMaterial color="#f1f3f5" transparent opacity={0.4} roughness={1} depthWrite={false} />
      </mesh>
    </group>
  );
}

export default function DynamicClouds({ density, windSpeed }: DynamicCloudsProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Determine how many cloud clusters to show based on density
  const cloudCount = Math.floor(density * 10) + 2;

  const cloudsData = useMemo(() => {
    const data = [];
    for (let i = 0; i < cloudCount; i++) {
      data.push({
        position: [
          (Math.random() - 0.5) * 60, // x
          8 + Math.random() * 8,      // y (high in the sky)
          -10 - Math.random() * 30    // z (in the background)
        ] as [number, number, number],
        scale: 1 + Math.random() * 1.5,
        speed: 0.5 + Math.random() * 1.5
      });
    }
    return data;
  }, [cloudCount]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Wind affects horizontal movement
    const baseSpeed = Math.max(windSpeed * 0.1, 1); 
    groupRef.current.position.x += baseSpeed * delta;

    if (groupRef.current.position.x > 80) {
      groupRef.current.position.x = -80;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} color="#ffffff" />
      <directionalLight position={[10, 20, 10]} intensity={1} color="#ffffff" />
      
      {cloudsData.map((cloud, i) => (
        <CloudGroup 
          key={i} 
          position={cloud.position} 
          scale={cloud.scale} 
        />
      ))}
    </group>
  );
}
