import axios from "axios";

/**
 * Normalizes OpenWeatherMap API response into an application-friendly object
 */
export function normalizeWeatherData(currentData, forecastData, unit = "C") {
  const current = {
    temp: currentData.main.temp,
    feelsLike: currentData.main.feels_like,
    tempMin: currentData.main.temp_min,
    tempMax: currentData.main.temp_max,
    humidity: currentData.main.humidity,
    pressure: currentData.main.pressure,
    wind: unit === "C"
      ? (currentData.wind.speed * 3.6).toFixed(1)
      : currentData.wind.speed.toFixed(1),
    visibility: currentData.visibility
      ? (currentData.visibility / 1000).toFixed(1)
      : "10.0",
    clouds: currentData.clouds?.all ?? 0,
    rainProbability: forecastData?.list?.[0]?.pop
      ? Math.round(forecastData.list[0].pop * 100)
      : 0,
    condition: currentData.weather[0].main,
    description: currentData.weather[0].description,
    icon: currentData.weather[0].icon,
    sunrise: currentData.sys.sunrise,
    sunset: currentData.sys.sunset,
  };

  const forecast = (forecastData?.list || []).map((item) => {
    const date = item.dt_txt.split(" ")[0];
    return {
      date: date,
      time: item.dt_txt,
      timestamp: item.dt,
      temp: item.main.temp,
      feelsLike: item.main.feels_like,
      humidity: item.main.humidity,
      pressure: item.main.pressure,
      wind: unit === "C" ? (item.wind.speed * 3.6).toFixed(1) : item.wind.speed.toFixed(1),
      condition: item.weather[0].main,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      pop: item.pop || 0,
    };
  });

  return {
    location: {
      name: currentData.name,
      country: currentData.sys.country,
      coord: currentData.coord,
    },
    current,
    forecast,
    timezone: currentData.timezone || forecastData?.city?.timezone || 19800,
  };
}

/**
 * Fetches real weather and 5-day forecast from OpenWeatherMap.
 */
export async function fetchWeather({ city = "Nandyala", lat, lon, unit = "C" }) {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY || "48822a165dc928a114be93c22444e1cb";
  const unitsParam = unit === "C" ? "metric" : "imperial";

  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=${unitsParam}&`;
  let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=${unitsParam}&`;

  if (lat !== undefined && lon !== undefined) {
    weatherUrl += `lat=${lat}&lon=${lon}`;
    forecastUrl += `lat=${lat}&lon=${lon}`;
  } else {
    weatherUrl += `q=${encodeURIComponent(city)}`;
    forecastUrl += `q=${encodeURIComponent(city)}`;
  }

  const [currentResponse, forecastResponse] = await Promise.all([
    axios.get(weatherUrl),
    axios.get(forecastUrl),
  ]);

  return normalizeWeatherData(currentResponse.data, forecastResponse.data, unit);
}

/**
 * Fallback realistic mock data defaulting to Nandyala, India
 */
export function getMockWeatherData(cityName = "Nandyala", unit = "C") {
  const isCelsius = unit === "C";
  const baseTemp = isCelsius ? 29 : 84;
  const today = new Date();

  const mockForecast = [];
  for (let i = 0; i < 40; i++) {
    const d = new Date(today.getTime() + i * 3 * 3600 * 1000);
    const dateStr = d.toISOString().split("T")[0];
    const hour = d.getHours();
    const isNight = hour < 6 || hour > 19;

    mockForecast.push({
      date: dateStr,
      time: `${dateStr} ${String(hour).padStart(2, "0")}:00:00`,
      timestamp: Math.floor(d.getTime() / 1000),
      temp: baseTemp + Math.round(Math.sin(i / 2) * 3),
      feelsLike: baseTemp + 1,
      humidity: 58,
      pressure: 1012,
      wind: isCelsius ? "12.5" : "7.8",
      condition: "Clouds",
      description: "scattered clouds",
      icon: isNight ? "03n" : "03d",
      pop: 0.1,
    });
  }

  return {
    location: {
      name: cityName || "Nandyala",
      country: "IN",
      coord: { lat: 15.48, lon: 78.48 },
    },
    current: {
      temp: baseTemp,
      feelsLike: baseTemp + 1,
      tempMin: baseTemp - 3,
      tempMax: baseTemp + 4,
      humidity: 58,
      pressure: 1012,
      wind: isCelsius ? "12.5" : "7.8",
      visibility: "10.0",
      clouds: 45,
      rainProbability: 15,
      condition: "Clouds",
      description: "Partly Cloudy",
      icon: "03d",
      sunrise: Math.floor(new Date(today).setHours(6, 12, 0) / 1000),
      sunset: Math.floor(new Date(today).setHours(18, 35, 0) / 1000),
    },
    forecast: mockForecast,
    timezone: 19800, // IST UTC+5:30
  };
}
