"use client";

import { useWeather } from "@/hooks/useWeather";
import { determineWeatherState } from "./engine/weatherEngine";
import SplineWeatherScene from "./spline/SplineWeatherScene";
import WeatherOverlay from "./WeatherOverlay";
import dynamic from "next/dynamic";
import { Loader2, AlertCircle } from "lucide-react";

// Dynamically import R3F effects canvas to prevent SSR issues
const EffectsCanvas = dynamic(() => import("./effects/EffectsCanvas"), {
  ssr: false,
  loading: () => null,
});

export default function WeatherExperience() {
  const { data: weather, isLoading, error, locationError } = useWeather();
  const engineState = determineWeatherState(weather || null);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
        <Loader2 className="w-10 h-10 animate-spin text-white/50" />
      </div>
    );
  }

  if (error && !weather) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a] text-white/80">
        <AlertCircle className="w-12 h-12 mb-4 text-red-400" />
        <p>{error instanceof Error ? error.message : "Failed to load weather data."}</p>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      
      {/* 1. BACKGROUND: Spline 3D World (Only renders if real URL provided) */}
      <div className="absolute inset-0 z-0">
        <SplineWeatherScene splineUrl={engineState.splineUrl} />
      </div>

      {/* 2. MIDDLE: Three.js Particles & Effects (Also renders fallback skies if Spline URL is a placeholder) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <EffectsCanvas engineState={engineState} />
      </div>

      {/* 3. FRONT: Apple Glass UI Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <WeatherOverlay weather={weather} engineState={engineState} />
        
        {/* Location Fallback Warning Toast */}
        {locationError && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-white/70 text-xs text-center">
            ⚠️ {locationError}
          </div>
        )}
      </div>

    </div>
  );
}
