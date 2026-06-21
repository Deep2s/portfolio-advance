"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function HireBackground() {
  const { viewport } = useThree();
  const count = 75; // Number of particle nodes

  // Initialize nodes with random positions and velocities
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 4
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.15,
          (Math.random() - 0.5) * 0.15,
          (Math.random() - 0.5) * 0.1
        )
      });
    }
    return temp;
  }, []);

  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    // Graceful hover tracking with lerp
    const targetX = state.pointer.x * (viewport.width / 2);
    const targetY = state.pointer.y * (viewport.height / 2);
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, targetX, delta * 6);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, targetY, delta * 6);

    const positions = new Float32Array(count * 3);
    const linePositions: number[] = [];

    particles.forEach((p, idx) => {
      // Apply movement delta
      p.position.x += p.velocity.x * delta * 4;
      p.position.y += p.velocity.y * delta * 4;
      p.position.z += p.velocity.z * delta * 4;

      // Handle screen boundaries
      const boundX = viewport.width / 2 + 0.8;
      const boundY = viewport.height / 2 + 0.8;

      if (Math.abs(p.position.x) > boundX) p.velocity.x *= -1;
      if (Math.abs(p.position.y) > boundY) p.velocity.y *= -1;
      if (Math.abs(p.position.z) > 3) p.velocity.z *= -1;

      // Cursor push/pull interactive physics
      const mouseVec = new THREE.Vector3(mouse.current.x, mouse.current.y, p.position.z);
      const mouseDist = p.position.distanceTo(mouseVec);
      if (mouseDist < 2.5) {
        const force = (2.5 - mouseDist) * 0.18;
        const dir = p.position.clone().sub(mouseVec).normalize();
        p.position.addScaledVector(dir, force * delta * 8);
      }

      positions[idx * 3] = p.position.x;
      positions[idx * 3 + 1] = p.position.y;
      positions[idx * 3 + 2] = p.position.z;
    });

    // Populate lines geometry connecting adjacent nodes
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dist = particles[i].position.distanceTo(particles[j].position);
        if (dist < 2.0) {
          linePositions.push(
            particles[i].position.x, particles[i].position.y, particles[i].position.z,
            particles[j].position.x, particles[j].position.y, particles[j].position.z
          );
        }
      }
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (linesRef.current) {
      linesRef.current.geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(linePositions), 3)
      );
      linesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <points ref={pointsRef}>
        <bufferGeometry />
        <pointsMaterial
          color="#ffffff"
          size={0.075}
          sizeAttenuation={true}
          transparent
          opacity={0.6}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.12}
          linewidth={1}
        />
      </lineSegments>
    </>
  );
}
