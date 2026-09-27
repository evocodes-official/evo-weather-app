import React, { useEffect, useState } from "react";
import { WeatherConditionIcon, LocationPinIcon } from "./Icons";

/**
 * WeatherHero component:
 * Full-width Hero section at the top of the page.
 * Pure, clean, minimalist aesthetic matching the reference design.
 */
export default function WeatherHero({
  weather,
  unit = "C",
  isRefreshing,
  onRefresh,
  onScrollToDetails,
}) {
  const [cityTimeStr, setCityTimeStr] = useState("");

  const timezoneOffset = weather?.timezone ?? 0;
  const current = weather?.current;
  const location = weather?.location;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const localUtc = now.getTime() + now.getTimezoneOffset() * 60000;
      const cityDate = new Date(localUtc + timezoneOffset * 1000);

      const hours = String(cityDate.getHours()).padStart(2, "0");
      const minutes = String(cityDate.getMinutes()).padStart(2, "0");

      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const dayName = days[cityDate.getDay()];

      const dayNum = cityDate.getDate();
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const monthName = months[cityDate.getMonth()];
      const yearShort = String(cityDate.getFullYear()).slice(-2);

      setCityTimeStr(`${hours}:${minutes} - ${dayName}, ${dayNum} ${monthName} '${yearShort}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timezoneOffset]);

  if (!weather || !current) return null;

  const temp = Math.round(current.temp);
  const feelsLike = Math.round(current.feelsLike);
  const conditionName = current.condition || "Cloudy";
  const isNight = current.icon?.endsWith("n");

  return (
    <section className="relative z-10 flex flex-col justify-between min-h-screen w-full p-6 sm:p-10 lg:p-14 select-none">
      {/* ================= TOP HEADER ================= */}
      <div className="flex items-center justify-between">
        {/* Brand: "Sky Cast" */}
        <div className="flex items-center gap-3">
          <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-md">
            Sky Cast
          </span>

          {/* Location badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white/90">
            <LocationPinIcon className="w-3.5 h-3.5 text-white/70" />
            <span>{location.name}</span>
            {location.country && (
              <span className="text-[10px] text-white/60 font-semibold uppercase">
                {location.country}
              </span>
            )}
          </div>
        </div>

        {/* Live status & refresh button */}
        <button
          onClick={onRefresh}
          title="Refresh weather data"
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/25 hover:bg-black/40 backdrop-blur-md text-white text-xs font-medium transition border border-white/15 cursor-pointer active:scale-95"
        >
          <span className={`inline-block w-2 h-2 rounded-full ${isRefreshing ? "bg-amber-400 animate-ping" : "bg-emerald-400 animate-pulse"}`} />
          <span className="text-white/80">{isRefreshing ? "Updating..." : "Live"}</span>
        </button>
      </div>

      {/* ================= BOTTOM WEATHER HERO OVERLAY ================= */}
      {/* 29° Nandyala / Time & Date / Condition matching the original reference screenshot */}
      <div className="mt-auto pt-16 pb-4 sm:pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <div className="flex items-end gap-5 sm:gap-7 flex-wrap">
            {/* 1. Large Bold Temperature */}
            <div className="flex items-start text-8xl sm:text-9xl lg:text-[10.5rem] font-light leading-none tracking-tighter text-white drop-shadow-2xl">
              <span>{temp}</span>
              <span className="text-5xl sm:text-6xl lg:text-7xl font-light text-white/90 -mt-1 sm:-mt-2">°</span>
            </div>

            {/* 2. City & Local Date/Time */}
            <div className="flex flex-col justify-end pb-2 sm:pb-3 md:pb-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white drop-shadow-lg">
                {location.name}
              </h1>
              <p className="mt-1 text-xs sm:text-sm font-light tracking-wide text-white/85 drop-shadow">
                {cityTimeStr || "Loading local time..."}
              </p>
            </div>

            {/* 3. Weather Icon & Condition text */}
            <div className="flex flex-col items-center justify-end pb-2 sm:pb-3 md:pb-4 pl-1 sm:pl-2">
              <WeatherConditionIcon
                condition={conditionName}
                isNight={isNight}
                className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-lg"
              />
              <span className="mt-1 text-xs sm:text-sm font-normal text-white/90 drop-shadow capitalize tracking-wide">
                {conditionName}
              </span>
            </div>
          </div>

          {/* Sub-bar: Clean minimal Feels like and High/Low */}
          <div className="mt-3 flex items-center gap-3 text-xs sm:text-sm text-white/80 drop-shadow">
            <span>Feels like <strong className="text-white font-medium">{feelsLike}°{unit}</strong></span>
            {current.tempMax !== undefined && current.tempMin !== undefined && (
              <>
                <span className="text-white/40">•</span>
                <span>H: {Math.round(current.tempMax)}° L: {Math.round(current.tempMin)}°</span>
              </>
            )}
          </div>
        </div>

        {/* Scroll indicator button */}
        {onScrollToDetails && (
          <button
            onClick={onScrollToDetails}
            className="self-start md:self-end flex items-center gap-2 px-4 py-2 rounded-2xl bg-black/25 hover:bg-black/40 backdrop-blur-md border border-white/15 text-white/90 text-xs font-medium transition cursor-pointer active:scale-95 group"
          >
            <span>Weather Details</span>
            <span className="text-sm transition-transform duration-300 group-hover:translate-y-1">↓</span>
          </button>
        )}
      </div>
    </section>
  );
}
