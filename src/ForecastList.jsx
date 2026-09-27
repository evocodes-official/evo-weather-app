import ForecastCard from "./ForecastCard";

function ForecastList({
  forecast,
  selectedDate,
  setSelectedDate,
}) {
  if (
    !forecast ||
    forecast.length === 0
  ) {
    return null;
  }

  /*
    Group forecast by date
  */

  const grouped = {};

  forecast.forEach((item) => {
    if (!grouped[item.date]) {
      grouped[item.date] = [];
    }

    grouped[item.date].push(item);
  });

  /*
    Get first 5 days
  */

  const days =
    Object.values(grouped).slice(
      0,
      5
    );

  /*
    Handle card click
  */

  const handleDayClick = (
    date
  ) => {
    setSelectedDate(date);

    setTimeout(() => {
      const detailedForecast =
        document.getElementById(
          "detailed-forecast"
        );

      if (detailedForecast) {
        detailedForecast.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 50);
  };

  return (
    <section>

      {/* Heading */}

      <div className="mb-6">

        <p className="
          text-sm
          font-medium
          text-blue-300
        ">
          Extended Forecast
        </p>

        <h2 className="
          mt-1
          text-3xl
          font-bold
          text-white
        ">
          5 Day Forecast
        </h2>

      </div>

      {/* Cards */}

      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-5
        gap-5
      ">

        {days.map(
          (day, index) => {

            const date =
              day[0].date;

            const isSelected =
              selectedDate === date;

            return (
              <ForecastCard
                key={
                  date || index
                }
                day={day}
                isSelected={
                  isSelected
                }
                onClick={() =>
                  handleDayClick(
                    date
                  )
                }
              />
            );
          }
        )}

      </div>

    </section>
  );
}

export default ForecastList;