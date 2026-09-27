function ForecastCard({
  day,
  isSelected,
  onClick,
}) {
  if (
    !day ||
    day.length === 0
  ) {
    return null;
  }

  const first = day[0];

  /*
    Date
  */

  const date =
    new Date(first.date);

  const dayName =
    date.toLocaleDateString(
      "en-US",
      {
        weekday: "short",
      }
    );

  const dateText =
    date.toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
      }
    );

  /*
    Average temperature
  */

  const averageTemp =
    day.reduce(
      (total, item) =>
        total + item.temp,
      0
    ) / day.length;

  /*
    Maximum rain probability
  */

  const maxRain =
    Math.max(
      ...day.map(
        (item) =>
          item.pop || 0
      )
    );

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full
        rounded-3xl
        p-6
        border
        text-center
        shadow-xl
        transition-all
        duration-300
        cursor-pointer

        ${
          isSelected
            ? `
              bg-[#3b4d78]
              border-blue-300/70
              ring-2
              ring-blue-300/30
              -translate-y-2
              shadow-blue-500/20
            `
            : `
              bg-[#293554]
              border-white/10
              hover:bg-[#344467]
              hover:-translate-y-2
            `
        }
      `}
    >

      {/* Selected */}

      <div className="h-5 mb-1">

        {isSelected && (
          <p className="
            text-xs
            font-semibold
            text-blue-200
          ">
            SELECTED
          </p>
        )}

      </div>

      {/* Day */}

      <p className="
        text-lg
        font-bold
        text-white
      ">
        {dayName}
      </p>

      {/* Date */}

      <p className="
        mt-1
        text-sm
        text-gray-400
      ">
        {dateText}
      </p>

      {/* Icon */}

      <img
        src={`https://openweathermap.org/img/wn/${first.icon}@2x.png`}
        alt={first.description}
        className="
          h-20
          w-20
          mx-auto
          mt-4
        "
      />

      {/* Temperature */}

      <p className="
        text-3xl
        font-bold
        text-white
      ">
        {Math.round(averageTemp)}°
      </p>

      {/* Condition */}

      <p className="
        mt-2
        text-sm
        text-gray-400
        capitalize
        min-h-[40px]
      ">
        {first.description}
      </p>

      {/* Rain */}

      <p className="
        mt-4
        text-sm
        font-medium
        text-blue-300
      ">
        💧 {Math.round(maxRain * 100)}%
      </p>

    </button>
  );
}

export default ForecastCard;