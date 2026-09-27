import { SunIcon, MoonIcon } from "./Icons";

function WeatherCard({ weather }) {
  if (!weather || !weather.current) return null;
  const { location, current } = weather;
  const temperature = Math.round(current.temp);
  const feelsLike = Math.round(current.feelsLike);
  const isNight = current.icon?.endsWith("n");

  return (
    <section className="relative overflow-hidden rounded-[30px] border border-white/10 glass-card p-7 sm:p-10 shadow-2xl">
      <div className="relative flex items-center justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">{location.name}</h1>
          <p className="mt-1 text-sm text-slate-400">{location.country}</p>
        </div>
        <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-white/10 flex items-center justify-center">
          {isNight ? <MoonIcon className="w-10 h-10 text-gray-200" /> : <SunIcon className="w-10 h-10 text-yellow-300" />}
        </div>
      </div>
      <div className="relative mt-10 grid grid-cols-1 lg:grid-cols-[35%_65%] gap-8 items-center">
        <div>
          <div className="text-7xl sm:text-8xl font-bold tracking-tight">{temperature}°</div>
          <p className="mt-3 text-slate-300">Feels like {feelsLike}°</p>
        </div>
        <div>
          <p className="text-xl sm:text-2xl font-bold leading-relaxed text-white capitalize">{current.description}</p>
        </div>
      </div>
    </section>
  );
}

export default WeatherCard;