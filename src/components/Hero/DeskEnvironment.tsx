"use client";

import { useRef, useState, useCallback, useEffect, useLayoutEffect, useMemo } from "react";
import { useFrame, Canvas, ThreeEvent, useThree } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";
import { ContactShadows, RoundedBox, Html } from "@react-three/drei";

/* ─── Lamp color palette ──────────────────────────────────── */
const LAMP_PALETTE = [
  { hex: "#fbf8f3", label: "Warm Ivory" },
  { hex: "#f0f5fa", label: "Ice White" },
  { hex: "#ffd700", label: "Golden Yellow" },
  { hex: "#ffb703", label: "Sunset Gold" },
  { hex: "#6bcb77", label: "Mint Green" },
  { hex: "#06d6a0", label: "Emerald Green" },
  { hex: "#4d96ff", label: "Electric Blue" },
  { hex: "#5d3fd3", label: "Deep Indigo" },
  { hex: "#c77dff", label: "Violet" },
  { hex: "#ff70a6", label: "Hot Pink" },
];


type LampState = { colorIdx: number };

/* ─── LampLight: colors the ENTIRE scene with lamp hue ────── */
function LampLight({ lampState }: { lampState: React.MutableRefObject<LampState> }) {
  const pointRef = useRef<THREE.PointLight>(null!);
  const ambRef = useRef<THREE.AmbientLight>(null!);
  const fillRef = useRef<THREE.PointLight>(null!);
  const t = useRef(0);

  useFrame((_, d) => {
    t.current += d;
    const target = new THREE.Color(LAMP_PALETTE[lampState.current.colorIdx].hex);
    const flicker = Math.sin(t.current * 2.5) * 0.15;

    // Check if the current color is one of the white colors (Warm Ivory or Ice White)
    const isWhite = target.r > 0.92 && target.g > 0.92 && target.b > 0.92;

    // Close lamp point — visible colored light near shade
    if (pointRef.current) {
      pointRef.current.color.lerp(target, d * 5);
      pointRef.current.intensity = (isWhite ? 3.4 : 2.5) + flicker;
    }
    // Ambient — gentle scene tint (more intense and cleaner for white rooms)
    if (ambRef.current) {
      const targetIntensity = isWhite ? 0.76 : 0.48;
      ambRef.current.intensity = THREE.MathUtils.lerp(ambRef.current.intensity, targetIntensity, d * 2.5);

      const ambTarget = new THREE.Color(isWhite ? "#fafafa" : "#f8f4ee").lerp(target, isWhite ? 0.45 : 0.25);
      ambRef.current.color.lerp(ambTarget, d * 2.5);
    }
    // Wide fill — no distance cap so it reaches all walls, but kept dim
    if (fillRef.current) {
      fillRef.current.color.lerp(target, d * 2.5);
      fillRef.current.intensity = (isWhite ? 1.2 : 0.8) + flicker * 0.3;
    }
  });

  return (
    <>
      {/* Local lamp point — casts colored shadows on desk */}
      <pointLight ref={pointRef} position={[2.55, 1.85, 0.5]} intensity={2.5} decay={2} castShadow />
      {/* Wide fill — unlimited range, tints room walls */}
      <pointLight ref={fillRef} position={[2.55, 4.0, 0.0]} intensity={0.8} decay={1.2} />
      {/* Ambient — lamp tint across every surface */}
      <ambientLight ref={ambRef} intensity={0.5} color="#f8f4ee" />
    </>
  );
}

/* ─── Desk Lamp (dome shade / single arm / oval base) ────── */
/*
  Coordinate note (local to lamp group):
    Base sits at y=0, arm leans slightly back (−Z direction).
    Shade SphereGeometry(thetaLength=PI·0.56): top-hemisphere dome,
    pole at +Y (closed), opening ring at ≈equator+10° (open).
    rotation[0]=+0.5 → pole rotates up+back; opening rotates down+forward ✓
*/
function DeskLamp({
  lampState,
  onLampClick,
}: {
  lampState: React.MutableRefObject<LampState>;
  onLampClick: () => void;
}) {
  const outerMat = useRef<THREE.MeshStandardMaterial>(null!);
  const innerMat = useRef<THREE.MeshStandardMaterial>(null!);
  const halo = useRef<THREE.Mesh>(null!);
  const t = useRef(0);
  const hovered = useRef(false);

  useFrame((_, d) => {
    t.current += d;
    const target = new THREE.Color(LAMP_PALETTE[lampState.current.colorIdx].hex);

    if (innerMat.current) {
      innerMat.current.color.lerp(target, d * 4);
      innerMat.current.emissive.lerp(target, d * 4);
      innerMat.current.emissiveIntensity = 1.4 + Math.sin(t.current * 2.5) * 0.4;
    }
    if (outerMat.current) {
      outerMat.current.color.lerp(
        new THREE.Color("#edeae5").lerp(target, 0.09),
        d * 2
      );
    }
    if (halo.current) {
      const m = halo.current.material as THREE.MeshBasicMaterial;
      m.color.lerp(target, d * 3);
      m.opacity = hovered.current ? 0.20 : 0.07;
    }
  });

  const onClick = useCallback((e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); onLampClick(); }, [onLampClick]);
  const onPointerOver = useCallback(() => { hovered.current = true; document.body.style.cursor = "pointer"; }, []);
  const onPointerOut = useCallback(() => { hovered.current = false; document.body.style.cursor = "default"; }, []);

  return (
    <group position={[2.55, 0.055, 0.10]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.175, 0.215, 0.030, 64]} />
        <meshStandardMaterial color="#edeae5" roughness={0.13} metalness={0.07} />
      </mesh>
      <mesh position={[0, 0.013, 0]}>
        <torusGeometry args={[0.192, 0.011, 10, 64]} />
        <meshStandardMaterial color="#e4e0db" roughness={0.18} metalness={0.10} />
      </mesh>
      <mesh position={[0, 0.030, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.020, 16]} />
        <meshStandardMaterial color="#d6d2cd" roughness={0.18} metalness={0.15} />
      </mesh>
      <mesh position={[0, 0.67, -0.05]} rotation={[-0.08, 0, 0]} castShadow>
        <cylinderGeometry args={[0.010, 0.010, 1.26, 14]} />
        <meshStandardMaterial color="#e0dcd8" roughness={0.14} metalness={0.12} />
      </mesh>
      <group position={[0, 1.28, -0.10]}>
        <mesh castShadow>
          <boxGeometry args={[0.052, 0.058, 0.036]} />
          <meshStandardMaterial color="#d6d2cd" roughness={0.14} metalness={0.18} />
        </mesh>
        {([-0.036, 0.036] as number[]).map((x, i) => (
          <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.009, 0.009, 0.015, 10]} />
            <meshStandardMaterial color="#c6c2bd" roughness={0.10} metalness={0.28} />
          </mesh>
        ))}
        <group position={[0, 0.26, 0.08]} rotation={[0.65, 0, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.30, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
            <meshStandardMaterial
              ref={outerMat}
              color="#edeae5"
              roughness={0.10}
              metalness={0.05}
              side={THREE.FrontSide}
            />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.292, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
            <meshStandardMaterial
              ref={innerMat}
              color="#ff6b6b"
              emissive="#ff6b6b"
              emissiveIntensity={1.8}
              side={THREE.DoubleSide}
              transparent
              opacity={0.90}
            />
          </mesh>
          <mesh position={[0, -0.295 * Math.cos(Math.PI * 0.55), 0]}>
            <circleGeometry args={[0.292 * Math.sin(Math.PI * 0.55), 32]} />
            <meshBasicMaterial
              color="#ff6b6b"
              transparent
              opacity={0.55}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
          <mesh ref={halo}>
            <sphereGeometry args={[0.42, 16, 16]} />
            <meshBasicMaterial color="#ff6b6b" transparent opacity={0.07} />
          </mesh>
          <mesh onClick={onClick} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
            <sphereGeometry args={[0.58, 12, 12]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/* ─── Interactive Drawer Component ────────────────────────── */
function InteractiveDrawer({ y }: { y: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const zOffset = useRef(0.79);
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, d) => {
    // Smoothly lerp towards target Z position (closed = 0.79, open = 1.24)
    const targetZ = isOpen ? 1.24 : 0.79;
    zOffset.current = THREE.MathUtils.lerp(zOffset.current, targetZ, d * 10);
    if (groupRef.current) {
      groupRef.current.position.z = zOffset.current;
    }
  });

  const onClick = useCallback((e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }, []);

  const onPointerOver = useCallback((e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
  }, []);

  const onPointerOut = useCallback((e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    document.body.style.cursor = "default";
  }, []);

  return (
    <group
      ref={groupRef}
      position={[0, y, 0.79]}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      {/* Drawer Face */}
      <mesh castShadow>
        <boxGeometry args={[0.66, 0.40, 0.03]} />
        <meshStandardMaterial color="#ece9e2" roughness={0.20} />
      </mesh>
      {/* Drawer Handle */}
      <mesh position={[0, 0, 0.02]} castShadow>
        <boxGeometry args={[0.18, 0.016, 0.012]} />
        <meshStandardMaterial color="#b3ad9f" roughness={0.15} metalness={0.35} />
      </mesh>
      {/* Drawer Box (inner compartment) */}
      <mesh position={[0, -0.05, -0.40]} castShadow>
        <boxGeometry args={[0.60, 0.28, 0.78]} />
        <meshStandardMaterial color="#dfdad0" roughness={0.30} />
      </mesh>
    </group>
  );
}

/* ─── Desk ────────────────────────────────────────────────── */
function Desk() {
  return (
    <group>
      {/* Desk Top - Warm Oak finish for high contrast and beautiful light reflection */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[5.85, 0.08, 1.62]} />
        <meshStandardMaterial color="#c59866" roughness={0.18} metalness={0.05} />
      </mesh>
      {/* Left leg panel */}
      <group position={[-2.77, -0.77, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.075, 1.46, 1.58]} />
          <meshStandardMaterial color="#e5e1da" roughness={0.25} />
        </mesh>
      </group>
      {/* Right drawer cabinet with front-facing drawers */}
      <group position={[2.18, -0.77, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.72, 1.46, 1.58]} />
          <meshStandardMaterial color="#e5e1da" roughness={0.25} />
        </mesh>
        {([0.45, 0.0, -0.45] as number[]).map((y, i) => (
          <InteractiveDrawer key={i} y={y} />
        ))}
      </group>
      {/* Bottom desk frame bar */}
      <mesh position={[0, -1.50, 0]}>
        <boxGeometry args={[5.85, 0.015, 1.62]} />
        <meshStandardMaterial color="#d4cebe" roughness={0.30} />
      </mesh>
    </group>
  );
}

/* ─── Monitor (thin-bezel, T-stand with YouTube Iframe Display) ─── */
function Monitor({
  playing,
  iframeRef,
  onIframeLoad,
}: {
  playing: boolean;
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
  onIframeLoad: () => void;
}) {
  return (
    <group position={[-0.28, 0.04, -0.26]}>
      {/* Stand Base */}
      <mesh position={[0, 0.016, 0.0]} castShadow receiveShadow>
        <boxGeometry args={[0.58, 0.026, 0.32]} />
        <meshStandardMaterial color="#d6d2cd" roughness={0.18} metalness={0.08} />
      </mesh>
      {/* Vertical Post (Stand) */}
      <mesh position={[0, 0.38, -0.04]} castShadow>
        <boxGeometry args={[0.028, 0.70, 0.028]} />
        <meshStandardMaterial color="#d6d2cd" roughness={0.18} metalness={0.08} />
      </mesh>
      {/* Bezel */}
      <mesh position={[0, 0.80, 0.0]} castShadow>
        <boxGeometry args={[2.10, 1.20, 0.050]} />
        <meshStandardMaterial color="#1f1e24" roughness={0.25} metalness={0.15} />
      </mesh>
      {/* Screen Display Panel Base */}
      <mesh position={[0, 0.80, 0.026]}>
        <planeGeometry args={[1.98, 1.08]} />
        <meshStandardMaterial color="#040408" roughness={0.4} />
      </mesh>

      {/* Screen Display HTML content (YouTube iframe projected in 3D with padding bezel) */}
      <group position={[0, 0.80, 0.027]}>
        <Html
          transform
          distanceFactor={1.30}
          style={{
            width: "824px",
            height: "486px",
            backgroundColor: "#232229",
            borderRadius: "8px",
            boxShadow: "0 15px 35px rgba(0,0,0,0.5)",
            padding: "12px 12px 24px 12px",
            boxSizing: "border-box",
            overflow: "hidden",
            pointerEvents: "auto"
          }}
        >
          <iframe
            ref={iframeRef}
            onLoad={onIframeLoad}
            width="800"
            height="450"
            src="https://www.youtube.com/embed/bRXWSDxBWDg?enablejsapi=1&autoplay=1&mute=0&controls=1&rel=0&vq=large"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{
              border: "none",
              width: "800px",
              height: "450px",
              borderRadius: "4px",
              display: "block"
            }}
          />
        </Html>
      </group>
    </group>
  );
}

/* ─── Keyboard (compact mechanical) ──────────────────────── */
function Keyboard() {
  return (
    <group position={[-0.28, 0.059, 0.38]}>
      <mesh castShadow>
        <boxGeometry args={[1.06, 0.038, 0.40]} />
        <meshStandardMaterial color="#e5e1dc" roughness={0.26} />
      </mesh>
      <mesh position={[0, 0.021, -0.02]}>
        <boxGeometry args={[1.02, 0.004, 0.34]} />
        <meshStandardMaterial color="#ece8e3" roughness={0.20} />
      </mesh>
      {[-0.145, -0.065, 0.015, 0.095].map((z, ri) =>
        Array.from({ length: 13 }).map((_, ki) => (
          <mesh key={`${ri}-${ki}`} position={[-0.468 + ki * 0.077, 0.024, z]}>
            <boxGeometry args={[0.065, 0.008, 0.060]} />
            <meshStandardMaterial color="#f0ece7" roughness={0.18} />
          </mesh>
        ))
      )}
    </group>
  );
}

/* ─── Mouse (small oval dome with click integration) ─────── */
function Mouse({ onMouseClick }: { onMouseClick: () => void }) {
  const onPointerOver = useCallback(() => { document.body.style.cursor = "pointer"; }, []);
  const onPointerOut  = useCallback(() => { document.body.style.cursor = "default"; }, []);
  const onClick       = useCallback((e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); onMouseClick(); }, [onMouseClick]);

  return (
    <group
      position={[0.84, 0.04, 0.36]}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <mesh castShadow>
        <sphereGeometry args={[0.068, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#e5e1dc" roughness={0.20} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.068, 28]} />
        <meshStandardMaterial color="#dedad5" roughness={0.20} />
      </mesh>
    </group>
  );
}

/* ─── Small items on desk (notebook / trackpad) ───────────── */
function DeskItems() {
  return (
    <group position={[-1.65, 0.04, 0.25]} rotation={[0, 0.18, 0]}>
      {/* Notebook Cover (Terracotta leather) */}
      <mesh castShadow receiveShadow position={[0, 0.004, 0]}>
        <boxGeometry args={[0.46, 0.008, 0.32]} />
        <meshStandardMaterial color="#8b4f39" roughness={0.6} />
      </mesh>
      
      {/* Left Page (creamy white paper) */}
      <mesh castShadow position={[-0.105, 0.010, 0]} rotation={[0, 0, 0.03]}>
        <boxGeometry args={[0.20, 0.008, 0.30]} />
        <meshStandardMaterial color="#faf6ee" roughness={0.8} />
      </mesh>

      {/* Right Page (creamy white paper) */}
      <mesh castShadow position={[0.105, 0.010, 0]} rotation={[0, 0, -0.03]}>
        <boxGeometry args={[0.20, 0.008, 0.30]} />
        <meshStandardMaterial color="#faf6ee" roughness={0.8} />
      </mesh>

      {/* Notebook Spine/Binding */}
      <mesh position={[0, 0.011, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.006, 0.006, 0.30, 8]} />
        <meshStandardMaterial color="#6b3f2e" roughness={0.7} />
      </mesh>

      {/* Red Ribbon Bookmark */}
      <mesh position={[0.04, 0.015, 0.05]} rotation={[0, -0.05, 0]}>
        <boxGeometry args={[0.012, 0.001, 0.22]} />
        <meshStandardMaterial color="#a93c3c" roughness={0.4} />
      </mesh>
    </group>
  );
}

/* ─── Chair ───────────────────────────────────────────────── */
function Chair() {
  return (
    <group position={[-0.15, -0.77, 1.88]}>
      <RoundedBox args={[0.78, 0.056, 0.72]} radius={0.04} smoothness={4} castShadow>
        <meshStandardMaterial color="#edeae5" roughness={0.42} />
      </RoundedBox>
      <RoundedBox
        args={[0.76, 0.78, 0.054]}
        radius={0.04}
        smoothness={4}
        position={[0, 0.46, 0.33]}
        castShadow
      >
        <meshStandardMaterial color="#edeae5" roughness={0.42} />
      </RoundedBox>
      {([
        [-0.34, -0.378, 0.29],
        [0.34, -0.378, 0.29],
        [-0.34, -0.378, -0.29],
        [0.34, -0.378, -0.29],
      ] as [number, number, number][]).map((p, i) => (
        <mesh key={i} position={p} castShadow>
          <cylinderGeometry args={[0.018, 0.018, 0.70, 10]} />
          <meshStandardMaterial color="#c2beba" roughness={0.20} metalness={0.16} />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Room — lamp-reactive walls (full-scene color) ──────── */
function Room({
  lampState,
}: {
  lampState: React.MutableRefObject<LampState>;
}) {
  const backWallMat = useRef<THREE.MeshStandardMaterial>(null!);
  const leftWallMat = useRef<THREE.MeshStandardMaterial>(null!);
  const rightWallMat = useRef<THREE.MeshStandardMaterial>(null!);
  const floorMat = useRef<THREE.MeshStandardMaterial>(null!);
  const ceilMat = useRef<THREE.MeshStandardMaterial>(null!);
  const t = useRef(0);

  useFrame((_, d) => {
    t.current += d;
    const lampColor = new THREE.Color(LAMP_PALETTE[lampState.current.colorIdx].hex);
    const flicker = Math.sin(t.current * 1.5) * 0.02;

    const isWhite = lampColor.r > 0.92 && lampColor.g > 0.92 && lampColor.b > 0.92;
    const backWallBase = isWhite ? new THREE.Color("#ffffff") : new THREE.Color("#f0ede8");
    const sideWallBase = isWhite ? new THREE.Color("#fbfbfb") : new THREE.Color("#edeae5");
    const floorBase = isWhite ? new THREE.Color("#f5f5f5") : new THREE.Color("#dedad4");
    const ceilBase = isWhite ? new THREE.Color("#ffffff") : new THREE.Color("#f5f3ef");

    const blendFactor = isWhite ? 0.38 : 0.20;

    if (backWallMat.current) {
      backWallMat.current.color.lerp(
        new THREE.Color(backWallBase).lerp(lampColor, blendFactor + flicker),
        d * 2.0
      );
    }
    if (leftWallMat.current) {
      leftWallMat.current.color.lerp(
        new THREE.Color(sideWallBase).lerp(lampColor, (blendFactor * 0.8) + flicker),
        d * 2.0
      );
    }
    if (rightWallMat.current) {
      rightWallMat.current.color.lerp(
        new THREE.Color(sideWallBase).lerp(lampColor, (blendFactor * 0.8) + flicker),
        d * 2.0
      );
    }
    if (floorMat.current) {
      floorMat.current.color.lerp(
        new THREE.Color(floorBase).lerp(lampColor, (blendFactor * 0.7) + flicker),
        d * 2.0
      );
    }
    if (ceilMat.current) {
      ceilMat.current.color.lerp(
        new THREE.Color(ceilBase).lerp(lampColor, blendFactor + flicker),
        d * 2.0
      );
    }
  });

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.50, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial ref={floorMat} color="#f0ede8" roughness={0.72} />
      </mesh>
      <mesh position={[0, 2.5, -4.0]} receiveShadow>
        <planeGeometry args={[26, 12]} />
        <meshStandardMaterial ref={backWallMat} color="#f8f6f2" roughness={0.55} />
      </mesh>
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[8, 2.5, 0]} receiveShadow>
        <planeGeometry args={[16, 12]} />
        <meshStandardMaterial ref={rightWallMat} color="#f5f2ee" roughness={0.58} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-7, 2.5, 0]} receiveShadow>
        <planeGeometry args={[16, 12]} />
        <meshStandardMaterial ref={leftWallMat} color="#f5f2ee" roughness={0.58} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 5.5, 0]} receiveShadow>
        <planeGeometry args={[30, 16]} />
        <meshStandardMaterial ref={ceilMat} color="#fcfcfb" roughness={0.50} />
      </mesh>
      <mesh position={[0, -1.42, -3.97]} receiveShadow>
        <boxGeometry args={[26, 0.16, 0.025]} />
        <meshStandardMaterial color="#dedad5" roughness={0.30} />
      </mesh>
      <mesh position={[0, 2.0, -3.96]} castShadow receiveShadow>
        <boxGeometry args={[8, 4, 0.04]} />
        <meshStandardMaterial color="#e8e4de" roughness={0.4} />
      </mesh>
    </group>
  );
}

/* ─── Full scene ──────────────────────────────────────────── */
function DeskScene({
  lampState,
  onLampClick,
  playing,
  iframeRef,
  onMouseClick,
  onIframeLoad,
}: {
  lampState: React.MutableRefObject<LampState>;
  onLampClick: () => void;
  playing: boolean;
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
  onMouseClick: () => void;
  onIframeLoad: () => void;
}) {
  return (
    <>
      {/* Directional kept dim — lamp ambient dominates color */}
      <directionalLight
        position={[-4, 8, 5]}
        intensity={0.35}
        color="#ffffff"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={32}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <LampLight lampState={lampState} />
      <group position={[1.50, 0, 0]}>
        <Room lampState={lampState} />
        <Desk />
        <Monitor playing={playing} iframeRef={iframeRef} onIframeLoad={onIframeLoad} />
        <Keyboard />
        <Mouse onMouseClick={onMouseClick} />
        <DeskItems />
        <DeskLamp lampState={lampState} onLampClick={onLampClick} />
        <Chair />

        <ContactShadows
          position={[0, -1.49, 0]}
          opacity={0.52}
          scale={20}
          blur={3.0}
          far={6}
        />
      </group>
    </>
  );
}

/* ─── Full-screen colour wash — canvas tinted by lamp ──────── */
function ColorWash({ color }: { color: string }) {
  return (
    <>
      {/* Subtle full-screen tint — shifts background gently */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: color,
          opacity: 0.10,
          pointerEvents: "none",
          zIndex: 1,
          transition: "background 0.6s cubic-bezier(0.4,0,0.2,1)",
        }}
      />
      {/* Glow cone from lamp (top-right) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 70% 65% at 80% 5%, ${color}44 0%, ${color}22 45%, transparent 75%)`,
          pointerEvents: "none",
          zIndex: 2,
          transition: "background 0.6s cubic-bezier(0.4,0,0.2,1)",
        }}
      />
      {/* Floor bounce */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 100% 35% at 50% 100%, ${color}28 0%, transparent 65%)`,
          pointerEvents: "none",
          zIndex: 2,
          transition: "background 0.6s cubic-bezier(0.4,0,0.2,1)",
        }}
      />
    </>
  );
}

function LampBadge({ color }: { color: string }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 24,
        right: 28,
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
        pointerEvents: "none",
        userSelect: "none",
        transition: "opacity 0.4s ease",
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: color,
          boxShadow: `0 0 8px 3px ${color}88`,
          flexShrink: 0,
          transition: "background 0.5s ease, box-shadow 0.5s ease",
        }}
      />
    </div>
  );
}

/* ─── Responsive camera manager ───────────────────────────── */
function ResponsiveCamera() {
  const { size, camera } = useThree();

  useLayoutEffect(() => {
    const aspect = size.width / size.height;
    
    if (camera instanceof THREE.PerspectiveCamera) {
      if (aspect < 1.0) {
        // Mobile / Portrait
        camera.fov = 54;
        const targetZ = Math.min(10.5, Math.max(5.5, 4.6 / aspect));
        camera.position.set(-0.4, 1.45, targetZ);
        camera.lookAt(0.9, 0.25, 0);
      } else if (aspect < 1.45) {
        // Tablet / Narrow Landscape
        camera.fov = 46;
        const targetZ = Math.min(7.5, Math.max(5.5, 5.2 / aspect));
        camera.position.set(-0.4, 1.35, targetZ);
        camera.lookAt(0.85, 0.1, 0);
      } else {
        // Desktop / Widescreen
        camera.fov = 44;
        camera.position.set(-0.4, 1.3, 5.5);
        camera.lookAt(0.8, 0, 0);
      }
      camera.updateProjectionMatrix();
    }
  }, [size.width, size.height, camera]);

  return null;
}

/* ─── Root component ──────────────────────────────────────── */
export default function DeskEnvironment() {
  const [colorIdx, setColorIdx] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [playing, setPlaying] = useState(true);
  const lampStateRef = useRef<LampState>({ colorIdx: 0 });
  const iframeRef = useRef<HTMLIFrameElement>(null);

  /* Suppress known R3F / Three.js internal deprecation warnings */
  useEffect(() => {
    const _warn = console.warn.bind(console);
    console.warn = (...args: unknown[]) => {
      const m = String(args[0] ?? "");
      if (m.includes("THREE.Clock") || m.includes("PCFSoftShadowMap")) return;
      _warn(...args);
    };
    return () => { console.warn = _warn; };
  }, []);

  // Sync play/pause state with YouTube iframe using postMessage Player API
  useEffect(() => {
    if (!iframeRef.current) return;
    const cmd = playing ? "playVideo" : "pauseVideo";
    const message = JSON.stringify({ event: "command", func: cmd, args: "" });
    iframeRef.current.contentWindow?.postMessage(message, "*");
  }, [playing]);

  // Handle iframe onload: wait a brief moment for player API, then unmute and set volume to 30%
  const handleIframeLoad = useCallback(() => {
    setTimeout(() => {
      if (!iframeRef.current) return;
      const unmuteMsg = JSON.stringify({ event: "command", func: "unMute", args: "" });
      const volumeMsg = JSON.stringify({ event: "command", func: "setVolume", args: [30] });
      iframeRef.current.contentWindow?.postMessage(unmuteMsg, "*");
      iframeRef.current.contentWindow?.postMessage(volumeMsg, "*");

      // Ensure it is in playing state on initial load
      if (playing) {
        const playMsg = JSON.stringify({ event: "command", func: "playVideo", args: "" });
        iframeRef.current.contentWindow?.postMessage(playMsg, "*");
      }
    }, 1200);
  }, [playing]);

  const handleLampClick = useCallback(() => {
    const next = (lampStateRef.current.colorIdx + 1) % LAMP_PALETTE.length;
    lampStateRef.current.colorIdx = next;
    setColorIdx(next);
    setClicked(true);
  }, []);

  const handleMouseClick = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const current = LAMP_PALETTE[colorIdx];
  const isWhite = current.hex === "#fbf8f3" || current.hex === "#f0f5fa";

  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{
        background: isWhite ? "#faf9f6" : "#e8e4de",
        transition: "background 0.8s ease"
      }}
    >
      {/* Colour wash — blends lamp hue softly across bright room */}
      <ColorWash color={current.hex} />

      {/* Three.js canvas ── camera matches standard perspective */}
      <Canvas
        camera={{ position: [-0.4, 1.3, 5.5], fov: 44, near: 0.1, far: 60 }}
        shadows={{ type: THREE.PCFShadowMap }}
        gl={{
          antialias: true,
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.95,
        }}
        dpr={[1, 2]}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 3 }}
      >
        <ResponsiveCamera />
        <Suspense fallback={null}>
          <DeskScene
            lampState={lampStateRef}
            onLampClick={handleLampClick}
            playing={playing}
            iframeRef={iframeRef}
            onMouseClick={handleMouseClick}
            onIframeLoad={handleIframeLoad}
          />
        </Suspense>
      </Canvas>

      {/* Lamp status badge */}
      <LampBadge color={current.hex} />
    </div>
  );
}
