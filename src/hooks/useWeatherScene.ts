import { useMemo } from "react";
import { WeatherData } from "./useWeather";

export interface WeatherSceneState {
  environment: "Morning" | "Afternoon" | "Evening" | "Night";
  effects: {
    showClouds: boolean;
    showRain: boolean;
    showSnow: boolean;
    showFog: boolean;
    showLightning: boolean;
    showStars: boolean;
    cloudDensity: number; // 0 to 1
    windSpeed: number;
  };
}

export function useWeatherScene(weather: WeatherData | undefined): WeatherSceneState {
  return useMemo(() => {
    if (!weather) {
      // Default state while loading
      return {
        environment: "Afternoon",
        effects: {
          showClouds: false,
          showRain: false,
          showSnow: false,
          showFog: false,
          showLightning: false,
          showStars: false,
          cloudDensity: 0,
          windSpeed: 0,
        },
      };
    }

    // 1. Determine Time of Day Environment
    let environment: WeatherSceneState["environment"] = "Afternoon";
    
    // We can use the current hour to approximate Morning/Afternoon/Evening/Night
    // For a more accurate approach, we'd compare current time to sunrise/sunset strings.
    const hour = new Date().getHours();
    
    if (!weather.isDay) {
      environment = "Night";
    } else {
      if (hour >= 5 && hour < 11) {
        environment = "Morning";
      } else if (hour >= 11 && hour < 16) {
        environment = "Afternoon";
      } else if (hour >= 16 && hour < 20) {
        environment = "Evening";
      } else {
        environment = "Night"; // Fallback if isDay is mismatched
      }
    }

    // 2. Map Weather Condition to Effects
    const c = weather.condition;
    
    const showClouds = ["PARTLY_CLOUDY_DAY", "PARTLY_CLOUDY_NIGHT", "CLOUDY", "RAIN_DAY", "RAIN_NIGHT", "SNOW_DAY", "SNOW_NIGHT", "STORM"].includes(c);
    const showRain = ["RAIN_DAY", "RAIN_NIGHT", "STORM"].includes(c);
    const showSnow = ["SNOW_DAY", "SNOW_NIGHT"].includes(c);
    const showFog = c === "FOG" || showRain || showSnow;
    const showLightning = c === "STORM";
    const showStars = environment === "Night" && ["CLEAR_NIGHT", "PARTLY_CLOUDY_NIGHT"].includes(c);

    // Normalize cloud cover (0-100 to 0-1)
    const cloudDensity = weather.cloudCover / 100;

    return {
      environment,
      effects: {
        showClouds,
        showRain,
        showSnow,
        showFog,
        showLightning,
        showStars,
        cloudDensity: Math.max(cloudDensity, showClouds ? 0.3 : 0), // Ensure some clouds if condition implies it
        windSpeed: weather.windSpeed,
      },
    };
  }, [weather]);
}
