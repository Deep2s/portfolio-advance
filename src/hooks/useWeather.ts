/* eslint-disable */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import { mapWeatherCodeToCondition, WeatherCondition, getWeatherLabel } from "@/utils/weatherMapper";

export interface WeatherData {
  temperature: number;
  condition: WeatherCondition;
  label: string;
  cloudCover: number;
  windSpeed: number;
  humidity: number;
  isDay: boolean;
  sunrise: string;
  sunset: string;
  precipitation: number;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

export function useWeather() {
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // 1. Get User Location
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => {
        console.error("Geolocation error:", err);
        setLocationError("Location permission denied or timed out. Showing default location (London).");
        // Fallback to London
        setCoords({
          latitude: 51.5085,
          longitude: -0.1257,
        });
      },
      {
        enableHighAccuracy: false,
        timeout: 5000, // 5 seconds timeout to prevent infinite loading state
        maximumAge: 1000 * 60 * 60, // Cache location for 1 hour
      }
    );
  }, []);

  // 2. Fetch Weather Data via Open-Meteo
  const { data, isLoading, error } = useQuery<WeatherData>({
    queryKey: ["weather", coords?.latitude, coords?.longitude],
    queryFn: async () => {
      if (!coords) throw new Error("No coordinates");

      const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
        params: {
          latitude: coords.latitude,
          longitude: coords.longitude,
          current: "temperature_2m,relative_humidity_2m,is_day,precipitation,weather_code,cloud_cover,wind_speed_10m",
          daily: "sunrise,sunset",
          timezone: "auto",
        },
      });

      const current = response.data.current;
      const daily = response.data.daily;

      const isDay = current.is_day === 1;
      const condition = mapWeatherCodeToCondition(current.weather_code, isDay);

      return {
        temperature: Math.round(current.temperature_2m),
        condition,
        label: getWeatherLabel(condition),
        cloudCover: current.cloud_cover,
        windSpeed: current.wind_speed_10m,
        humidity: current.relative_humidity_2m,
        isDay,
        sunrise: daily.sunrise[0],
        sunset: daily.sunset[0],
        precipitation: current.precipitation,
      };
    },
    enabled: !!coords, // Only run query when coords are available
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  return {
    data,
    isLoading: isLoading || (!coords && !locationError),
    error: error,
    locationError: locationError,
  };
}
