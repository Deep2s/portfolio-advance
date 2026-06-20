import { WeatherData } from "@/hooks/useWeather";

export type SplineSceneType = 
  | "MORNING"
  | "DAY_CLEAR"
  | "CLOUDY"
  | "SUNSET"
  | "NIGHT"
  | "RAIN"
  | "STORM";

export interface WeatherEngineState {
  sceneType: SplineSceneType;
  splineUrl: string;
  theme: "light" | "dark";
  aiMessage: string;
  effects: {
    showRain: boolean;
    showSnow: boolean;
    showFog: boolean;
    showLightning: boolean;
    showStars: boolean;
    rainIntensity: number;
    snowIntensity: number;
  };
}

// TODO: Replace these placeholder URLs with actual exported Spline .splinecode URLs
const SPLINE_URLS: Record<SplineSceneType, string> = {
  MORNING: "https://prod.spline.design/placeholder-morning/scene.splinecode",
  DAY_CLEAR: "https://prod.spline.design/placeholder-dayclear/scene.splinecode",
  CLOUDY: "https://prod.spline.design/placeholder-cloudy/scene.splinecode",
  SUNSET: "https://prod.spline.design/placeholder-sunset/scene.splinecode",
  NIGHT: "https://prod.spline.design/placeholder-night/scene.splinecode",
  RAIN: "https://prod.spline.design/placeholder-rain/scene.splinecode",
  STORM: "https://prod.spline.design/placeholder-storm/scene.splinecode",
};

export function determineWeatherState(weather: WeatherData | null): WeatherEngineState {
  // Default state before data loads
  const defaultState: WeatherEngineState = {
    sceneType: "DAY_CLEAR",
    splineUrl: SPLINE_URLS["DAY_CLEAR"],
    theme: "light",
    aiMessage: "Preparing the atmosphere...",
    effects: {
      showRain: false,
      showSnow: false,
      showFog: false,
      showLightning: false,
      showStars: false,
      rainIntensity: 0,
      snowIntensity: 0,
    }
  };

  if (!weather) return defaultState;

  const c = weather.condition;
  const isDay = weather.isDay;
  const hour = new Date().getHours();

  // 1. Determine base effects
  const showRain = c.includes("RAIN") || c === "STORM";
  const showSnow = c.includes("SNOW");
  const showLightning = c === "STORM";
  const showFog = c === "FOG" || showRain || showSnow;
  const showStars = !isDay && !showRain && !showSnow && !c.includes("CLOUDY");

  // 2. Determine Scene Type & Theme
  let sceneType: SplineSceneType = "DAY_CLEAR";
  let theme: "light" | "dark" = "light";

  if (c === "STORM") {
    sceneType = "STORM";
    theme = "dark";
  } else if (showRain) {
    sceneType = "RAIN";
    theme = "dark";
  } else if (!isDay) {
    sceneType = "NIGHT";
    theme = "dark";
  } else if (c.includes("CLOUDY")) {
    sceneType = "CLOUDY";
    theme = "light"; // Or grey
  } else {
    // Clear/Partly Cloudy Day
    if (hour >= 5 && hour < 9) {
      sceneType = "MORNING";
      theme = "light";
    } else if (hour >= 17 && hour < 20) {
      sceneType = "SUNSET";
      theme = "dark";
    } else {
      sceneType = "DAY_CLEAR";
      theme = "light";
    }
  }

  // 3. Generate AI Personality Message
  let aiMessage = "Perfect day to build something amazing ✨";
  if (sceneType === "MORNING") aiMessage = "Fresh morning energy. Perfect time to create 🚀";
  if (sceneType === "RAIN") aiMessage = "Calm rain outside. Deep focus mode activated ☕";
  if (sceneType === "STORM") aiMessage = "Intense storm. Safe inside writing clean code 🌩️";
  if (sceneType === "NIGHT") aiMessage = "Quiet night. Build something amazing 🌙";
  if (sceneType === "SUNSET") aiMessage = "Golden hour inspiration. Wrapping up the day's code 🌅";
  if (sceneType === "CLOUDY") aiMessage = "Soft grey skies. Great atmosphere for deep work ☁️";
  if (showSnow) aiMessage = "Snow falling softly. Stay warm and keep coding ❄️";

  return {
    sceneType,
    splineUrl: SPLINE_URLS[sceneType],
    theme,
    aiMessage,
    effects: {
      showRain,
      showSnow,
      showFog,
      showLightning,
      showStars,
      rainIntensity: showRain ? 0.8 : 0,
      snowIntensity: showSnow ? 0.8 : 0,
    }
  };
}
