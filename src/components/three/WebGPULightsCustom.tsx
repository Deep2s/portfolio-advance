"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three/webgpu";
import { color, lights } from "three/tsl";

// Custom Lighting Model implementation from the example
class CustomLightingModel extends THREE.LightingModel {
  direct({ lightColor, reflectedLight }: any) {
    reflectedLight.directDiffuse.addAssign(lightColor);
  }
}

interface WebGPULightsCustomProps {
  className?: string;
}

export default function WebGPULightsCustom({ className }: WebGPULightsCustomProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    
    let mounted = true;
    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGPURenderer;
    let light1: THREE.PointLight;
    let light2: THREE.PointLight;
    let light3: THREE.PointLight;

    // Initialization
    camera = new THREE.PerspectiveCamera(70, mount.clientWidth / mount.clientHeight, 0.1, 10);
    camera.position.z = 1.5;

    scene = new THREE.Scene();
    
    // We want the background to be transparent to see the hero gradients
    // The example uses a black background implicitly, but we'll leave scene.background = null

    const sphereGeometry = new THREE.SphereGeometry(0.02, 16, 8);

    const addLight = (hexColor: number) => {
      const material = new THREE.NodeMaterial();
      material.colorNode = color(hexColor);
      material.lightsNode = lights(); // ignore scene lights

      const mesh = new THREE.Mesh(sphereGeometry, material);

      const light = new THREE.PointLight(hexColor, 0.1, 1);
      light.add(mesh);

      scene.add(light);
      return light;
    };

    light1 = addLight(0xffaa00);
    light2 = addLight(0x0040ff);
    light3 = addLight(0x80ff80);

    const allLightsNode = lights([light1, light2, light3]);

    const points = [];
    for (let i = 0; i < 500000; i++) {
      const point = new THREE.Vector3().random().subScalar(0.5).multiplyScalar(3);
      points.push(point);
    }

    const geometryPoints = new THREE.BufferGeometry().setFromPoints(points);
    const materialPoints = new THREE.PointsNodeMaterial();

    const lightingModel = new CustomLightingModel();
    // @ts-ignore - 'context' is available at runtime but may be missing in @types/three
    const lightingModelContext = allLightsNode.context({ lightingModel });

    materialPoints.lightsNode = lightingModelContext;

    const pointCloud = new THREE.Points(geometryPoints, materialPoints);
    scene.add(pointCloud);

    // Renderer
    // We use alpha: true to allow the page's background gradient to show through
    renderer = new THREE.WebGPURenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    const animate = () => {
      if (!mounted) return;
      const time = Date.now() * 0.001;
      const scale = 0.5;

      light1.position.x = Math.sin(time * 0.7) * scale;
      light1.position.y = Math.cos(time * 0.5) * scale;
      light1.position.z = Math.cos(time * 0.3) * scale;

      light2.position.x = Math.cos(time * 0.3) * scale;
      light2.position.y = Math.sin(time * 0.5) * scale;
      light2.position.z = Math.sin(time * 0.7) * scale;

      light3.position.x = Math.sin(time * 0.7) * scale;
      light3.position.y = Math.cos(time * 0.3) * scale;
      light3.position.z = Math.sin(time * 0.5) * scale;

      scene.rotation.y = time * 0.1;

      renderer.renderAsync(scene, camera);
    };
    
    renderer.setAnimationLoop(animate);

    return () => {
      mounted = false;
      renderer.setAnimationLoop(null);
      window.removeEventListener("resize", handleResize);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      geometryPoints.dispose();
      materialPoints.dispose();
      sphereGeometry.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className={`w-full h-full ${className || ""}`} />;
}
