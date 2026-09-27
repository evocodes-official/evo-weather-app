import { useEffect, useState, useCallback } from "react";
import WeatherHero from "./WeatherHero";
import WeatherDetailsSection from "./WeatherDetailsSection";
import { fetchWeather, getMockWeatherData } from "./weatherService";
import { getThemeForWeather } from "./weatherThemes";

export default function App() {
  const [city, setCity] = useState("Nandyala");
  const [coords, setCoords] = useState(null);
  const [unit, setUnit] = useState("C");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // Load weather data
  const loadWeather = useCallback(async (isSilent = false) => {
    try {
      if (!isSilent) setLoading(true);
      setIsRefreshing(true);

      let data;
      if (coords) {
        data = await fetchWeather({ lat: coords.lat, lon: coords.lon, unit });
      } else {
        data = await fetchWeather({ city, unit });
      }

      setWeather(data);

      if (data.forecast && data.forecast.length > 0) {
        setSelectedDate(data.forecast[0].date);
      }
    } catch (err) {
      console.warn("Weather API notice:", err);

      const fallback = getMockWeatherData(city, unit);
      setWeather(fallback);

      if (fallback.forecast && fallback.forecast.length > 0) {
        setSelectedDate(fallback.forecast[0].date);
      }
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [city, coords, unit]);

  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  // Search handler
  const handleSearch = (newCity) => {
    setCoords(null);
    setCity(newCity);
  };

  // Geolocation handler
  const handleUseGeolocation = () => {
    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => {
        console.warn("Geolocation error:", err);
        setLoading(false);
      },
      { timeout: 10000 }
    );
  };

  // Smooth scroll down to details section below hero
  const handleScrollToDetails = () => {
    const el = document.getElementById("weather-details-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Condition is 100% automatic based on the current weather data
  const currentCondition = weather?.current?.condition || "Clouds";

  // Dynamic Theme mapping based automatically on the current condition
  const activeTheme = getThemeForWeather(
    currentCondition,
    weather?.current?.icon
  );

  return (
    <div className="relative min-h-screen w-full bg-[#080c16] text-white selection:bg-white/20 no-scrollbar">
      {/* ================= FIXED DYNAMIC BACKGROUND LAYER ================= */}
      {/* Follows whole page as user scrolls down to details */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* 1. Base fallback gradient */}
        <div
          className="absolute inset-0 transition-colors duration-1000"
          style={{ background: activeTheme.fallbackGradient }}
        />

        {/* 2. High-resolution atmospheric wallpaper (changes automatically with condition) */}
        <div
          key={activeTheme.id}
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out transform scale-100"
          style={{
            backgroundImage: `url('${activeTheme.image}')`,
          }}
        />

        {/* 3. Subtle overlay so background remains clearly visible while text is crisp */}
        <div
          className="absolute inset-0 transition-all duration-1000"
          style={{ background: activeTheme.overlay }}
        />

        {/* 4. Ambient soft color glow matching the condition */}
        <div
          className="absolute bottom-0 left-0 w-full h-96 opacity-35 blur-3xl"
          style={{
            background: `radial-gradient(ellipse at bottom left, ${activeTheme.accent}40, transparent 70%)`,
          }}
        />
      </div>

      {/* ================= PAGE FLOW ================= */}
      <div className="relative z-10 w-full flex flex-col">
        {/* 1. TOP: FULLSCREEN HERO SECTION */}
        <WeatherHero
          weather={weather}
          unit={unit}
          isRefreshing={isRefreshing}
          onRefresh={() => loadWeather(true)}
          onScrollToDetails={handleScrollToDetails}
        />

        {/* 2. BELOW HERO: WEATHER DETAILS & FORECAST SECTION */}
        <WeatherDetailsSection
          weather={weather}
          unit={unit}
          onUnitChange={setUnit}
          onSearch={handleSearch}
          onUseGeolocation={handleUseGeolocation}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          onLocationSelect={(selectedCoords) => {
            setCity("");
            setCoords(selectedCoords);
          }}
          loading={loading}
        />
      </div>
    </div>
  );
}