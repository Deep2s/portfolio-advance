"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three/webgpu";
import { texture, screenUV, color, mix, time, sin } from "three/tsl";

interface MusicBackgroundProps {
  analyserNode: AnalyserNode | null;
}

export default function MusicBackground({ analyserNode }: MusicBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGPURenderer;
    const analyserBuffer = new Uint8Array(1024);
    let analyserTexture: THREE.DataTexture;

    let isDisposed = false;

    async function init() {
      try {
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 30);

        // nodes
        analyserTexture = new THREE.DataTexture(analyserBuffer, analyserBuffer.length, 1, THREE.RedFormat);

        // Vibrant trending colors
        const cyan = color(0x00f0ff);
        const pink = color(0xff0055);
        const purple = color(0x8a2be2);
        
        // Create a dynamic 2D gradient based on screen UVs
        const gradientX = mix(cyan, pink, screenUV.x);
        const gradientY = mix(purple, gradientX, screenUV.y);

        // Idle motion: soft, slow drifting waves for when music is paused/empty
        const wave1 = sin(screenUV.x.mul(12).add(time.mul(1.2)));
        const wave2 = sin(screenUV.x.mul(6).sub(time.mul(0.7)));
        const idleWave = wave1.add(wave2).mul(0.25).add(0.5); // Map roughly to 0-1
        const idleSpectrum = idleWave.mul(screenUV.y).pow(1.5).mul(0.4); // Subtle presence

        // Active spectrum from audio
        const rawSpectrum = texture(analyserTexture, screenUV.x).x;
        const activeSpectrum = rawSpectrum.mul(screenUV.y).pow(0.7).mul(1.8);

        // Combine idle and active spectrums
        const spectrum = activeSpectrum.add(idleSpectrum);

        const backgroundNode = gradientY.mul(spectrum);

        // scene
        scene = new THREE.Scene();
        scene.backgroundNode = backgroundNode;

        // renderer
        renderer = new THREE.WebGPURenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        if (isDisposed) return;
        
        container.appendChild(renderer.domElement);

        await renderer.init();

        renderer.setAnimationLoop(() => {
          if (analyserNode) {
            analyserNode.getByteFrequencyData(analyserBuffer);
            analyserTexture.needsUpdate = true;
          }
          renderer.render(scene, camera);
        });

      } catch (err) {
        console.error("Failed to initialize WebGPU Audio Visualizer:", err);
      }
    }

    const onWindowResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', onWindowResize);

    init();

    return () => {
      isDisposed = true;
      window.removeEventListener('resize', onWindowResize);
      if (renderer) {
        renderer.setAnimationLoop(null);
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      }
    };
  }, [analyserNode]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        touchAction: "none",
        overflow: "hidden",
        pointerEvents: "none"
      }}
    />
  );
}
