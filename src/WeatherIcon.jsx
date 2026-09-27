import { WeatherConditionIcon } from "./Icons";

export default function WeatherIcon({ condition, isNight, size, className = "w-8 h-8" }) {
  return <WeatherConditionIcon condition={condition} isNight={isNight} className={className} />;
}