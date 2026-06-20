"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import WeatherExperience from "@/components/weather/WeatherExperience";

export default function WeatherPage() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full h-screen overflow-hidden bg-black">
        <WeatherExperience />
      </div>
    </QueryClientProvider>
  );
}
