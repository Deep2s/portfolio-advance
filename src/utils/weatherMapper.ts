export type WeatherCondition =
  | "CLEAR_DAY"
  | "CLEAR_NIGHT"
  | "PARTLY_CLOUDY_DAY"
  | "PARTLY_CLOUDY_NIGHT"
  | "CLOUDY"
  | "FOG"
  | "RAIN_DAY"
  | "RAIN_NIGHT"
  | "SNOW_DAY"
  | "SNOW_NIGHT"
  | "STORM";

// WMO Weather interpretation codes (WW)
// https://open-meteo.com/en/docs
export function mapWeatherCodeToCondition(
  code: number,
  isDay: boolean
): WeatherCondition {
  // 0: Clear sky
  if (code === 0) {
    return isDay ? "CLEAR_DAY" : "CLEAR_NIGHT";
  }

  // 1, 2, 3: Mainly clear, partly cloudy, and overcast
  if (code === 1 || code === 2) {
    return isDay ? "PARTLY_CLOUDY_DAY" : "PARTLY_CLOUDY_NIGHT";
  }
  if (code === 3) {
    return "CLOUDY";
  }

  // 45, 48: Fog and depositing rime fog
  if (code === 45 || code === 48) {
    return "FOG";
  }

  // 51, 53, 55: Drizzle: Light, moderate, and dense intensity
  // 56, 57: Freezing Drizzle: Light and dense intensity
  // 61, 63, 65: Rain: Slight, moderate and heavy intensity
  // 66, 67: Freezing Rain: Light and heavy intensity
  // 80, 81, 82: Rain showers: Slight, moderate, and violent
  if (
    (code >= 51 && code <= 67) ||
    (code >= 80 && code <= 82)
  ) {
    return isDay ? "RAIN_DAY" : "RAIN_NIGHT";
  }

  // 71, 73, 75: Snow fall: Slight, moderate, and heavy intensity
  // 77: Snow grains
  // 85, 86: Snow showers slight and heavy
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
    return isDay ? "SNOW_DAY" : "SNOW_NIGHT";
  }

  // 95: Thunderstorm: Slight or moderate
  // 96, 99: Thunderstorm with slight and heavy hail
  if (code >= 95 && code <= 99) {
    return "STORM";
  }

  return isDay ? "CLEAR_DAY" : "CLEAR_NIGHT"; // Fallback
}

export function getWeatherLabel(condition: WeatherCondition): string {
  switch (condition) {
    case "CLEAR_DAY":
    case "CLEAR_NIGHT":
      return "Clear";
    case "PARTLY_CLOUDY_DAY":
    case "PARTLY_CLOUDY_NIGHT":
      return "Partly Cloudy";
    case "CLOUDY":
      return "Cloudy";
    case "FOG":
      return "Foggy";
    case "RAIN_DAY":
    case "RAIN_NIGHT":
      return "Rain";
    case "SNOW_DAY":
    case "SNOW_NIGHT":
      return "Snow";
    case "STORM":
      return "Thunderstorm";
    default:
      return "Clear";
  }
}
