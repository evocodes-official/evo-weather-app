import { DropletIcon, WeatherConditionIcon } from "./Icons";

function Forecast({ forecast, selectedDate }) {
  if (!forecast || forecast.length === 0) return null;

  const selectedDayForecast = forecast.filter((item) => item.date === selectedDate);
  const displayForecast = selectedDayForecast.length > 0 ? selectedDayForecast : forecast.slice(0, 8);

  const formatTime = (time) => {
    try {
      const date = new Date(time.replace(" ", "T"));
      return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    } catch {
      return time;
    }
  };

  const formatDate = () => {
    if (!selectedDate) return "Today's Forecast";
    const date = new Date(selectedDate);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section id="detailed-forecast" className="scroll-mt-28 relative overflow-hidden rounded-[30px] border border-white/10 glass-card p-6 sm:p-8 shadow-2xl">
      <div className="relative flex items-center justify-between mb-7">
        <div>
          <p className="text-sm font-medium text-blue-200">Detailed Forecast</p>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-white">{formatDate()}</h2>
        </div>
      </div>

      <div className="rounded-[22px] border border-white/5 bg-white/5 px-3 py-7 sm:px-6">
        <div className="flex gap-6 overflow-x-auto pb-3 scrollbar-thin">
          {displayForecast.map((item, index) => {
            const rain = Math.round((item.pop || 0) * 100);
            const isNight = item.icon?.endsWith("n");

            return (
              <div key={item.time || index} className="min-w-[90px] sm:min-w-[105px] flex-shrink-0 flex flex-col items-center text-center">
                <p className="text-sm sm:text-base font-semibold text-gray-200 whitespace-nowrap">{formatTime(item.time)}</p>
                <div className="my-4">
                  <WeatherConditionIcon condition={item.condition} isNight={isNight} className="w-12 h-12 text-white" />
                </div>
                <p className="text-xl sm:text-2xl font-bold text-white">{Math.round(item.temp)}°</p>
                <div className="mt-4 flex items-center gap-1 text-blue-200">
                  <DropletIcon className="w-3.5 h-3.5" />
                  <span className="text-xs sm:text-sm font-semibold">{rain}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Forecast;