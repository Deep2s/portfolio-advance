"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

function GlassSphere({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.25;
    meshRef.current.rotation.x = t * 0.12;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.75, 32, 32]} />
        <MeshTransmissionMaterial
          backside
          samples={6}
          thickness={0.6}
          roughness={0.08}
          anisotropicBlur={0.12}
          iridescence={1}
          iridescenceIOR={1.2}
          iridescenceThicknessRange={[0, 1400]}
          color="#c084fc" // Light purple
          chromaticAberration={0.08}
        />
      </mesh>
    </Float>
  );
}

function WireframeTorus({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.12;
    meshRef.current.rotation.z = t * 0.18;
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.0}>
      <mesh ref={meshRef} position={position}>
        <torusKnotGeometry args={[0.52, 0.14, 128, 16]} />
        <meshStandardMaterial
          color="#818cf8" // Light indigo
          wireframe
          emissive="#818cf8"
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
}

export default function ExperienceBackground() {
  const count = 60; // 60x60 grid = 3,600 particles
  const spacing = 0.28; // Spacing between nodes

  // Generate initial grid position array
  const { positions } = useMemo(() => {
    const pos = new Float32Array(count * count * 3);
    
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const idx = i * count + j;
        
        // Center the grid around origin
        const x = (i - count / 2) * spacing;
        const y = (j - count / 2) * spacing;
        const z = 0;

        pos[idx * 3] = x;
        pos[idx * 3 + 1] = y;
        pos[idx * 3 + 2] = z;
      }
    }
    return { positions: pos };
  }, []);

  const pointsRef = useRef<THREE.Points>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const idx = i * count + j;
        
        const x = posAttr.getX(idx);
        const y = posAttr.getY(idx);

        // Compute complex undulating waves
        const distance = Math.sqrt(x * x + y * y);
        const w1 = Math.sin(distance * 0.8 - time * 1.8) * 0.38;
        const w2 = Math.cos(x * 0.6 + time * 1.2) * 0.18;
        const w3 = Math.sin(y * 0.4 - time * 0.8) * 0.14;
        
        const targetZ = w1 + w2 + w3;
        
        // Write height to position attribute
        posAttr.setZ(idx, targetZ);
      }
    }
    posAttr.needsUpdate = true;

    // Smoothly rotate the group based on cursor position
    const targetRotX = -Math.PI / 3.2 + state.pointer.y * 0.12;
    const targetRotY = state.pointer.x * 0.15;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, delta * 5);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 5);
  });

  return (
    <>
      {/* Lighting for advanced 3D geometries */}
      <ambientLight intensity={0.4} />
      <pointLight position={[6, 4, 3]} intensity={2.5} color="#818cf8" />
      <pointLight position={[-6, -2, -3]} intensity={2} color="#c084fc" />
      
      <group ref={groupRef} position={[0, -0.5, -1]}>
        {/* Floating Shapes */}
        <GlassSphere position={[-2.4, 1.4, -0.8]} />
        <WireframeTorus position={[2.4, 0.8, -1.2]} />

        {/* Undulating wave */}
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[positions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            color="#ffffff" // Clean white dots
            size={0.085}
            sizeAttenuation={true}
            transparent
            opacity={0.8}
          />
        </points>
      </group>
    </>
  );
}
