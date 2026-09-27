import React, { useState } from "react";
import {
  SearchIcon,
  LocationPinIcon,
  CloseIcon,
  DropletIcon,
  WindIcon,
  PressureIcon,
  EyeIcon,
  CloudIcon,
  SunriseIcon,
  SunsetIcon,
  WeatherConditionIcon,
} from "./Icons";
import WeatherMap from "./WeatherMap";

/**
 * WeatherDetailsSection:
 * Expanded, spacious, and attractive weather intelligence dashboard.
 * - Big, expansive layout (max-w-7xl) that fills the widescreen space naturally.
 * - Large, beautiful metric cards with generous padding and 4-column grid.
 * - Large hourly forecast cards.
 * - Expansive, clean 5-day forecast cards with high-contrast typography.
 * - Integrated Interactive Weather Map.
 */
export default function WeatherDetailsSection({
  weather,
  unit,
  onUnitChange,
  onSearch,
  onUseGeolocation,
  selectedDate,
  onSelectDate,
  onLocationSelect,
  loading,
}) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim());
    setQuery("");
  };

  const current = weather?.current;
  const forecast = weather?.forecast || [];

  // Group forecast by day
  const groupedForecast = {};
  forecast.forEach((item) => {
    if (!groupedForecast[item.date]) {
      groupedForecast[item.date] = [];
    }
    groupedForecast[item.date].push(item);
  });

  const forecastDays = Object.keys(groupedForecast).slice(0, 5);

  const activeHourlyItems = selectedDate
    ? groupedForecast[selectedDate] || []
    : forecast.slice(0, 8);

  const formatHourTime = (timeStr) => {
    try {
      const date = new Date(timeStr.replace(" ", "T"));
      return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    } catch {
      return timeStr;
    }
  };

  const formatSunTime = (timestamp) => {
    if (!timestamp) return "--:--";
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const activeDateLabel = selectedDate
    ? new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })
    : "Today's Schedule";

  return (
    <section id="weather-details-section" className="relative z-10 w-full py-16 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* ================= 1. EXPANDED SEARCH & ACTION BAR ================= */}
        <div className="glass-panel rounded-3xl p-5 sm:p-6 shadow-2xl border border-white/15 flex flex-col md:flex-row items-center gap-4 sm:gap-6">
          {/* Search Form */}
          <form onSubmit={handleSubmit} className="relative flex-1 w-full flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search another city (e.g., Hyderabad, London, Tokyo, New York)..."
              className="w-full h-14 sm:h-16 pl-13 sm:pl-14 pr-28 sm:pr-32 rounded-2xl glass-input text-white text-base sm:text-lg placeholder-white/40 focus:outline-none transition"
            />
            <SearchIcon className="absolute left-4 sm:left-5 w-5 h-5 sm:w-6 sm:h-6 text-white/50" />

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-24 sm:right-28 p-1.5 text-white/50 hover:text-white transition cursor-pointer"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            )}

            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white/20 hover:bg-white/30 active:scale-95 text-xs sm:text-sm font-semibold text-white transition cursor-pointer shadow-md"
            >
              {loading ? "..." : "Search"}
            </button>
          </form>

          {/* Quick Actions: Unit Toggle & My Location Button */}
          <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto justify-between md:justify-end">
            {/* Unit Switcher */}
            <div className="inline-flex rounded-2xl bg-black/40 p-1.5 border border-white/10 shadow-inner">
              <button
                onClick={() => onUnitChange("C")}
                className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  unit === "C"
                    ? "bg-white text-slate-900 shadow-lg"
                    : "text-white/70 hover:text-white"
                }`}
              >
                °C
              </button>
              <button
                onClick={() => onUnitChange("F")}
                className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  unit === "F"
                    ? "bg-white text-slate-900 shadow-lg"
                    : "text-white/70 hover:text-white"
                }`}
              >
                °F
              </button>
            </div>

            {/* GPS Location Button */}
            <button
              onClick={onUseGeolocation}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold border border-white/15 transition-all cursor-pointer active:scale-95 shadow-md"
            >
              <LocationPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300" />
              <span>My Location</span>
            </button>
          </div>
        </div>

        {/* ================= 2. EXPANDED, BIG WEATHER METRIC CARDS ================= */}
        {current && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pl-1">
              <div>
                <h2 className="text-sm sm:text-base uppercase tracking-widest text-white/50 font-bold">
                  Weather Highlights & Metrics
                </h2>
                <p className="text-xl sm:text-2xl font-bold text-white mt-1">
                  Conditions for {weather?.location?.name}
                </p>
              </div>
              <span className="text-xs sm:text-sm text-white/50 font-medium px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
                Live Overview
              </span>
            </div>

            {/* 4-Column Responsive Grid on Large Screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {/* 1. Cloud Cover */}
              <div className="glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between min-h-[160px] transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between text-white/70 text-sm font-medium">
                  <span>Cloud Cover</span>
                  <div className="p-2.5 rounded-2xl bg-white/10 text-white">
                    <CloudIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-4xl sm:text-5xl font-light text-white tracking-tight">
                    {current.clouds !== undefined ? `${current.clouds}%` : "--"}
                  </p>
                  <p className="mt-2 text-xs sm:text-sm text-white/50 font-medium">
                    Sky coverage
                  </p>
                </div>
              </div>

              {/* 2. Humidity */}
              <div className="glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between min-h-[160px] transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between text-white/70 text-sm font-medium">
                  <span>Humidity</span>
                  <div className="p-2.5 rounded-2xl bg-white/10 text-blue-300">
                    <DropletIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-4xl sm:text-5xl font-light text-white tracking-tight">
                    {current.humidity}%
                  </p>
                  <p className="mt-2 text-xs sm:text-sm text-white/50 font-medium">
                    Relative moisture
                  </p>
                </div>
              </div>

              {/* 3. Wind Speed */}
              <div className="glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between min-h-[160px] transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between text-white/70 text-sm font-medium">
                  <span>Wind Speed</span>
                  <div className="p-2.5 rounded-2xl bg-white/10 text-teal-300">
                    <WindIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-4xl sm:text-5xl font-light text-white tracking-tight">
                    {current.wind} <span className="text-lg sm:text-xl font-normal text-white/60">{unit === "C" ? "km/h" : "mph"}</span>
                  </p>
                  <p className="mt-2 text-xs sm:text-sm text-white/50 font-medium">
                    Surface velocity
                  </p>
                </div>
              </div>

              {/* 4. Rain Probability */}
              <div className="glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between min-h-[160px] transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between text-white/70 text-sm font-medium">
                  <span>Precipitation</span>
                  <div className="p-2.5 rounded-2xl bg-white/10 text-blue-300">
                    <span className="text-base sm:text-lg">💧</span>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-4xl sm:text-5xl font-light text-white tracking-tight">
                    {current.rainProbability !== undefined ? `${current.rainProbability}%` : "0%"}
                  </p>
                  <p className="mt-2 text-xs sm:text-sm text-white/50 font-medium">
                    Chance of rain
                  </p>
                </div>
              </div>

              {/* 5. Pressure */}
              <div className="glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between min-h-[160px] transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between text-white/70 text-sm font-medium">
                  <span>Pressure</span>
                  <div className="p-2.5 rounded-2xl bg-white/10 text-purple-300">
                    <PressureIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-4xl sm:text-5xl font-light text-white tracking-tight">
                    {current.pressure} <span className="text-lg sm:text-xl font-normal text-white/60">mb</span>
                  </p>
                  <p className="mt-2 text-xs sm:text-sm text-white/50 font-medium">
                    Barometric pressure
                  </p>
                </div>
              </div>

              {/* 6. Visibility */}
              <div className="glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between min-h-[160px] transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between text-white/70 text-sm font-medium">
                  <span>Visibility</span>
                  <div className="p-2.5 rounded-2xl bg-white/10 text-cyan-300">
                    <EyeIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-4xl sm:text-5xl font-light text-white tracking-tight">
                    {current.visibility ? `${current.visibility} km` : "10.0 km"}
                  </p>
                  <p className="mt-2 text-xs sm:text-sm text-white/50 font-medium">
                    Horizontal range
                  </p>
                </div>
              </div>

              {/* 7. Sunrise */}
              <div className="glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between min-h-[160px] transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between text-white/70 text-sm font-medium">
                  <span>Sunrise</span>
                  <div className="p-2.5 rounded-2xl bg-white/10 text-amber-300">
                    <SunriseIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    {formatSunTime(current.sunrise)}
                  </p>
                  <p className="mt-2 text-xs sm:text-sm text-white/50 font-medium">
                    Dawn time
                  </p>
                </div>
              </div>

              {/* 8. Sunset */}
              <div className="glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between min-h-[160px] transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between text-white/70 text-sm font-medium">
                  <span>Sunset</span>
                  <div className="p-2.5 rounded-2xl bg-white/10 text-indigo-300">
                    <SunsetIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    {formatSunTime(current.sunset)}
                  </p>
                  <p className="mt-2 text-xs sm:text-sm text-white/50 font-medium">
                    Dusk time
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 3. EXPANDED HOURLY FORECAST ================= */}
        {activeHourlyItems.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pl-1">
              <div>
                <h2 className="text-sm sm:text-base uppercase tracking-widest text-white/50 font-bold">
                  Hourly Forecast
                </h2>
                <p className="text-lg sm:text-xl font-bold text-white mt-0.5">
                  {activeDateLabel}
                </p>
              </div>
              <span className="text-xs sm:text-sm text-white/60 font-medium">
                Scroll horizontally
              </span>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {activeHourlyItems.map((item, idx) => {
                const isItemNight = item.icon?.endsWith("n");
                return (
                  <div
                    key={item.time || idx}
                    className="glass-card flex-shrink-0 min-w-[110px] sm:min-w-[130px] rounded-3xl p-5 sm:p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.12] cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm text-white/70 font-semibold whitespace-nowrap">
                      {formatHourTime(item.time)}
                    </span>

                    <div className="my-4 text-white">
                      <WeatherConditionIcon
                        condition={item.condition}
                        isNight={isItemNight}
                        className="w-9 h-9 sm:w-10 sm:h-10 text-white drop-shadow-md"
                      />
                    </div>

                    <span className="text-xl sm:text-2xl font-bold text-white">
                      {Math.round(item.temp)}°
                    </span>

                    {item.pop > 0 ? (
                      <span className="mt-2 text-xs text-blue-300 font-semibold">
                        💧 {Math.round(item.pop * 100)}%
                      </span>
                    ) : (
                      <span className="mt-2 text-xs text-white/30">0%</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= 4. EXPANDED 5-DAY FORECAST ================= */}
        {forecastDays.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pl-1">
              <div>
                <h2 className="text-sm sm:text-base uppercase tracking-widest text-white/50 font-bold">
                  Extended 5-Day Forecast
                </h2>
                <p className="text-lg sm:text-xl font-bold text-white mt-0.5">
                  Upcoming Outlook
                </p>
              </div>
              <span className="text-xs sm:text-sm text-white/40">
                Click any day to view hourly predictions
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3.5">
              {forecastDays.map((dateStr) => {
                const dayItems = groupedForecast[dateStr] || [];
                const firstItem = dayItems[0] || {};
                const dateObj = new Date(dateStr);
                const dayLabel = dateObj.toLocaleDateString("en-US", { weekday: "long" });
                const dateFormatted = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" });

                const temps = dayItems.map((i) => i.temp);
                const maxTemp = Math.round(Math.max(...temps));
                const minTemp = Math.round(Math.min(...temps));
                const isSelected = selectedDate === dateStr;

                return (
                  <button
                    key={dateStr}
                    onClick={() => onSelectDate(dateStr)}
                    className={`w-full glass-card rounded-3xl p-5 sm:p-6 flex items-center justify-between transition-all duration-300 cursor-pointer text-left ${
                      isSelected
                        ? "ring-2 ring-white/50 bg-white/15 shadow-xl"
                        : "hover:bg-white/[0.1] hover:border-white/20"
                    }`}
                  >
                    {/* Day & Date */}
                    <div className="w-36 sm:w-48 flex-shrink-0">
                      <p className="text-base sm:text-lg font-bold text-white">{dayLabel}</p>
                      <p className="text-xs sm:text-sm text-white/50 mt-0.5">{dateFormatted}</p>
                    </div>

                    {/* Condition Icon & Description */}
                    <div className="flex items-center gap-4 flex-1 px-4">
                      <WeatherConditionIcon
                        condition={firstItem.condition}
                        className="w-7 h-7 sm:w-8 sm:h-8 text-white/90 flex-shrink-0 drop-shadow"
                      />
                      <span className="text-sm sm:text-base text-white/85 capitalize font-medium truncate">
                        {firstItem.description || firstItem.condition}
                      </span>
                    </div>

                    {/* Clean Min / Max Temperature without gradient bars */}
                    <div className="flex items-center gap-3 text-right flex-shrink-0">
                      <span className="text-lg sm:text-2xl font-bold text-white">
                        {maxTemp}°
                      </span>
                      <span className="text-white/30 text-base font-light">/</span>
                      <span className="text-base sm:text-xl font-medium text-white/60">
                        {minTemp}°
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= 5. INTERACTIVE WEATHER MAP ================= */}
        {weather?.location?.coord?.lat != null && weather?.location?.coord?.lon != null && (
          <WeatherMap
            lat={weather.location.coord.lat}
            lon={weather.location.coord.lon}
            city={weather.location.name}
            onLocationSelect={onLocationSelect}
          />
        )}
      </div>
    </section>
  );
}
