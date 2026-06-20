import { Canvas, useFrame } from "@react-three/fiber";
import RainEffect from "./RainEffect";
import SnowEffect from "./SnowEffect";
import FogEffect from "./FogEffect";
import LightningEffect from "./LightningEffect";
import StarsEffect from "./StarsEffect";
import { WeatherEngineState } from "../engine/weatherEngine";
import MorningScene from "../environments/MorningScene";
import AfternoonScene from "../environments/AfternoonScene";
import EveningScene from "../environments/EveningScene";
import NightScene from "../environments/NightScene";
import DynamicClouds from "./DynamicClouds";

// Slow living movement for the effects camera
function FloatingCamera() {
  useFrame(({ camera, clock }) => {
    const time = clock.getElapsedTime();
    // Subtle float
    camera.position.x = Math.sin(time * 0.3) * 0.3;
    camera.position.y = 2 + Math.sin(time * 0.15) * 0.2;
    // Slow rotation to give depth feeling
    camera.rotation.z = Math.sin(time * 0.05) * 0.02;
    camera.lookAt(0, 5, 0);
  });
  return null;
}

export default function EffectsCanvas({ engineState }: { engineState: WeatherEngineState }) {
  const isPlaceholder = engineState.splineUrl.includes("placeholder");
  const { effects, sceneType } = engineState;

  return (
    <Canvas
      camera={{ position: [0, 2, 10], fov: 60 }}
      dpr={[1, 2]} // Optimize for mobile vs desktop
      gl={{ antialias: true, alpha: true }} // Alpha true so Spline is visible underneath!
    >
      <FloatingCamera />
      
      {/* Fallback R3F Environments if Spline is missing */}
      {isPlaceholder && (
        <>
          {sceneType === "MORNING" && <MorningScene />}
          {(sceneType === "DAY_CLEAR" || sceneType === "CLOUDY") && <AfternoonScene />}
          {sceneType === "SUNSET" && <EveningScene />}
          {(sceneType === "NIGHT" || sceneType === "RAIN" || sceneType === "STORM") && <NightScene showStars={false} />}
          
          {/* Always show some dynamic clouds as fallback */}
          <DynamicClouds density={0.5} windSpeed={5} />
        </>
      )}

      {/* Particle Systems */}
      {effects.showRain && <RainEffect intensity={effects.rainIntensity} windSpeed={5} />}
      {effects.showSnow && <SnowEffect intensity={effects.snowIntensity} />}
      {effects.showStars && <StarsEffect />}
      
      {/* Atmospherics */}
      {effects.showFog && <FogEffect intensity={1} />}
      {effects.showLightning && <LightningEffect />}
    </Canvas>
  );
}
