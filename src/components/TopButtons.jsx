import { useNavigate } from "react-router-dom";

// TopButtons component for quick city selection
function TopButtons({ setQuery, setShowForecast }) {
    const navigate = useNavigate();
    const cities = [
        { id: 1, name: "Manizales" },
        { id: 2, name: "New York" },
        { id: 3, name: "Tokyo" },
        { id: 4, name: "Paris" },
        { id: 5, name: "Madrid" },
    ];

    // Handle city button click to set query and navigate
    const handleCityClick = (cityName) => {
        setQuery({ q: cityName });
        setShowForecast(false);
        navigate(`/weather/${cityName}`);
    };

    return (
        <div className="flex items-center justify-around my-6">
            {cities.map((city) => (
                <button
                    key={city.id}
                    className="text-lg font-medium hover:bg-gray-700/20 px-3 py-2 rounded-md transition ease-in hover:scale-110"
                    onClick={() => handleCityClick(city.name)}
                >
                    {city.name}
                </button>
            ))}
        </div>
    );
}

export default TopButtons;