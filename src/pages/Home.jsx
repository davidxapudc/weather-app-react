import TimeAndLocation from "../components/TimeAndLocation";
import TempAndDetails from "../components/TempAndDetails";
import Forecast from "../pages/Forecast";

// Home component displaying weather information and forecast
function Home({ weather, units, showForecast, handleShowForecastClick }) {
  return (
    <>
      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TempAndDetails weather={weather} units={units} />
          <div className="flex items-center justify-center">
            <button
              onClick={handleShowForecastClick}
              className="text-2xl font-bold text-white hover:bg-gray-700/20 px-3 py-5 rounded-md transition ease-in hover:scale-110">
              Show Forecast
            </button>
          </div>
          {showForecast && (
            <>
              <Forecast title="Daily Forecast" data={weather.daily} />
              <Forecast title="3 Hour Step Forecast" data={weather.hourly} />
            </>
          )}
        </>
      )}
    </>
  );
}

export default Home;