"use client";

import { motion } from "framer-motion";
import { WeatherData } from "@/hooks/useWeather";
import { WeatherEngineState } from "./engine/weatherEngine";

interface WeatherOverlayProps {
  weather: WeatherData;
  engineState: WeatherEngineState;
}

export default function WeatherOverlay({ weather, engineState }: WeatherOverlayProps) {
  const isDark = engineState.theme === "dark";

  // Dynamic Theme Classes
  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textSecondary = isDark ? "text-white/80" : "text-slate-800/80";
  const textTertiary = isDark ? "text-white/70" : "text-slate-700/80";
  
  const textShadow = isDark ? "drop-shadow-[0_4px_24px_rgba(0,0,0,0.4)]" : "drop-shadow-sm";
  
  const cardBg = isDark ? "bg-white/[0.10]" : "bg-black/[0.05]";
  const cardBorder = isDark ? "border-white/[0.15]" : "border-black/[0.10]";
  
  return (
    <div className="absolute inset-0 z-20 w-full h-full flex flex-col justify-between p-4 sm:p-8 md:p-12 pointer-events-none">
      
      {/* Center Top: Typography (Apple Style) */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col items-center mt-10 sm:mt-16 text-center pointer-events-auto"
      >
        <motion.h1 
          className={`text-2xl sm:text-3xl font-normal ${textPrimary} drop-shadow-md tracking-wide transition-colors duration-1000`}
        >
          {weather.label}
        </motion.h1>
        
        <motion.div 
          className={`text-[100px] sm:text-[140px] md:text-[180px] font-[200] leading-none tracking-tight ${textPrimary} ${textShadow} my-1 sm:my-2 transition-colors duration-1000`}
        >
          {weather.temperature}°
        </motion.div>
        
        <motion.h2 
          className={`text-xl sm:text-2xl font-medium ${textSecondary} transition-colors duration-1000`}
        >
          {weather.condition.replace(/_/g, " ")}
        </motion.h2>

        {/* AI Personality Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className={`mt-4 sm:mt-6 text-xs sm:text-sm font-medium tracking-wide ${isDark ? 'text-white/80 bg-white/10' : 'text-slate-800 bg-black/5'} px-4 py-2 rounded-full backdrop-blur-md border ${isDark ? 'border-white/10' : 'border-black/10'} transition-colors duration-1000`}
        >
          ✨ {engineState.aiMessage}
        </motion.p>
      </motion.div>

      {/* Bottom Section: Vision Pro Glass Cards */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
        className="w-full max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pointer-events-auto mb-20 sm:mb-10"
      >
        {/* Card: Feels Like */}
        <Card title="Feels Like" value={`${weather.temperature}°`} bg={cardBg} border={cardBorder} textPri={textPrimary} textSec={textTertiary} />
        {/* Card: Humidity */}
        <Card title="Humidity" value={`${weather.humidity}%`} bg={cardBg} border={cardBorder} textPri={textPrimary} textSec={textTertiary} />
        {/* Card: Wind */}
        <Card title="Wind" value={`${weather.windSpeed} km/h`} bg={cardBg} border={cardBorder} textPri={textPrimary} textSec={textTertiary} />
        {/* Card: Precipitation */}
        <Card title="Rain Chance" value={`${weather.precipitation} mm`} bg={cardBg} border={cardBorder} textPri={textPrimary} textSec={textTertiary} />
      </motion.div>
    </div>
  );
}

function Card({ title, value, bg, border, textPri, textSec }: { title: string; value: string; bg: string; border: string; textPri: string; textSec: string; }) {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      className={`p-4 sm:p-5 rounded-[24px] sm:rounded-[30px] flex flex-col justify-between h-28 sm:h-36 border ${border} ${bg} backdrop-blur-[25px] shadow-2xl transition-colors duration-1000`}
    >
      <div className={`flex items-center gap-2 ${textSec}`}>
        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">{title}</span>
      </div>
      <span className={`text-2xl sm:text-3xl font-medium ${textPri} tracking-tight`}>{value}</span>
    </motion.div>
  );
}
