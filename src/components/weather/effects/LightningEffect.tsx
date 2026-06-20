import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function LightningEffect() {
  const lightRef = useRef<THREE.PointLight>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const scheduleLightning = () => {
      // Random interval between 5 and 15 seconds
      const nextStrike = 5000 + Math.random() * 10000;
      timeout = setTimeout(strike, nextStrike);
    };

    const strike = () => {
      if (lightRef.current) {
        // Flash intensely
        lightRef.current.intensity = 50 + Math.random() * 100;
        
        // Random position high up
        lightRef.current.position.set(
          (Math.random() - 0.5) * 40,
          10 + Math.random() * 10,
          -10 - Math.random() * 10
        );

        // Flicker off quickly
        setTimeout(() => {
          if (lightRef.current) lightRef.current.intensity = 0;
        }, 50 + Math.random() * 100);

        // Secondary flicker occasionally
        if (Math.random() > 0.5) {
          setTimeout(() => {
            if (lightRef.current) {
              lightRef.current.intensity = 30 + Math.random() * 50;
              setTimeout(() => {
                if (lightRef.current) lightRef.current.intensity = 0;
              }, 50);
            }
          }, 150 + Math.random() * 100);
        }
      }
      
      scheduleLightning();
    };

    scheduleLightning();

    return () => clearTimeout(timeout);
  }, []);

  return (
    <pointLight 
      ref={lightRef}
      color="#eef5ff"
      intensity={0} // Default to off
      distance={200}
      decay={2}
    />
  );
}
