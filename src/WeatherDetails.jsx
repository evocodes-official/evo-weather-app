import { DropletIcon, WindIcon, PressureIcon } from "./Icons";

function WeatherDetails({ weather }) {
  if (!weather || !weather.current) return null;
  const { humidity, wind, pressure } = weather.current;

  const details = [
    {
      icon: <DropletIcon className="w-10 h-10 text-blue-200 mx-auto" />,
      title: "Humidity",
      value: `${humidity}%`,
    },
    {
      icon: <WindIcon className="w-10 h-10 text-blue-200 mx-auto" />,
      title: "Wind Speed",
      value: `${wind} km/h`,
    },
    {
      icon: <PressureIcon className="w-10 h-10 text-blue-200 mx-auto" />,
      title: "Pressure",
      value: `${pressure} mb`,
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {details.map((item) => (
        <div
          key={item.title}
          className="rounded-3xl glass-card border border-white/10 p-7 text-center shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          {item.icon}
          <p className="mt-2 text-sm text-slate-400">{item.title}</p>
          <p className="mt-1 text-2xl font-bold text-white">{item.value}</p>
        </div>
      ))}
    </section>
  );
}

export default WeatherDetails;