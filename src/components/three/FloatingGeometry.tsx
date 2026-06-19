"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

// THREE.Color doesn't understand oklch — use hex equivalents
const PURPLE = "#a855f7"; // ~oklch(0.65 0.22 290)
const CYAN = "#22d3ee";   // ~oklch(0.75 0.15 200)
const VIOLET = "#c026d3"; // ~oklch(0.58 0.28 300)
const AMBER = "#f59e0b";  // ~oklch(0.72 0.18 60)
const GREEN = "#4ade80";  // ~oklch(0.72 0.18 140)

function Icosahedron({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = t * 0.15;
    meshRef.current.rotation.y = t * 0.22;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color={PURPLE}
          wireframe
          emissive={PURPLE}
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
}

function TorusKnot({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = t * 0.1;
    meshRef.current.rotation.z = t * 0.18;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position}>
        <torusKnotGeometry args={[0.8, 0.2, 128, 16]} />
        <meshStandardMaterial
          color={CYAN}
          wireframe
          emissive={CYAN}
          emissiveIntensity={0.4}
        />
      </mesh>
    </Float>
  );
}

function Sphere({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y = t * 0.3;
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <MeshTransmissionMaterial
          backside
          samples={6}
          thickness={0.5}
          roughness={0.0}
          anisotropicBlur={0.1}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          color={VIOLET}
          chromaticAberration={0.06}
        />
      </mesh>
    </Float>
  );
}

export default function FloatingGeometry() {
  return (
    <>
      {/* Ambient + point lights */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={2} color={PURPLE} />
      <pointLight position={[-5, -3, -3]} intensity={1.5} color={CYAN} />
      <pointLight position={[0, 5, -5]} intensity={1} color="white" />

      {/* Main 3D shapes */}
      <Icosahedron position={[-3.5, 1, -2]} />
      <TorusKnot position={[3.5, -0.5, -3]} />
      <Sphere position={[0.5, 1.5, -4]} />

      {/* Smaller accent shapes */}
      <Float speed={3} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-1.5, -2, -1]}>
          <octahedronGeometry args={[0.4]} />
          <meshStandardMaterial
            color={AMBER}
            emissive={AMBER}
            emissiveIntensity={0.8}
          />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.5}>
        <mesh position={[2, 2.5, -1.5]}>
          <tetrahedronGeometry args={[0.35]} />
          <meshStandardMaterial
            color={GREEN}
            emissive={GREEN}
            emissiveIntensity={0.7}
          />
        </mesh>
      </Float>
    </>
  );
}
