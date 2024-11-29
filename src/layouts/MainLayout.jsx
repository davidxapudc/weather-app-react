import { Link, Outlet } from "react-router-dom";
import TopButtons from "../components/TopButtons";
import Inputs from "../components/Inputs";
import logo from "../assets/icons/weather.png";

function MainLayout({ setQuery, setUnits, weather, units, handleHomeClick, city, setCity }) {
    const formatBackground = () => {
        if (!weather || !weather.temp) return "from-green-500 to-blue-800";
        const threshold = units === 'metric' ? 28 : 80; 
        if (weather.temp <= threshold) return 'from-green-500 to-blue-800';
        return 'from-yellow-600 to-orange-700';
    };

    return (
        <div className={`mx-auto max-w-screen-lg mt-4 mb-6 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}>
            <div className="flex items-center justify-center mb-4">
                <Link to="/" className="flex items-center" onClick={handleHomeClick}>
                    <img src={logo} alt="WeatherApp Logo" className="w-16 h-16 mr-4 duration-300 ease-in-out hover:scale-110" />
                    <p className="text-4xl font-bold text-white hover:text-gray-300 transition ease-in-out hover:scale-110">WeatherApp</p>
                </Link>
            </div>
            <TopButtons setQuery={setQuery} />
            <Inputs setQuery={setQuery} setUnits={setUnits} city={city} setCity={setCity} />
            <Outlet />
        </div>
    );
}

export default MainLayout;
