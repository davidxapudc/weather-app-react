import MainLayout from "./layouts/MainLayout";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home"; 

// Main App component
function App() {
  const [query, setQuery] = useState({ q: "" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [showForecast, setShowForecast] = useState(false);
  const [city, setCity] = useState(""); 

  // Fetch weather data based on query and units
  const getWeather = async () => {
    const message = query.q ? query.q : "";
    toast.info(`Getting weather data for ${message}`);
    const data = await getFormattedWeatherData({ ...query, units });
    toast.success(`Weather data retrieved for ${data.name}, ${data.country}`);
    setWeather(data);
    console.log(data);
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  const navigate = useNavigate();

  // Handle show forecast button click to toggle forecast display
  const handleShowForecastClick = () => {
    setShowForecast(!showForecast);
    if (!showForecast && weather) {
      navigate(`/weather/forecast/${weather.name}`);
    } else if (showForecast && weather) {
      navigate(`/weather/${weather.name}`);
    }
  };

  // Handle home button click to reset weather data and query
  const handleHomeClick = () => {
    setWeather(null);
    setQuery({ q: "" });
    setCity(""); 
    setShowForecast(false); 
  };

  // Handle query change to update query and navigate
  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
    setShowForecast(false); 
    if (newQuery.q) {
      navigate(`/weather/${newQuery.q}`);
    }
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout setQuery={handleQueryChange} setUnits={setUnits} weather={weather} units={units} handleHomeClick={handleHomeClick} city={city} setCity={setCity} />}>
          <Route index element={<Home weather={weather} units={units} showForecast={showForecast} handleShowForecastClick={handleShowForecastClick} />} />
          <Route path="weather/:city" element={<Home weather={weather} units={units} showForecast={showForecast} handleShowForecastClick={handleShowForecastClick} />} />
          <Route path="weather/forecast/:city" element={<Home weather={weather} units={units} showForecast={showForecast} handleShowForecastClick={handleShowForecastClick} />} />
        </Route>
      </Routes>
      <ToastContainer autoClose={2500} theme="colored" />
    </>
  );
}

export default App;
