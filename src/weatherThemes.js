/**
 * Atmospheric background themes for weather conditions
 * Configured with vivid, high-resolution photography and gentle overlays
 * so the sky, clouds, and condition visuals are clearly visible.
 */

export const WEATHER_THEMES = {
  // Dramatic golden sunbeams through clouds (matches the user's reference image!)
  clouds: {
    id: "clouds",
    name: "Golden Clouds",
    image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=85&w=2400&auto=format&fit=crop",
    fallbackGradient: "linear-gradient(135deg, #b45309 0%, #78350f 40%, #1e293b 100%)",
    overlay: "linear-gradient(to bottom, rgba(15, 23, 42, 0.15) 0%, rgba(15, 23, 42, 0.1) 40%, rgba(15, 23, 42, 0.65) 100%)",
    accent: "#f59e0b",
  },
  // Bright azure clear sky
  clear_day: {
    id: "clear_day",
    name: "Clear Sky",
    image: "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?q=85&w=2400&auto=format&fit=crop",
    fallbackGradient: "linear-gradient(135deg, #0284c7 0%, #0369a1 50%, #0f172a 100%)",
    overlay: "linear-gradient(to bottom, rgba(15, 23, 42, 0.15) 0%, rgba(15, 23, 42, 0.08) 40%, rgba(15, 23, 42, 0.65) 100%)",
    accent: "#38bdf8",
  },
  // Starry indigo clear night
  clear_night: {
    id: "clear_night",
    name: "Clear Night",
    image: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=85&w=2400&auto=format&fit=crop",
    fallbackGradient: "linear-gradient(135deg, #1e1b4b 0%, #0f172a 60%, #020617 100%)",
    overlay: "linear-gradient(to bottom, rgba(2, 6, 23, 0.2) 0%, rgba(2, 6, 23, 0.15) 40%, rgba(2, 6, 23, 0.7) 100%)",
    accent: "#818cf8",
  },
  // Rain / drizzle
  rain: {
    id: "rain",
    name: "Rainy",
    image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=85&w=2400&auto=format&fit=crop",
    fallbackGradient: "linear-gradient(135deg, #334155 0%, #1e293b 50%, #0f172a 100%)",
    overlay: "linear-gradient(to bottom, rgba(15, 23, 42, 0.2) 0%, rgba(15, 23, 42, 0.15) 40%, rgba(15, 23, 42, 0.7) 100%)",
    accent: "#60a5fa",
  },
  // Thunderstorm with lightning
  thunderstorm: {
    id: "thunderstorm",
    name: "Thunderstorm",
    image: "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?q=85&w=2400&auto=format&fit=crop",
    fallbackGradient: "linear-gradient(135deg, #3b0764 0%, #1e1b4b 50%, #090514 100%)",
    overlay: "linear-gradient(to bottom, rgba(15, 10, 35, 0.25) 0%, rgba(15, 10, 35, 0.15) 40%, rgba(15, 10, 35, 0.75) 100%)",
    accent: "#c084fc",
  },
  // Snow
  snow: {
    id: "snow",
    name: "Snow",
    image: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?q=85&w=2400&auto=format&fit=crop",
    fallbackGradient: "linear-gradient(135deg, #475569 0%, #334155 50%, #0f172a 100%)",
    overlay: "linear-gradient(to bottom, rgba(15, 23, 42, 0.2) 0%, rgba(15, 23, 42, 0.1) 40%, rgba(15, 23, 42, 0.65) 100%)",
    accent: "#e2e8f0",
  },
  // Mist / Fog / Haze
  mist: {
    id: "mist",
    name: "Mist & Fog",
    image: "https://images.unsplash.com/photo-1487621167305-5d248087c724?q=85&w=2400&auto=format&fit=crop",
    fallbackGradient: "linear-gradient(135deg, #475569 0%, #1e293b 60%, #0f172a 100%)",
    overlay: "linear-gradient(to bottom, rgba(15, 23, 42, 0.2) 0%, rgba(15, 23, 42, 0.1) 40%, rgba(15, 23, 42, 0.65) 100%)",
    accent: "#94a3b8",
  },
};

/**
 * Resolves the theme based on OpenWeather condition and day/night.
 */
export function getThemeForWeather(condition = "", iconCode = "") {
  const cond = (condition || "").toLowerCase();
  const isNight = (iconCode || "").endsWith("n");

  if (cond.includes("thunder")) {
    return WEATHER_THEMES.thunderstorm;
  }
  if (cond.includes("rain") || cond.includes("drizzle")) {
    return WEATHER_THEMES.rain;
  }
  if (cond.includes("snow")) {
    return WEATHER_THEMES.snow;
  }
  if (cond.includes("mist") || cond.includes("fog") || cond.includes("haze") || cond.includes("smoke") || cond.includes("dust")) {
    return WEATHER_THEMES.mist;
  }
  if (cond.includes("clear")) {
    return isNight ? WEATHER_THEMES.clear_night : WEATHER_THEMES.clear_day;
  }
  if (cond.includes("cloud")) {
    return isNight ? WEATHER_THEMES.clear_night : WEATHER_THEMES.clouds;
  }
  return isNight ? WEATHER_THEMES.clear_night : WEATHER_THEMES.clouds;
}
