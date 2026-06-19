"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Placeholder — replace with real weather API later
const WEATHER_TEMP = "37°C";

// ── macOS Sonoma menu bar icons (SF Symbols-accurate) ────
function IconWifi({ connected }: { connected: boolean }) {
  if (!connected) {
    return (
      <svg width="15" height="11" viewBox="0 0 15 11" fill="none" aria-label="WiFi Off">
        <path d="M0.75 3.18C3.6 0.85 6.75 0 7.5 0c0.75 0 3.9 0.85 6.75 3.18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.25" fill="none" />
        <path d="M2.75 5.55c1.5-1.3 3.3-2 4.75-2s3.25 0.7 4.75 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.25" fill="none" />
        <path d="M4.8 7.85c0.85-0.7 1.75-1.05 2.7-1.05s1.85 0.35 2.7 1.05" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.25" fill="none" />
        <circle cx="7.5" cy="10" r="1.15" fill="currentColor" opacity="0.25" />
      </svg>
    );
  }
  return (
    <svg width="15" height="11" viewBox="0 0 15 11" fill="none" aria-label="WiFi">
      {/* Outermost arc */}
      <path d="M0.75 3.18C3.6 0.85 6.75 0 7.5 0c0.75 0 3.9 0.85 6.75 3.18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      {/* Middle arc */}
      <path d="M2.75 5.55c1.5-1.3 3.3-2 4.75-2s3.25 0.7 4.75 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      {/* Inner arc */}
      <path d="M4.8 7.85c0.85-0.7 1.75-1.05 2.7-1.05s1.85 0.35 2.7 1.05" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      {/* Dot */}
      <circle cx="7.5" cy="10" r="1.15" fill="currentColor" />
    </svg>
  );
}

function IconBattery({
  level,
  charging,
}: {
  level: number;
  charging: boolean;
}) {
  const pct = Math.max(0, Math.min(level, 100));
  const bodyColor = "currentColor";
  const barColor = "currentColor";
  const barWidth = Math.max(1, Math.round((pct / 100) * 18));

  return (
    <div className="flex items-center gap-1.5" aria-label={`Battery ${level}%`}>
      <svg width="27" height="12" viewBox="0 0 27 12" fill="none">
        {/* Body outline */}
        <rect x="0.5" y="0.5" width="22" height="11" rx="2.5" stroke={bodyColor} strokeWidth="1" opacity="0.4" />
        {/* Fill bar */}
        <rect x="2" y="2" width={barWidth} height="8" rx="1.5" fill={barColor} opacity={0.85} />
        {/* Positive terminal / cap */}
        <path d="M23.5 4.5C24.3 4.5 25 5.12 25 5.9V6.1C25 6.88 24.3 7.5 23.5 7.5" stroke={bodyColor} strokeWidth="1.2" fill="none" opacity="0.4" />
        {/* Charging bolt */}
        {charging && (
          <path d="M12.5 2L9.5 6.5H12L10 10L14 5.5H11.5L12.5 2Z" fill="white" />
        )}
      </svg>
      <span className="tabular-nums leading-none">
        {level}%
      </span>
    </div>
  );
}

function IconSpotlight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-label="Spotlight">
      <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.7" />
      <line x1="9.4" y1="9.4" x2="13" y2="13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconControlCenter() {
  // macOS Sonoma Control Center — two horizontal toggles
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-label="Control Center">
      {/* Top toggle track */}
      <rect x="0.5" y="2" width="13" height="3.5" rx="1.75" fill="currentColor" opacity="0.18" />
      {/* Top toggle knob — right side */}
      <circle cx="10.25" cy="3.75" r="1.75" fill="currentColor" />
      {/* Bottom toggle track */}
      <rect x="0.5" y="8.5" width="13" height="3.5" rx="1.75" fill="currentColor" opacity="0.18" />
      {/* Bottom toggle knob — left side */}
      <circle cx="3.75" cy="10.25" r="1.75" fill="currentColor" />
    </svg>
  );
}

function IconNowPlaying() {
  // macOS Now Playing — sound wave bars (like the real Sonoma icon)
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" aria-label="Now Playing">
      <rect x="1" y="4" width="1.8" height="4" rx="0.9" fill="currentColor" />
      <rect x="4.2" y="2" width="1.8" height="8" rx="0.9" fill="currentColor" />
      <rect x="7.4" y="0.5" width="1.8" height="11" rx="0.9" fill="currentColor" />
      <rect x="10.6" y="3" width="1.8" height="6" rx="0.9" fill="currentColor" />
    </svg>
  );
}

// ── Apple logo (accurate SVG path) ───────────────────────
function AppleLogo() {
  return (
    <svg
      width="13"
      height="16"
      viewBox="0 0 195 233"
      fill="currentColor"
      aria-label="Apple Menu"
    >
      <path d="M168.3 40.2c-18.4 1.2-40.2 12.8-53 28.6-11.5 14.2-21 35.4-17.3 56 19.8 1.5 40.2-10.4 52.7-26.4 11.7-14.9 19.8-36.1 17.6-58.2zM195 160.6c-4.7 14.5-11.5 27.4-20.4 38.8-13 16.4-26.5 24.6-40.3 24.6-6.7 0-15.3-2-25.7-5.9-10.1-3.8-19.1-5.7-27-5.7-8.4 0-17.7 2-28 5.9-10.3 3.9-18.8 5.8-25.6 5.8-15.3 0-30.1-9-44.4-27.1C-2 175.2-6 145.2 8.8 113.6c9.5-20.3 26.5-34.2 51-41.7 8.3-2.5 17.4-3.7 27.2-3.7 10.4 0 20.5 2.1 30.3 6.4 7.2 3.1 13 4.6 17.6 4.6 4.1 0 10.3-1.7 18.6-5.1 11.6-4.8 23.1-6.4 34.5-4.9 19.3 2.5 33.8 11 43.3 25.6-17.2 10.4-25.7 25.6-25.3 45.6.3 15.7 5.8 28.7 16.7 39.2 4.9 4.8 10.4 8.4 16.4 10.9-1.3 3.5-2.7 6.9-4.1 10.1z" />
    </svg>
  );
}

// ────────────────────────────────────────────────────────
export default function MacMenuBar() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [battery, setBattery] = useState<number | null>(null);
  const [charging, setCharging] = useState(false);
  
  // Theme & Interactive state
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [controlCenterOpen, setControlCenterOpen] = useState(false);
  const [wifiConnected, setWifiConnected] = useState(true);
  const [bluetoothOn, setBluetoothOn] = useState(true);
  const [airDropOn, setAirDropOn] = useState(true);
  const [brightness, setBrightness] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);

  const controlCenterRef = useRef<HTMLDivElement>(null);
  const controlCenterButtonRef = useRef<HTMLButtonElement>(null);

  // Time & Date effect
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "short",
        })
      );
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Battery API effect
  useEffect(() => {
    if ("getBattery" in navigator) {
      (navigator as Navigator & { getBattery: () => Promise<BatteryManager> })
        .getBattery()
        .then((bat: BatteryManager) => {
          setBattery(Math.round(bat.level * 100));
          setCharging(bat.charging);
          bat.addEventListener("levelchange", () =>
            setBattery(Math.round(bat.level * 100))
          );
          bat.addEventListener("chargingchange", () =>
            setCharging(bat.charging)
          );
        });
    }
  }, []);

  // Load and apply theme on start
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    const initialTheme = savedTheme || "dark";
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const savedBrightness = localStorage.getItem("brightness");
    if (savedBrightness) {
      const bValue = parseInt(savedBrightness, 10);
      setBrightness(bValue);
      document.documentElement.style.setProperty("--display-brightness", String(bValue / 100));
    }
  }, []);

  // Update brightness CSS variable
  useEffect(() => {
    document.documentElement.style.setProperty("--display-brightness", String(brightness / 100));
    localStorage.setItem("brightness", String(brightness));
  }, [brightness]);

  // Click outside to close dropdown handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        controlCenterRef.current &&
        !controlCenterRef.current.contains(event.target as Node) &&
        controlCenterButtonRef.current &&
        !controlCenterButtonRef.current.contains(event.target as Node)
      ) {
        setControlCenterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const batteryLevel = battery ?? 72;

  return (
    <>
      <div
        id="mac-menu-bar"
        className="fixed top-0 left-0 right-0 z-[60] h-11 flex items-center justify-between px-4 select-none transition-all duration-300"
        style={{
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderBottom: "0.5px solid rgba(0, 0, 0, 0.12)",
          color: "#000000",
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          fontSize: "13px",
          fontWeight: "normal",
          letterSpacing: "-0.01em",
        }}
      >
        {/* ── Left ── */}
        <div className="flex items-center gap-1 -ml-2">
          <a href="#experience" className="px-3 py-1 rounded-md hover:bg-black/5 transition-colors cursor-pointer">
            Experience
          </a>
          <a href="#projects" className="px-3 py-1 rounded-md hover:bg-black/5 transition-colors cursor-pointer">
            Projects
          </a>
          <a href="#skills" className="px-3 py-1 rounded-md hover:bg-black/5 transition-colors cursor-pointer">
            Skills
          </a>
          <a href="#contact" className="px-3 py-1 rounded-md hover:bg-black/5 transition-colors cursor-pointer">
            Talk to deepak
          </a>
        </div>

        {/* ── Right ── */}
        <div className="flex items-center gap-3">
          {/* Now Playing */}
          <button
            className="flex items-center opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Now Playing"
            onClick={() => setControlCenterOpen(true)}
          >
            <IconNowPlaying />
          </button>

          {/* Weather */}
          <div className="flex items-center gap-1.5 opacity-90">
            {/* Sun icon */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-label="Weather">
              <circle cx="12" cy="12" r="5" fill="currentColor" stroke="none" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
            <span>
              {WEATHER_TEMP}
            </span>
          </div>

          {/* Battery */}
          <IconBattery level={batteryLevel} charging={charging} />

          {/* Spotlight */}
          <button
            className="flex items-center opacity-65 hover:opacity-100 transition-opacity"
            aria-label="Spotlight Search"
          >
            <IconSpotlight />
          </button>

          {/* Control Center */}
          <button
            ref={controlCenterButtonRef}
            className="flex items-center opacity-65 hover:opacity-100 transition-opacity"
            aria-label="Control Center"
            onClick={() => setControlCenterOpen(!controlCenterOpen)}
          >
            <IconControlCenter />
          </button>

          {/* Date + Time */}
          <div className="flex items-center gap-1.5 tabular-nums">
            <span>{date}</span>
            <span style={{ opacity: 0.35 }}>·</span>
            <span>{time}</span>
          </div>
        </div>
      </div>

      {/* ── macOS Control Center Dropdown ── */}
      <AnimatePresence>
        {controlCenterOpen && (
          <motion.div
            ref={controlCenterRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-8 right-2 w-80 rounded-2xl glass-strong p-4 shadow-2xl z-50 flex flex-col gap-3 select-none"
            style={{
              border: "1px solid var(--menu-bar-border)",
            }}
          >
            {/* Upper Grid Layout */}
            <div className="grid grid-cols-2 gap-3">
              {/* Left Column: Connectivity Card */}
              <div className="glass rounded-2xl p-3 flex flex-col gap-2.5 shadow-sm">
                {/* AirDrop Row */}

                {/* AirDrop Row */}
                <button
                  className="flex items-center gap-2.5 text-left w-full group cursor-pointer"
                  onClick={() => setAirDropOn(!airDropOn)}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                      airDropOn
                        ? "bg-[#0a84ff] text-white"
                        : "bg-black/10 dark:bg-white/10 text-foreground/50"
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 15a2 2 0 100-4 2 2 0 000 4z" />
                      <path d="M8 10a6 6 0 018 0" />
                      <path d="M4 6a12 12 0 0116 0" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold leading-tight text-foreground">AirDrop</p>
                    <p className="text-[9px] text-muted-foreground leading-none">
                      {airDropOn ? "Everyone" : "Off"}
                    </p>
                  </div>
                </button>
              </div>

              {/* Right Column: Mini Widgets (Theme Toggle & Keyboard Brightness) */}
              <div className="flex flex-col gap-3">
                {/* Theme Toggle Card */}
                <button
                  onClick={toggleTheme}
                  className="glass rounded-2xl p-3 flex flex-col justify-between items-start h-20 text-left cursor-pointer transition-all duration-300 hover:glow-purple group shadow-sm w-full"
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                      theme === "dark" ? "bg-purple-600/20 text-purple-400" : "bg-yellow-500/20 text-yellow-600"
                    }`}
                  >
                    {theme === "dark" ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                      </svg>
                    ) : (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <circle cx="12" cy="12" r="4.5" fill="currentColor" stroke="none" />
                        <path d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M3 12h2M19 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="text-[11px] font-bold leading-tight text-foreground">Dark Mode</p>
                    <p className="text-[9px] text-muted-foreground leading-none">{theme === "dark" ? "On" : "Off"}</p>
                  </div>
                </button>

                {/* Keyboard Brightness Card */}
                <div className="glass rounded-2xl p-2.5 flex items-center justify-between shadow-sm flex-1">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="12" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-foreground/75">
                      <rect x="2" y="2" width="20" height="12" rx="2" />
                      <path d="M6 6h.01M10 6h.01M14 6h.01M18 6h.01M6 10h12" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span className="text-[10px] font-semibold text-foreground/80">Keyboard</span>
                  </div>
                  <span className="text-[9px] font-bold text-muted-foreground bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded">Auto</span>
                </div>
              </div>
            </div>

            {/* Slider Module: Display Brightness */}
            <div className="glass rounded-2xl p-3 flex flex-col gap-1.5 shadow-sm">
              <div className="flex justify-between items-center px-0.5">
                <span className="text-[10px] font-bold text-foreground">Display Brightness</span>
                <span className="text-[9px] font-bold text-muted-foreground tabular-nums">{brightness}%</span>
              </div>
              <div className="flex items-center gap-2.5">
                {/* Sun icon */}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-foreground/75">
                  <circle cx="12" cy="12" r="4.5" fill="currentColor" stroke="none" />
                  <path d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M3 12h2M19 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
                {/* Custom Slider */}
                <input
                  type="range"
                  min="40"
                  max="100"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full h-4 rounded-full appearance-none cursor-pointer bg-black/8 dark:bg-white/10 focus:outline-none overflow-hidden [&::-webkit-slider-runnable-track]:h-2.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:shadow-[-300px_0_0_300px_oklch(0.52_0.22_290)]"
                  aria-label="Display Brightness Slider"
                />
              </div>
            </div>

            {/* Now Playing Widget */}
            <div className="glass rounded-2xl p-3 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                {/* Album Art Placeholder */}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center shadow-md text-sm text-white font-bold">
                  ♫
                </div>
                <div className="text-left leading-tight">
                  <p className="text-[11px] font-bold text-foreground max-w-[150px] truncate">Coding Session</p>
                  <p className="text-[9px] text-muted-foreground max-w-[150px] truncate">Lo-Fi Developer Beats</p>
                </div>
              </div>
              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  className="w-7 h-7 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                  aria-label="Toggle Play"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="5" y="4" width="4" height="16" rx="1" />
                      <rect x="15" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
                      <path d="M6 4.5v15a1 1 0 001.5.8l12-7.5a1 1 0 000-1.6l-12-7.5A1 1 0 006 4.5z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface BatteryManager extends EventTarget {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
}
